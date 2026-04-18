import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import octofitImg from './octofitapp-small.png';

function Home() {
  return (
    <div className="container py-5 text-center">
      <div className="octofit-hero rounded-3 mb-4 d-flex flex-column align-items-center">
        <img src={octofitImg} alt="OctoFit" style={{ height: 90, marginBottom: '1rem' }} />
        <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker</h1>
        <p className="lead">Track activities, compete with your team, and crush your fitness goals.</p>
      </div>
      <div className="row g-4 justify-content-center">
        {[
          { to: '/users', icon: '👤', label: 'Users', desc: 'View registered members' },
          { to: '/teams', icon: '🏆', label: 'Teams', desc: 'Browse teams and rosters' },
          { to: '/activities', icon: '🏃', label: 'Activities', desc: 'See all logged activities' },
          { to: '/workouts', icon: '💪', label: 'Workouts', desc: 'Personalized workout suggestions' },
          { to: '/leaderboard', icon: '📊', label: 'Leaderboard', desc: 'Top performers ranking' },
        ].map(({ to, icon, label, desc }) => (
          <div className="col-6 col-md-4 col-lg-2" key={to}>
            <Link to={to} className="text-decoration-none">
              <div className="card octofit-card h-100 text-center p-3">
                <div style={{ fontSize: '2rem' }}>{icon}</div>
                <div className="fw-semibold mt-1">{label}</div>
                <small className="text-muted">{desc}</small>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
