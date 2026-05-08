import {
  FiGrid,
  FiHome,
  FiSettings,
  FiShield,
  FiThermometer
} from 'react-icons/fi';

const navItems = [
  { label: 'Overview', sectionId: 'overview', icon: <FiGrid /> },
  { label: 'Rooms', sectionId: 'controls', icon: <FiHome /> },
  { label: 'Sensors', sectionId: 'sensors', icon: <FiThermometer /> },
  { label: 'Security', sectionId: 'security', icon: <FiShield /> },
  { label: 'Settings', sectionId: 'settings', icon: <FiSettings /> }
];

function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">SH</div>
        <div>
          <strong>SmartHub</strong>
          <span>IoT System</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <button
            className={`sidebar-link ${activeSection === item.sectionId ? 'active' : ''}`}
            type="button"
            key={item.label}
            onClick={() => onNavigate(item.sectionId)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
