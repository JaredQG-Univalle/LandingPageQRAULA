export const fetchChartData = async (filter, lang) => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

    const res = await fetch(
        `${API}/api/stats?filter=${filter}&lang=${lang}`
    );

    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (data.usage) {
        return {
            labels: data.usage.labels,
            values: data.usage.values,
            classrooms: data.classrooms,
            devices: data.devices
        };
    }

    return data;
};