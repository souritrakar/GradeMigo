
import { db } from '../firebase/config'; // update with your path to firestore config
import { doc, setDoc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore"; 
export const getSubcollections = async (setId) => {
    const subcollections = await getDocs(collection(db, 'sets', setId, 'notes'));
    subcollections.forEach((doc) => {
        console.log(doc.data());
    })
}