import '../styles/components/Nav.css';

export default function Nav({ articles, setArticle, className}) {

    return (
      <nav className={`nav-articles ${className || ''}`}>

        <h3>Featured Blog Articles</h3>
        {articles.filter(a => a.isFeatured).map(a => (
          <p 
            key={`featured-${a.id}`} 
            onClick={() => setArticle(a)}
            className="nav-article-item featured"
          >
            ⭐ {a.title}
          </p>
        ))}

        <h3>All Articles</h3>
        {!articles
          ? "No articles"
          : articles.map((a) => (
              <p key={a.id}
                  onClick={() => setArticle(a)}
                  className={`nav-article-item ${a.isFeatured ? 'featured' : ''}`}>
                  {a.isFeatured ? '⭐ ' : ''}{a.title} 
              </p>
            ))}
      </nav>
    )
  }