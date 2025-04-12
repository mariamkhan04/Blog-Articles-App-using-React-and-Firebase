import {format} from "date-fns";
import "../styles/components/Article.css";
import {FaTrash, FaEdit} from "react-icons/fa";

export default function Article({ article , onDelete, onEdit}) {
    return (
      <article>
        {!article ? (
          <p>No article selected</p>
        ) : (
          <section className="article-display">

            <div className="article-meta">
              <span className="category">{article.category}</span>
              {article.isFeatured && <span className="featured-badge">Featured</span>}
              <span className="read-time">{article.readTime} min read</span>
              <div className="btn-group">
                <button 
                  className="delete-icon" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this article?")) {
                      onDelete(article.id);
                    }
                  }}
                >
                  <FaTrash />
                </button>
                <button 
                  className="edit-icon"
                  onClick={() => onEdit(article)}>
                  <FaEdit />
                </button>
              </div>
            </div>

            <h2>{article.title}</h2>
            <p className="date">
            Posted: {article.date ? format(article.date.toDate(), 'MMMM d, yyyy - h:mm a') : 'Date not available'}
            {article.updatedAt && <span> (Updated: {format(article.updatedAt.toDate(), 'MMMM d, yyyy - h:mm a')})</span>}
            </p>
            <p className="body">{article.body}</p>
            {article.authorBio && (
              <div className="author-bio">
                <h3>About the Author</h3>
                <p>{article.authorBio}</p>
              </div>
            )}

          </section>
        )}
      </article>
    )
  }