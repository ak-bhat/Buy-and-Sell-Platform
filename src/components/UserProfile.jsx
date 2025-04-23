import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/api';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
  });
  const { jwt } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(jwt);
        setProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err.message);
      }
    };

    fetchProfile();
  }, [jwt]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(profile, jwt);
      setProfile(updatedProfile);
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Type here"
              value={profile.firstName}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Type here"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Type here"
              value={profile.username}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Type here"
              value={profile.location}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Type here"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="ml-36 w-62 bg-pink-500 text-white py-2 rounded-full font-medium hover:bg-pink-600 cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
