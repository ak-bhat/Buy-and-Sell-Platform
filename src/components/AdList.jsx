import { useEffect, useState } from "react";
import { getAds, deleteAd } from "../services/api"; 
import { useAuth } from "../context/AuthContext";
import AdCard from "../components/AdCard";

const AdList = () => {
  const [ads, setAds] = useState([]);
  const { jwt, user } = useAuth();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAds();
        setAds(data);
      } catch {
        alert("Failed to load ads");
      }
    };
    fetchAds();
  }, []);

  const handleDelete = async (adId) => {
    try {
      await deleteAd(adId, jwt);
      setAds(ads.filter((ad) => ad.id !== adId));
    } catch (err) {
      console.error("Failed to delete ad:", err);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-center mb-8">
        <img
          src="/Ad.png"
          alt="Banner"
          className="max-w-full w-full md:w-[800px] rounded-xl"
        />
      </div>
      <h2 className="text-xs text-center text-pink-500 font-semibold tracking-widest uppercase">
        What’s New
      </h2>
      <h1 className="text-2xl font-bold text-center mt-1 mb-6">
        Fresh Recommendations
      </h1>
      <p className="text-sm text-gray-600 mb-4">{ads.length} Items</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            isOwner={ad.owner?.id === user?.id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdList;
