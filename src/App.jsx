import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Article from "./components/Article";
import ArticleEntry from "./components/ArticleEntry";
import { useAuthentication } from "./services/authService";
import { fetchArticles, createArticle, deleteArticle, updateArticle } from "./services/articleService";
import "./styles/App.css";
import { SignIn, SignOut, UserDetails } from "./components/Auth";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(null);
  // const [error, setError] = useState("");
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

  async function addArticle({ title, body, category, readTime, isFeatured, authorBio}) {
    try {
      const newArticle = await createArticle({ 
        title,
        body,
        category,
        readTime,
        isFeatured,
        authorBio }); // save to firestore
      setArticles([newArticle, ...articles]); // add to articles list - update ui
      setArticle(newArticle); // current article
      setWriting(false); // Close form - back to reading mode
    }catch(err){
      console.error("Error creating article:", err);
    }
  }

  async function handleDeleteArticle(articleId) {
    try{
      await deleteArticle(articleId);
      setArticles(articles.filter(a => a.id !== articleId)); // remove from articles list
      if(article && article.id === articleId) {
        setArticle(null); // remove current article
      }
    } catch(err){
      console.error("Error deleting article:", err);
    }
  }

  async function handleUpdateArticle(articleId, updatedData) {
    try{
      const updatedArticle = await updateArticle(articleId, {
        title: updatedData.title,
        body: updatedData.body,
        category: updatedData.category || "technology", // default category if undefined
        readTime: updatedData.readTime || 5,
        isFeatured: updatedData.isFeatured || false,
        authorBio: updatedData.authorBio || "",
      });
      setArticles(articles.map(a => a.id === articleId ? updatedArticle : a)); // update articles list
      setArticle(updatedArticle); // update current article
      setWriting(false); // Close form - back to reading mode
    } catch(err){
      console.error("Error updating article:", err);
    }
  }

  function handleEditClick(articleToEdit) {
    setArticle(articleToEdit); // Set the current article
    setWriting('edit'); // Switch to edit mode
  }

  function goToHome() {
    setArticle(null);
    setWriting(false);
  }
  return (
    <div className="App">
      <header>
        <p>My Blogs App - Blogify </p>
        <div className="header-btns">
          {user && <button onClick={goToHome} className="home-btn">Home</button>}
          {user && <button onClick={()=>setWriting('new')}>New Article</button>}
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
        <ArticleEntry 
          addArticle={addArticle} 
          editArticle={handleUpdateArticle} 
          articleToEdit={writing === 'edit' ? article : null}/>) 
        : article ? (
        <Article 
          article={article} 
          onDelete={handleDeleteArticle} 
          onEdit={handleEditClick}/>) 
        : (
        <div className="no-article-selected">
          <div className="user-details">
            <UserDetails />

          </div>
          <p>Select an article from the sidebar or create a new one</p>
        </div>
      )}
      </div>

      <footer>Copyrights @ <a href="https://github.com/mariamkhan04" target="_blank">Mariam Khan</a></footer>

    </div>
  )
}