import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, limit, query } from 'firebase/firestore';
import { db } from '../fireconfig';
import Bubble from './Bubble';

function Messages() {
    const bubbleRef = useRef(null);
    const [messages, SetMessages] = useState([]);
    useEffect( ()=>{
        const msgsRef = collection(db, 'Messages');
        const q = query(msgsRef, orderBy('timestamp'));
        
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            SetMessages(docs);
          });
          
        
        return () => unsubscribe();
    },[])

    
    useEffect(() =>{
        bubbleRef.current.scrollIntoView({behavior: 'smooth'});
    },[])

    const doclist =  messages.map((doc) =>(
        <Bubble {...doc} key={doc.id}/>
    )) 

    return(
    <div className="pb-44 pt-20 container mx-auto max-w-4xl">
        {
           doclist
        }
        <div ref={bubbleRef}></div>
    </div>
    );
}

export default Messages;
