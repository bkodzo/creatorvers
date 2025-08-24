import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading creators...</div>;
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1>Creatorverse</h1>
        <p>Discover amazing content creators worth following!</p>
        <Link to="/add" role="button" className="primary">
          + Add New Creator
        </Link>
      </header>

      <main className="creators-grid">
        {creators.length === 0 ? (
          <article className="no-creators">
            <h2>No creators found</h2>
            <p>Start building your Creatorverse by adding some amazing content creators!</p>
            <Link to="/add" role="button" className="primary">
              Add Your First Creator
            </Link>
          </article>
        ) : (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        )}
      </main>
    </div>
  );
};

export default ShowCreators;
