import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserAds } from '../services/api';

const Dashboard = () => {
  const { user, jwt } = useAuth();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (!jwt) {
      navigate('/login');
      return;
    }

    const fetchAds = async () => {
      try {
        const userAds = await getUserAds(jwt, user?.id);
        setAds(userAds);
      } catch (error) {
        alert(error.message || 'Failed to fetch ads');
      }
    };

    if (user) fetchAds();
  }, [jwt, navigate, user]);

  if (!jwt) return null;

  return (
    <div className="flex bg-gray-50 px-6">
      <main className="flex-1 ml-6 space-y-6">
        <div className="text-sm text-gray-400 mb-2">
          Home <span className="mx-1">/</span> <span className="text-gray-700">My Profile</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{user?.fullName || user?.username}</h3>
              <p className="text-sm text-gray-500">Member since 2019</p>
              <div className="text-sm text-gray-500 space-x-3 mt-1">
                <span>📍Kochi, Kerala, India</span>
                <span>📧 {user?.email || 'demo@demo.com'}</span>
                <span>📞 +123-456-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ads List */}
        {ads.map(ad => (
          <div key={ad.id} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <img src={ad.image} alt={ad.title} className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h4 className="font-semibold text-base">{ad.title}</h4>
                <p className="text-xs text-gray-400">Dallas, Texas · 24hrs ago</p>
                <p className="mt-1 font-semibold">${ad.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="border px-5 py-1 rounded-full text-sm hover:bg-gray-100">View</button>
              <button className="bg-pink-500 text-white px-5 py-1 rounded-full text-sm hover:bg-pink-600">
                Edit Ad
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
