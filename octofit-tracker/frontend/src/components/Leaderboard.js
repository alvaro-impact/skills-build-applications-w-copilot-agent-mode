import { useState, useEffect } from 'react';

const API = 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
      })
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.score - a.score);
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const medal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const rowClass = (rank) => {
    if (rank === 1) return 'table-warning fw-bold';
    if (rank === 2) return 'table-light';
    if (rank === 3) return 'table-light';
    return '';
  };

  if (loading) return <div className="octofit-loading"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mx-3">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="octofit-page-title">Leaderboard</h2>
      <div className="card octofit-card">
        <div className="card-header">Top Performers</div>
        <div className="card-body p-0">
          <table className="table table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-3">No entries yet.</td></tr>
              ) : (
                entries.map((e, idx) => (
                  <tr key={e.id} className={rowClass(idx + 1)}>
                    <td>{medal(idx + 1)}</td>
                    <td>{e.user_name ?? e.user}</td>
                    <td><span className="badge bg-primary fs-6">{e.score}</span></td>
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

export default Leaderboard;
