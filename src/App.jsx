import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Register from './components/Register';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import AdList from './components/AdList';
import CreateAd from './components/CreateAd';
import AdDetail from './components/AdDetail';
import UserProfile from './components/UserProfile';
import MyAds from './components/MyAds';
import ProtectedRoute from './services/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AdList />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="ads" element={<AdList />} />
        <Route path="ads/:id" element={<AdDetail />} />

        {/* Protected routes */}
        <Route path="dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="my-ads" element={<ProtectedRoute><MyAds /></ProtectedRoute>} />
          <Route path="post" element={<ProtectedRoute><CreateAd /></ProtectedRoute>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
