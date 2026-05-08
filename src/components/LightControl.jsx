import { FiPower } from 'react-icons/fi';
import { MdLightbulbOutline } from 'react-icons/md';

function LightControl({ status, onToggle, loading }) {
  const isOn = status === 'ON';

  return (
    <section className="control-panel light-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Room actuator</p>
          <h3>Light Control</h3>
        </div>
        <div className={`state-badge ${isOn ? 'success' : 'muted'}`}>
          <MdLightbulbOutline />
          <span>{status}</span>
        </div>
      </div>

      <div className={`bulb ${isOn ? 'on' : ''}`}>
        <MdLightbulbOutline />
      </div>

      <button
        className={`toggle-button ${isOn ? 'on' : ''}`}
        type="button"
        onClick={onToggle}
        disabled={loading}
        aria-pressed={isOn}
      >
        <span>
          <FiPower />
          Turn Light {isOn ? 'OFF' : 'ON'}
        </span>
        <i />
      </button>
    </section>
  );
}

export default LightControl;
