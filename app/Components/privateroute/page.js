'use client'
import { AuthContext } from '@/app/provider/authprovider';
import { useRouter } from 'next/navigation';

import React, { useContext, useEffect } from 'react';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const router = useRouter();

    useEffect(()=> {
        if (!user){
            router.push('/login')
        }
    },[user, router])


    return children;
    
    
};

export default PrivateRoute;