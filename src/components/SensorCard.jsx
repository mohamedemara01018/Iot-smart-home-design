function SensorCard({ icon, name, value, unit, status, tone = 'blue' }) {
  return (
    <article className={`sensor-card ${tone}`}>
      <div className="sensor-header">
        <div className="sensor-icon">{icon}</div>
        <span className="status-dot">
          <span />
          {status}
        </span>
      </div>

      <div>
        <p>{name}</p>
        <h2>
          {value}
          {unit && <small>{unit}</small>}
        </h2>
      </div>
    </article>
  );
}

export default SensorCard;
