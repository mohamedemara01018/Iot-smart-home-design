import { FiRefreshCw, FiSearch } from 'react-icons/fi';
import { MdOutlineWifiTethering } from 'react-icons/md';

function Navbar({ loading, error, onRefresh }) {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Live control center</p>
        <h1>Smart Home Dashboard</h1>
      </div>

      <div className="navbar-actions">
        <label className="search-box">
          <FiSearch />
          <input type="search" placeholder="Search devices" />
        </label>

        <div className={`connection-pill ${error ? 'warning' : 'online'}`}>
          <MdOutlineWifiTethering />
          <span>{loading ? 'Syncing' : error ? 'Check API' : 'Backend'}</span>
        </div>

        <button className="icon-button" type="button" aria-label="Refresh data" onClick={onRefresh}>
          <FiRefreshCw className={loading ? 'spin' : ''} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
