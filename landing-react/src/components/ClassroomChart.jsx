function ClassroomChart({ data }) {
    if (!data || data.length === 0) return <div className="no-data">Sin datos</div>;

    const maxVal = Math.max(...data.map(d => d.value)) || 1;

    return (
        <div className="classroom-chart">
            {data.map((item, i) => (
                <div key={i} className="classroom-row">
                    <div className="classroom-info">
                        <span className="classroom-label">{item.label}</span>
                        <span className="classroom-val">{item.value}</span>
                    </div>
                    <div className="bar-track">
                        <div
                            className="bar-fill"
                            style={{ width: `${(item.value / maxVal) * 100}%`, transitionDelay: `${i * 50}ms` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ClassroomChart;
