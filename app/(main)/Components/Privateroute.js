'use client'

import { AuthContext } from '@/app/provider/authprovider';
import { useRouter } from 'next/navigation';

import React, { useContext, useEffect } from 'react';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const router = useRouter();

    useEffect(()=> {
        if (!user && !loading){
            router.push('/login')
        }
    },[user, loading, router])

    if (loading || !user) return <div>Loading...</div>;


    return children;
    
    
};

export default PrivateRoute;