import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-pink-600">list</span><span className="text-gray-500">bnb</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</Link>

          {user ? (
            <Link
              to="/dashboard"
              className="text-sm font-medium bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
