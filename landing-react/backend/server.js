const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // TEMPORAL para dev: evita error de CA (NO recomendado producción)
    ssl: { rejectUnauthorized: false },

    waitForConnections: true,
    connectionLimit: 10,
});

// Helpers
async function getWeekData() {
    const [rows] = await pool.query(`
    SELECT DAYOFWEEK(fecha_consulta) as day_num, COUNT(*) as count
    FROM logs_consulta
    WHERE fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY day_num
  `);

    const values = [0, 0, 0, 0, 0, 0, 0];
    rows.forEach((row) => {
        const idx = row.day_num === 1 ? 6 : row.day_num - 2;
        if (idx >= 0 && idx < 7) values[idx] = row.count;
    });
    return values;
}

async function getDayData() {
    const [rows] = await pool.query(`
    SELECT HOUR(fecha_consulta) as hour_num, COUNT(*) as count
    FROM logs_consulta
    WHERE fecha_consulta >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    GROUP BY hour_num
  `);

    const timeSlots = [6, 8, 10, 12, 14, 16, 18, 20];
    const values = new Array(timeSlots.length).fill(0);

    rows.forEach((row) => {
        const h = row.hour_num;
        let slotIdx;

        if (h < 6) slotIdx = 0; // 00:00 - 05:59 -> Bucket into 6am
        else if (h >= 20) slotIdx = 7; // 20:00 - 23:59 -> Bucket into 8pm
        else slotIdx = Math.floor((h - 6) / 2);

        if (slotIdx >= 0 && slotIdx < values.length) values[slotIdx] += row.count;
    });

    return values;
}

async function getMonthData() {
    const [rows] = await pool.query(`
    SELECT FLOOR((DAY(fecha_consulta) - 1) / 7) + 1 as week_num, COUNT(*) as count
    FROM logs_consulta
    WHERE fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY week_num
  `);

    const values = [0, 0, 0, 0];
    rows.forEach((row) => {
        const w = row.week_num;
        if (w >= 1 && w <= 4) values[w - 1] += row.count;
        else if (w > 4) values[3] += row.count;
    });
    return values;
}

// Helper: Get Top 5 Classrooms
async function getClassroomStats(filter) {
    let dateCondition = 'fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)'; // Default: week

    if (filter === 'dia') dateCondition = 'fecha_consulta >= DATE_SUB(NOW(), INTERVAL 24 HOUR)';
    if (filter === 'mes') dateCondition = 'fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';

    const [rows] = await pool.query(`
    SELECT id_aula, COUNT(*) as count
    FROM logs_consulta
    WHERE ${dateCondition}
    GROUP BY id_aula
    ORDER BY count DESC
    LIMIT 5
  `);

    // Format: [{id: 1, count: 10}, ...]
    // We could join with 'aulas' table if we had names, but id_aula is fine for now.
    // Let's assume user wants "Aula 1", "Aula 2"...
    return rows.map(r => ({ label: `Aula ${r.id_aula}`, value: r.count }));
}

// Helper: Get Device Stats
async function getDeviceStats(filter) {
    let dateCondition = 'fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';

    if (filter === 'dia') dateCondition = 'fecha_consulta >= DATE_SUB(NOW(), INTERVAL 24 HOUR)';
    if (filter === 'mes') dateCondition = 'fecha_consulta >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';

    const [rows] = await pool.query(`
    SELECT 
      CASE 
        WHEN dispositivo LIKE '%Android%' THEN 'Android'
        WHEN dispositivo LIKE '%iOS%' OR dispositivo LIKE '%iPhone%' OR dispositivo LIKE '%iPad%' THEN 'iOS'
        WHEN dispositivo LIKE '%Windows%' THEN 'Windows'
        ELSE 'Otros'
      END as type,
      COUNT(*) as count
    FROM logs_consulta
    WHERE ${dateCondition}
    GROUP BY type
    ORDER BY count DESC
  `);

    return rows.map(r => ({ label: r.type, value: r.count }));
}

app.get("/api/stats", async (req, res) => {
    const { filter, lang } = req.query;
    const isEn = lang === "en";

    try {
        let labels, values;

        // --- Main Usage Chart Logic ---
        if (filter === "dia") {
            labels = ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"];
            values = await getDayData();
        } else if (filter === "mes") {
            labels = isEn ? ["W1", "W2", "W3", "W4"] : ["S1", "S2", "S3", "S4"];
            values = await getMonthData();
        } else {
            labels = isEn
                ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
            values = await getWeekData();
        }

        // --- New Charts Data ---
        const classrooms = await getClassroomStats(filter);
        const devices = await getDeviceStats(filter);

        res.json({
            usage: { labels, values },
            classrooms,
            devices
        });
    } catch (err) {
        console.error("Database error:", err.code, err.message);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));