import { useEffect, useState } from "react";

function LogsTable({ logs }) {
  const [logsTemp, setLogs] = useState([]);
  useEffect(() => {
    setLogs(logs)
  }, [])
  return (
    <section className="logs-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Face recognition</p>
          <h3>Recent Access Logs</h3>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Person Name</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logsTemp && logsTemp.map((log) => (
              <tr key={log.id}>
                <td>{log.name}</td>
                <td>{log.time}</td>
                <td>
                  <span className={`log-status ${log.name == 'unknown' ? 'denied' : ''}`}>
                    {log.name == 'unknown' ? 'unknown' : 'Accepted'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default LogsTable;
