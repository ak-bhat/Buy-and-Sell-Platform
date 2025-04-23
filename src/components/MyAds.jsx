import { useEffect, useState } from "react";
import { getUserAds, deleteAd } from "../services/api";
import { useAuth } from "../context/AuthContext";
import AdCard from "./AdCard";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const { jwt, user } = useAuth();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const userAds = await getUserAds(jwt, user?.id);
        setAds(userAds);
      } catch (error) {
        alert(error.message || "Failed to load ads");
      }
    };

    if (jwt && user?.id) {
      fetchAds();
    }
  }, [jwt, user?.id]);

  const handleDelete = async (adId) => {
    try {
      await deleteAd(adId, jwt);
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    } catch (err) {
      console.error("Failed to delete ad:", err);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Ads</h1>
      <p className="text-sm text-gray-600 mb-4">{ads.length} Items</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            isOwner={true}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAds;
