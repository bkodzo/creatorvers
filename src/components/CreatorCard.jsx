import { Link } from 'react-router-dom';

const CreatorCard = ({ creator }) => {
  return (
    <article className="creator-card">
      {creator.imageURL && (
        <img 
          src={creator.imageURL} 
          alt={creator.name} 
          className="creator-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <div className="creator-info">
        <h3>{creator.name}</h3>
        <p className="creator-description">{creator.description}</p>
        <div className="creator-actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            role="button"
            className="secondary"
          >
            Visit Channel
          </a>
          <Link to={`/creator/${creator.id}`} role="button" className="secondary">
            View Details
          </Link>
          <Link to={`/edit/${creator.id}`} role="button" className="outline">
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CreatorCard;
