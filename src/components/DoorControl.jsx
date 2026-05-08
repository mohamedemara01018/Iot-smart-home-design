import { FiLock, FiUnlock } from 'react-icons/fi';

function DoorControl({ status, onOpen, onClose, loading }) {
  const isOpen = status === 'OPEN';

  return (
    <section className="control-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Access control</p>
          <h3>Door Status</h3>
        </div>
        <div className={`state-badge ${isOpen ? 'success' : 'danger'}`}>
          {isOpen ? <FiUnlock /> : <FiLock />}
          <span>{status}</span>
        </div>
      </div>

      <div className="door-visual">
        <div className={`door-frame ${isOpen ? 'open' : ''}`}>
          <div className="door-panel" />
        </div>
      </div>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onOpen} disabled={loading}>
          Open Door
        </button>
        <button className="secondary-button" type="button" onClick={onClose} disabled={loading}>
          Close Door
        </button>
      </div>
    </section>
  );
}

export default DoorControl;
