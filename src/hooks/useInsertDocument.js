import { useReducer, useState, useEffect } from "react";
import { db } from '../firebase/firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore";


const initialState = {
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error:null};
        case "INSERT_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default: 
            return state;
        }
}


export const useInsertDocument = () => {
    const [response, dispatch] = useReducer(reducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
          return 
          } else {
             dispatch(action)
          }
      }
    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({type: 'LOADING'})
        
        try {

            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = async () => {
             await addDoc(collection(db, 'posts'), newDocument
            )};
            insertedDocument();
            }
            catch (error) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message})
        }
    }
    
    useEffect(() => {
        return () => setCancelled(true);
      }, []);
    
    return {insertDocument, response};
}