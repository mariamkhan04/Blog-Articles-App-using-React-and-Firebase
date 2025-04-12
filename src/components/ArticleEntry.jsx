import { useEffect, useState } from "react";
import "../styles/components/ArticleEntry.css";

export default function ArticleEntry({ addArticle, editArticle, articleToEdit }) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState(null)
  const [category, setCategory] = useState("technology") // default category
  const [readTime, setReadTime] = useState(5) // default read time in minutes
  const [isFeatured, setIsFeatured] = useState(false)
  const [authorBio, setAuthorBio] = useState("")

  const categories = [
    "technology",
    "lifestyle",
    "travel",
    "food",
    "health",
    "business"
  ];

  useEffect(()=>{
    if(articleToEdit){
      setTitle(articleToEdit.title || "");
      setBody(articleToEdit.body || "");
      setCategory(articleToEdit.category || "technology");
      setReadTime(articleToEdit.readTime || 5);
      setIsFeatured(articleToEdit.isFeatured || false);
      setAuthorBio(articleToEdit.authorBio || "");
    } else {
      // Reset to defaults when creating new article
      setTitle("");
      setBody("");
      setCategory("technology");
      setReadTime(5);
      setIsFeatured(false);
      setAuthorBio("");
    }
  },[articleToEdit])

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError("Both the title and body must be supplied")
    } else if (readTime < 1 || readTime > 60) {
      setError("Read time must be between 1 and 60 minutes")
    } else {
      if(articleToEdit) {
        editArticle(articleToEdit.id, {
          title,
          body,
          category,
          readTime,
          isFeatured,
          authorBio,
        })
      }else{
        addArticle({ 
          title,
          body,
          category,
          readTime,
          isFeatured,
          authorBio})
      }
    }
  }

  return (
    <div className="article-form">

      <form onSubmit={submit}>
        <h2>{articleToEdit ? "Edit Blog Post" : "New Blog Post"}</h2>
        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <label>Title</label>
          <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your blog title here"
           />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
                </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Estimated Read Time (minutes)</label>
          <input 
            type="number"
            min="1"
            max="60"
            value={readTime}
            onChange={(e) => setReadTime(parseInt(e.target.value)) || 5} />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input 
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)} />
            Feature this post on homepage
          </label>
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            rows="8"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Author Bio</label>
          <textarea
            rows="3"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            placeholder="Tell readers about yourself..."
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit">Publish Post</button>
          <button type="button" onClick={() => {
            setTitle("");
            setBody("");
            setCategory("technology");
            setReadTime(5);
            setIsFeatured(false);
            setAuthorBio("");
          }}>
            Clear Form
          </button>
        </div>
      </form>

    </div>
  )
}