import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path='/callback' element={<CallbackPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
