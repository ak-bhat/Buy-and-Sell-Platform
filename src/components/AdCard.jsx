import { Link } from 'react-router-dom';

const AdCard = ({ ad, isOwner, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-4">
      <img
        src={ad.image}
        alt={ad.title}
        className="rounded-xl w-full h-40 object-cover mb-3"
      />
      <p className="text-[11px] text-gray-400 mb-1">Paris · 1 day ago</p>
      <h3 className="text-sm font-medium leading-tight line-clamp-2 mb-1">
        {ad.title}
      </h3>
      <p className="text-pink-600 font-bold text-[15px] mb-1">${ad.price}</p>
      <div className="flex justify-between items-center">
        <Link to={`/ads/${ad.id}`} className="text-gray-400 hover:text-black text-sm">●●●</Link>
        {isOwner && (
          <button
            onClick={() => onDelete(ad.id)}
            className="text-xs text-red-500 hover:underline cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AdCard;
