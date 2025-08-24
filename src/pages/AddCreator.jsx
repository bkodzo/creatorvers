import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('creators')
        .insert([formData]);

      if (error) {
        console.error('Error adding creator:', error);
        alert('Error adding creator. Please try again.');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding creator. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="form-header">
        <h1>Add New Creator</h1>
        <p>Share an amazing content creator with the Creatorverse!</p>
      </header>

      <form onSubmit={handleSubmit} className="creator-form">
        <label htmlFor="name">
          Creator Name *
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter creator name"
          />
        </label>

        <label htmlFor="url">
          Channel URL *
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="https://youtube.com/channel/..."
          />
        </label>

        <label htmlFor="description">
          Description *
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe what this creator does and why they're worth following..."
            rows="4"
          />
        </label>

        <label htmlFor="imageURL">
          Image URL (Optional)
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Creator'}
          </button>
          <Link to="/" role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
