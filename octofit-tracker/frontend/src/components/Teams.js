import { useState, useEffect } from 'react';

const API = '/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then((data) => { setTeams(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="octofit-loading"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mx-3">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="octofit-page-title">Teams</h2>
      <div className="row g-4">
        {teams.length === 0 ? (
          <p className="text-muted">No teams found.</p>
        ) : (
          teams.map((team) => (
            <div className="col-md-4" key={team.id}>
              <div className="card octofit-card h-100">
                <div className="card-header">🏆 {team.name}</div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Members</h6>
                  {team.members && team.members.length > 0 ? (
                    <table className="table table-sm table-bordered octofit-table mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.members.map((m) => (
                          <tr key={m.id}>
                            <td>{m.name}</td>
                            <td><a href={`mailto:${m.email}`} className="link-primary">{m.email}</a></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-muted mb-0">No members yet.</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Teams;
