require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      // Aiven normalmente requiere TLS
      ssl: { rejectUnauthorized: true },
    });

    const [rows] = await conn.query("SELECT 1 AS ok");
    console.log("✅ Conectado OK:", rows);
    await conn.end();
  } catch (e) {
    console.error("❌ Error conectando:", e.code, e.message);
    process.exit(1);
  }
})();