import { useReducer, useState, useEffect } from "react";
import { db } from '../firebase/firebase'
import { deleteDoc, doc } from "firebase/firestore";


const initialState = {
    loading: false,
    error: null,
};

const reducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error:null};
        case "DELETE_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default: 
            return state;
        }
}


export const useDeleteDocument = () => {
    const [response, dispatch] = useReducer(reducer, initialState);

    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
          return 
          } else {
             dispatch(action)
          }
      }
    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({type: 'LOADING'})
        
        try {

            const deletedDocument = async () => {
             await deleteDoc(doc(db, 'posts', id)
            )};
            deletedDocument();
            }
            catch (error) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message})
        }
    }
    
    useEffect(() => {
        return () => setCancelled(true);
      }, []);
    
    return {deleteDocument, response};
}