export default function Nav({ articles, setArticle }) {
    return (
      <nav>
        {!articles
          ? "No articles"
          : articles.map((a) => (
              <p key={a.id} onClick={() => setArticle(a)} style={{
                cursor: "pointer",
              }}>
                {a.title}
              </p>
            ))}
      </nav>
    )
  }