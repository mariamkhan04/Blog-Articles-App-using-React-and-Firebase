import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Article from "./components/Article";
import ArticleEntry from "./components/ArticleEntry";
import { useAuthentication } from "./services/authService";
import { fetchArticles, createArticle } from "./services/articleService";
import "./App.css";
import { SignIn, SignOut } from "./components/Auth";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(null);
  const [error, setError] = useState("");
  const user = useAuthentication();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      }catch(err){
        console.error("Error fetching articles:", err);
      }
    }
    if(user){
      fetchData();
    }else{
      setArticles([]);
      setArticle(null);
    }
  }, [user])

  async function addArticle({ title, body }) {
    try {
      const newArticle = await createArticle({ title, body }); // save to firestore
      setArticles([newArticle, ...articles]); // add to articles list - update ui
      setArticle(null); // current article
      setWriting(false); // Close form - back to reading mode
    }catch(err){
      console.error("Error creating article:", err);
    }
  }
  function handleNewArticleClick() {
    if (!user) {
      setError("Error: Please Sign In with Google Account first to create new articles");
      return;
    }
    setWriting(true);
    setError("");
  }

  function handleShowArticlesClick() {
    if (!user) {
      setError("Error: Please Sign In with Google Account to view articles");
      return;
    }
    setShowArticles(true);
    setError("");
  }

  return (
    <div className="App">
      <header>
        <p>My Blogs App - Blogify </p>
        {error && <div className="error-message">{error}</div>}
        <div className="header-btns">
          <button onClick={handleNewArticleClick}>New Article</button>
          {!user ? <SignIn /> : <SignOut />}
        </div>
      </header>

      {!user && (
        <div className="welcome-screen">
          <h1 className="animated-title">Blogify</h1>
          <p className="tagline">Your thoughts, beautifully written</p>
        </div>
      )}

      <div className="app-grid">
        {user && <Nav articles={articles} setArticle={setArticle} />}

        {!user ? "" : 
        writing ? (
        <ArticleEntry addArticle={addArticle} />) 
        : article ? (
        <Article article={article} />) 
        :(
        <div className="no-article-selected">
          <p>Select an article from the sidebar or create a new one</p>
        </div>
      )}
      </div>
    </div>
  )
}