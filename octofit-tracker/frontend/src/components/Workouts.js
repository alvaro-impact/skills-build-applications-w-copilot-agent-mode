import { useState, useEffect } from 'react';

const API = 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then((data) => { setWorkouts(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div className="octofit-loading"><div className="spinner-border text-primary" role="status" /></div>;
  if (error) return <div className="alert alert-danger mx-3">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="octofit-page-title">Workout Suggestions</h2>
      <div className="card octofit-card">
        <div className="card-header">Available Workouts</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover octofit-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No workouts found.</td></tr>
              ) : (
                workouts.map((w, idx) => (
                  <tr key={w.id}>
                    <td>{idx + 1}</td>
                    <td className="fw-semibold">{w.name}</td>
                    <td>{w.description.length > 60 ? w.description.slice(0, 60) + '…' : w.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-octofit"
                        onClick={() => setSelected(w)}
                        data-bs-toggle="modal"
                        data-bs-target="#workoutModal"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="workoutModal" tabIndex="-1" aria-labelledby="workoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#0f3460', color: '#fff' }}>
              <h5 className="modal-title" id="workoutModalLabel">{selected?.name}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p>{selected?.description}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
