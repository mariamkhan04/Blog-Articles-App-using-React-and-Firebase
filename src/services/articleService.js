import {db} from './firebaseConfig';
import {collection, addDoc, getDocs, serverTimestamp, getDoc} from 'firebase/firestore';


export async function createArticle({ title, body }) {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        title,
        body,
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
        const articlesSnapshot = await getDocs(articlesCollectionRef);
        
        return articlesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
    } catch(err){
        console.error("Error fetching articles:", err);
        throw err;
    }
  }