import {format} from "date-fns";
import "./Article.css";

export default function Article({ article }) {
    return (
      <article>
        {!article ? (
          <p>No article selected</p>
        ) : (
          <section className="article-display">
            <h2>{article.title}</h2>
            <p className="date">
            Posted: {article.date ? format(article.date.toDate(), 'MMMM d, yyyy - h:mm a') : 'Date not available'}
            </p>
            <p className="body">{article.body}</p>
          </section>
        )}
      </article>
    )
  }