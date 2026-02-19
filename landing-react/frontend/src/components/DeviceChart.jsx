function DeviceChart({ data }) {
    if (!data || data.length === 0) return <div className="no-data">Sin datos</div>;

    const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
    let cumulativeAngle = 0;

    // Colors for Android, iOS, Windows, Other
    const COLORS = {
        'Android': '#3ddc84', // Android Green
        'iOS': '#007aff',     // iOS Blue
        'Windows': '#00a4ef', // Microsoft Blue
        'Otros': '#888888'
    };

    const getPath = (value, totalVal) => {
        const startAngle = cumulativeAngle;
        const angle = (value / totalVal) * 360;
        cumulativeAngle += angle;

        // Convert polar to cartesian
        const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
        const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
        const x2 = 50 + 40 * Math.cos(Math.PI * cumulativeAngle / 180);
        const y2 = 50 + 40 * Math.sin(Math.PI * cumulativeAngle / 180);

        // Large arc flag
        const largeArc = angle > 180 ? 1 : 0;

        return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="device-chart-container">
            <svg viewBox="0 0 100 100" className="device-pie">
                {data.map((item, i) => (
                    <path
                        key={i}
                        d={getPath(item.value, total)}
                        fill={COLORS[item.label] || COLORS['Otros']}
                        stroke="#1a1a2e" // Dark background color for gap
                        strokeWidth="1"
                    />
                ))}
                {/* Inner circle for Donut effect */}
                <circle cx="50" cy="50" r="25" fill="#1a1a2e" />
            </svg>
            {/* Legend */}
            <div className="device-legend">
                {data.map((item, i) => (
                    <div key={i} className="legend-item">
                        <span className="dot" style={{ backgroundColor: COLORS[item.label] || COLORS['Otros'] }} />
                        <span className="label">{item.label}</span>
                        <span className="val">{Math.round((item.value / total) * 100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DeviceChart;
