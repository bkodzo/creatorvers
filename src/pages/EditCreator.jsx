import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCreator();
  }, [id]);

  const fetchCreator = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        navigate('/');
      } else {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('creators')
        .update(formData)
        .eq('id', id);

      if (error) {
        console.error('Error updating creator:', error);
        alert('Error updating creator. Please try again.');
      } else {
        navigate(`/creator/${id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating creator. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  return (
    <div className="container">
      <header className="form-header">
        <h1>Edit Creator</h1>
        <p>Update the information for {formData.name}</p>
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
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link to={`/creator/${id}`} role="button" className="secondary outline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
