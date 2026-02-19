/**
 * Fetches chart data from the backend API.
 * @param {string} filter - 'dia', 'semana', or 'mes'
 * @param {string} lang - 'es' or 'en'
 * @returns {Promise<{labels: string[], values: number[]}>}
 */
export const fetchChartData = async (filter, lang) => {
    const res = await fetch(
        `http://localhost:3001/api/stats?filter=${filter}&lang=${lang}`
    );
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();

    // Backwards compatibility: if data has 'usage' property, return that, otherwise return data
    // The backend now returns { usage: {...}, classrooms: [...], devices: [...] }
    // But App.jsx expects { labels, values }
    // We should return the WHOLE object now? 
    // No, App.jsx crashes if we don't give it labels/values.
    // Let's modify App.jsx later. For now, let's return a merged object or just usage?
    // User said "todo se pone en blanco" -> crash.

    if (data.usage) {
        return {
            labels: data.usage.labels,
            values: data.usage.values,
            // Pass new data along too, hidden in properties
            classrooms: data.classrooms,
            devices: data.devices
        };
    }
    return data;
};