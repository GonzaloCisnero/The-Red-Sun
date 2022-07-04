
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs,
    doc, 
    getDoc

} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js"



const firebaseConfig = {
  apiKey: "AIzaSyDPuJIDPLqvy--fj25H00bJBhzdOoRZLEE",
  authDomain: "redsun-30514.firebaseapp.com",
  projectId: "redsun-30514",
  storageBucket: "redsun-30514.appspot.com",
  messagingSenderId: "114719194875",
  appId: "1:114719194875:web:7172df2a4ff047d330fa5e"
}


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getProducts = async () => {

    const querySnapshot = await getDocs(collection(db, "productos"));
    
    const productos = []

    querySnapshot.forEach((doc) => {
      productos.push(doc);
    });

    return productos;

}

export const getProducto = async (id) => {

   const docRef = doc(db, "productos", id);
   const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  
  } else {
  console.log("No such document!");
  } 
}




