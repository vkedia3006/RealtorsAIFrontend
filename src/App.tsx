import './App.css';
import './styles.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SessionExpiredPage from './pages/SessionExpiredPage'; // <-- import this

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }/>
          <Route path='/login-success' element={<CallbackPage />} />
          <Route path='/session-expired' element={<SessionExpiredPage />} /> {/* <-- new route */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
