import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClasses = ({ isActive }) =>
    isActive
      ? 'text-white bg-black rounded-full px-4 py-2 font-medium'
      : 'text-gray-700 font-medium hover:text-black';

  return (
    <div className="flex bg-gray-50 py-12 px-6">
      <aside className="w-64 bg-white p-6 rounded-xl shadow-sm h-80">
        <h2 className="text-lg font-bold mb-4">My Account</h2>
        <nav className="flex flex-col space-y-4 text-sm">
          <NavLink to="/dashboard" end className={linkClasses}>
            My Account
          </NavLink>
          <NavLink to="/dashboard/profile" className={linkClasses}>
            Edit Profile
          </NavLink>
          <NavLink to="/dashboard/my-ads" className={linkClasses}>
            My Ads
          </NavLink>
          <NavLink to="/dashboard/post" className={linkClasses}>
            Post Ad
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-left text-red-500 hover:underline cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-6 space-y-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
