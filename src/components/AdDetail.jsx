import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdDetails } from '../services/api'; 

const AdDetail = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const adData = await getAdDetails(id);
        setAd(adData);
      } catch {
        alert('Failed to load ad details');
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 shadow-sm p-4 bg-white rounded-xl">
          <h1 className="text-lg font-semibold text-gray-800">{ad.title}</h1>
          <p className="text-sm text-gray-400">
            📍 New York, United States &middot; May 01 2025, 10:00am
          </p>
          <img
            src={ad.image}
            alt={ad.title}
            className="rounded-xl w-full object-cover max-h-[350px]"
          />
          <div className="bg-white p-4 rounded-xl ">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Overview</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{ad.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-pink-600 text-2xl font-bold">${ad.price}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center space-y-2">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="text-gray-600 text-sm">Member since Nov 24, 2020</p>
            <h3 className="text-md font-semibold text-gray-800">
              {ad.owner?.fullName || 'Owner'}
            </h3>
            <p className="text-sm text-gray-500">📞 +123-456-7890</p>
            <p className="text-sm text-gray-500">📧 owner@demo.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;
