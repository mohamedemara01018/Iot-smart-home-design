import { useEffect, useMemo, useState } from 'react';
import { FiDroplet, FiShield, FiThermometer } from 'react-icons/fi';
import { MdLightbulbOutline, MdLocalFireDepartment, MdSensors } from 'react-icons/md';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SensorCard from '../components/SensorCard.jsx';
import DoorControl from '../components/DoorControl.jsx';
import LightControl from '../components/LightControl.jsx';
import LogsTable from '../components/LogsTable.jsx';
import { fakeData, fakeLogs } from '../data/fakeData.js';
import { smartHomeApi } from '../services/api.js';

function Dashboard() {
  const [homeData, setHomeData] = useState(fakeData);
  // const [logs] = useState(fakeLogs);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [lastSync, setLastSync] = useState('Not synced yet');
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError('');
    setNotice('');

    try {
      const [temp, humidity, gas, flame, door, light, logs] = await Promise.allSettled([
        smartHomeApi.getTemperature(),
        smartHomeApi.getHumidity(),
        smartHomeApi.getGas(),
        smartHomeApi.getFlame(),
        smartHomeApi.getDoor(),
        smartHomeApi.getLight(),
        smartHomeApi.getLogs()
      ]);




      const nextData = {
        ...homeData,
        temp: temp.status === 'fulfilled' ? temp.value.data.temperature : homeData.temp,
        humidity: humidity.status === 'fulfilled' ? humidity.value.data.humidity : homeData.humidity,
        gas: gas.status === 'fulfilled' ? gas.value.data.gas : homeData.gas,
        flame: flame.status === 'fulfilled' ? flame.value.data.flame : homeData.flame,
        door: door.status === 'fulfilled' ? door.value.data.status : homeData.door,
        light: light.status === 'fulfilled' ? light.value.data.status : homeData.light,
        logs: logs.status === 'fulfilled' ? logs.value.data.logs : {},
      };

      const logsArr = Object.entries(nextData.logs).map(([id, value]) => ({
        id,
        ...value
      }));


      setHomeData({
        temp: nextData.temp ?? fakeData.temp,
        humidity: nextData.humidity ?? fakeData.humidity,
        gas: nextData.gas ?? fakeData.gas,
        flame: nextData.flame ?? fakeData.flame,
        door: nextData.door ?? fakeData.door,
        light: nextData.light ?? fakeData.light,
        logs: logsArr ?? []
      });

      const failedRequests = [temp, humidity, gas, flame, door, light].filter(
        (result) => result.status === 'rejected'
      );

      if (failedRequests.length > 0) {
        setError('Some backend endpoints did not respond. Showing the latest available values.');
      }

      setLastSync(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }

  async function handleOpenDoor() {
    setActionLoading(true);
    setError('');
    setNotice('');

    try {
      await smartHomeApi.openDoor();
      setHomeData((current) => ({ ...current, door: 'OPEN' }));
      setNotice('Door open command sent to backend.');
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Could not open the door from the backend.'));
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCloseDoor() {
    setActionLoading(true);
    setError('');
    setNotice('');

    try {
      await smartHomeApi.closeDoor();
      setHomeData((current) => ({ ...current, door: 'CLOSED' }));
      setNotice('Door close command sent to backend.');
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Could not close the door from the backend.'));
    } finally {
      setActionLoading(false);
    }
  }

  async function handleToggleLight() {
    const nextStatus = homeData.light === 'ON' ? 'OFF' : 'ON';
    setActionLoading(true);
    setError('');
    setNotice('');

    try {
      await smartHomeApi.updateLight(nextStatus);
      setHomeData((current) => ({ ...current, light: nextStatus }));
      setNotice(`Light ${nextStatus} command sent to backend.`);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Could not update the light from the backend.'));
    } finally {
      setActionLoading(false);
    }
  }

  function handleNavigate(sectionId) {
    setActiveSection(sectionId);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  const sensorCards = useMemo(
    () => [
      {
        name: 'Temperature',
        value: homeData.temp,
        unit: 'C',
        status: homeData.temp > 35 ? 'High' : 'Normal',
        tone: homeData.temp > 35 ? 'red' : 'orange',
        icon: <FiThermometer />
      },
      {
        name: 'Humidity',
        value: homeData.humidity,
        unit: '%',
        status: 'Stable',
        tone: 'blue',
        icon: <FiDroplet />
      },
      {
        name: 'Gas Sensor',
        value: homeData.gas,
        unit: 'ppm',
        status: homeData.gas > 300 ? 'Alert' : 'Safe',
        tone: homeData.gas > 300 ? 'red' : 'green',
        icon: <MdSensors />
      },
      {
        name: 'Flame Sensor',
        value: homeData.flame ? 'Detected' : 'Clear',
        status: homeData.flame ? 'Danger' : 'Safe',
        tone: homeData.flame ? 'red' : 'green',
        icon: <MdLocalFireDepartment />
      },
      {
        name: 'Door',
        value: homeData.door,
        status: homeData.door === 'OPEN' ? 'Unlocked' : 'Secured',
        tone: homeData.door === 'OPEN' ? 'orange' : 'green',
        icon: <FiShield />
      },
      {
        name: 'Light',
        value: homeData.light,
        status: homeData.light === 'ON' ? 'Active' : 'Idle',
        tone: homeData.light === 'ON' ? 'yellow' : 'blue',
        icon: <MdLightbulbOutline />
      }
    ],
    [homeData]
  );



  console.log(homeData.logs)

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="dashboard" id="overview">
        <Navbar loading={loading} error={error} onRefresh={loadDashboardData} />

        {error && <div className="alert">{error}</div>}
        {notice && <div className="alert success-alert">{notice}</div>}

        <section className="summary-strip" aria-label="Dashboard overview">
          <div>
            <span>Active devices</span>
            <strong>06</strong>
          </div>
          <div>
            <span>Security mode</span>
            <strong>Home</strong>
          </div>
          <div>
            <span>Last sync</span>
            <strong>{loading ? 'Syncing...' : lastSync}</strong>
          </div>
        </section>

        <section className="control-grid dashboard-section" id="controls">
          <DoorControl
            status={homeData.door}
            onOpen={handleOpenDoor}
            onClose={handleCloseDoor}
            loading={actionLoading}
          />
          <LightControl
            status={homeData.light}
            onToggle={handleToggleLight}
            loading={actionLoading}
          />
        </section>

        <section className="sensor-grid dashboard-section" id="sensors" aria-label="Sensor overview">
          {sensorCards.map((card) => (
            <SensorCard key={card.name} {...card} />
          ))}
        </section>

        <div className="dashboard-section" id="security">
          {homeData.logs && <LogsTable logs={homeData.logs} />}
        </div>

        <section className="settings-panel dashboard-section" id="settings">
          <div>
            <p className="eyebrow">System settings</p>
            <h3>Backend Connection</h3>
            <p>
              API requests are sent to the backend on port 8000. Use the refresh button
              in the top bar to reload live values.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function getApiErrorMessage(apiError, fallbackMessage) {
  return apiError?.response?.data?.message || apiError?.message || fallbackMessage;
}

export default Dashboard;
