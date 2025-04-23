import { useState, useEffect } from 'react';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard'); 
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const data = await registerUser(form);
      login(data.jwt, data.user);
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="py-8 flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-10">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-pink-600">list</span>
            <span className="text-gray-500">bnb</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            <strong className="text-black">Listbnb</strong> a Largest Classified
            Listing Marketplace offers perfect Ads classifieds...
          </p>
          <h2 className="mt-8 text-xl font-semibold text-gray-800">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Type here"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Type here"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Type here"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-2xl font-semibold hover:bg-pink-600 transition cursor-pointer"
            >
              Register →
            </button>
          </form>
        </div>

        <div className="bg-pink-50 flex flex-col items-center justify-center p-10 text-center">
          <img
            src="../login.png"
            alt="Illustration"
            className="w-48 mb-6"
          />{" "}
          {/* Replace with actual asset */}
          <h3 className="text-lg font-semibold text-gray-800">
            Already Have an Account?
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Please log in to your account if you already have one.
          </p>
          <Link
            to="/login"
            className="mt-4 bg-white text-pink-600 font-semibold border border-pink-500 px-6 py-2 rounded-full hover:bg-pink-100 transition"
          >
            Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
