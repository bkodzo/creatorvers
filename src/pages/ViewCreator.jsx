import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setCreator(data);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting creator:', error);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading creator...</div>;
  }

  if (!creator) {
    return <div className="error">Creator not found</div>;
  }

  return (
    <div className="container">
      <article className="creator-detail-card">
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name} 
            className="creator-detail-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        
        <div className="creator-detail-info">
          <h1>{creator.name}</h1>
          <p className="creator-detail-description">{creator.description}</p>
          
          <div className="creator-detail-actions">
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer"
              role="button"
              className="primary"
            >
              Visit Channel
            </a>
            <Link to={`/edit/${creator.id}`} role="button" className="secondary">
              Edit Creator
            </Link>
            <button onClick={handleDelete} role="button" className="outline">
              Delete Creator
            </button>
          </div>
        </div>
      </article>
      
      <Link to="/" role="button" className="secondary outline">
        ← Back to All Creators
      </Link>
    </div>
  );
};

export default ViewCreator;
