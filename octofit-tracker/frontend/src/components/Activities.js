import { useState, useEffect } from 'react';

const API = '/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then((data) => { setActivities(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const badgeColor = (type) => {
    const map = {
      Run: 'success', Running: 'success',
      Swim: 'primary', Swimming: 'primary',
      Cycle: 'info', Cycling: 'info',
      Yoga: 'warning',
      Gym: 'secondary',
    };
    return map[type] || 'dark';
  };

  if (loading) return <div className="octofit-loading"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mx-3">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="octofit-page-title">Activities</h2>
      <div className="card octofit-card">
        <div className="card-header">Activity Log</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No activities found.</td></tr>
              ) : (
                activities.map((a, idx) => (
                  <tr key={a.id}>
                    <td>{idx + 1}</td>
                    <td>{a.user_name ?? a.user}</td>
                    <td><span className={`badge bg-${badgeColor(a.type)}`}>{a.type}</span></td>
                    <td>{a.duration}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
