import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
    querySnapshot,
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState();
    const [error, setError ] = useState();
    const [loading, setLoading] = useState();

    ///deal memory leak
    const [cancelled, setCancelled] = useState();

    useEffect(() => {
        async function loadData(){
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);
            

            try{
                let q;

                if(search){
                    q = await query(collectionRef,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                }else if(uid){
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "asc")
                    );
                }else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id:doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                

            }catch (error){
                console.log(error);
                setError(error.message);
            }
            setLoading(false);
        }
        loadData()
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, error, loading}
}

