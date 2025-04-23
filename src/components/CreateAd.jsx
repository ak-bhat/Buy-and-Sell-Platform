import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createAd } from '../services/api';

const CreateAd = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const { jwt } = useAuth();

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = 'Valid price is required';
    if (!form.image.trim()) newErrors.image = 'Image URL is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await createAd(form, jwt);
      alert('Ad created!');
      setForm({ title: '', price: '', description: '', image: '' });
      setErrors({});
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <div>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 w-full border"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 w-full border"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 w-full border"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Image URL/Address"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="p-2 w-full border"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      {form.image && (
        <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded" />
      )}

      <button type="submit" className="bg-purple-500 text-white px-4 py-2 w-full rounded">
        Post Ad
      </button>
    </form>
  );
};

export default CreateAd;
