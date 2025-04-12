import {db} from './firebaseConfig';
import {collection,
      addDoc,
      getDocs,
      serverTimestamp,
      getDoc,
      query,
      orderBy,
      deleteDoc,
      doc,
      updateDoc} from 'firebase/firestore';


export async function createArticle({ title, body, category, readTime, isFeatured, authorBio }) {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title,
        body,
        category,
        readTime,
        isFeatured,
        authorBio,
        date: serverTimestamp(),
      });
       // Get the newly created document to include the server-generated date
       const doc = await getDoc(docRef);
       return { id: doc.id, ...doc.data() };
      // return { id: docRef.id, title, body, date: serverTimestamp() };
    } catch (err) {
      console.error("Error creating article:", err);
      throw err;
    }
  }
  
  export async function fetchArticles() {
    try{
        const articlesCollectionRef = collection(db, "articles");
        const articlesQuery = query(
          articlesCollectionRef,
          orderBy("date", "desc") // Newest first
        );
        const articlesSnapshot = await getDocs(articlesQuery);
        
        return articlesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    } catch(err){
        console.error("Error fetching articles:", err);
        throw err;
    }
  }

  export async function deleteArticle(articleId) {
    try{
      const articleRef = doc(db, "articles", articleId);
      await deleteDoc(articleRef);
      return articleId;
    }
    catch(err){
      console.error("Error deleting article:", err);
      throw err;
    }
  }

  export async function updateArticle(articleId, updatedData) {
    try {
      const articleRef = doc(db, "articles", articleId);
      await updateDoc(articleRef, {
        ...updatedData,
        updatedAt: serverTimestamp(), // adding updation time 
      });
      
      const updatedDoc = await getDoc(articleRef);
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (err) {
      console.error("Error updating article:", err);
      throw err;
    }
  }