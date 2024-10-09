import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({children}) {

    const User = useAuth();
    const Navigate = useNavigate();

    useEffect(
        ()=>{
            if(User===null){
                Navigate('/Login',{replace: true});


            }
        },
        [User,Navigate]
    );
   

    return children;
}

