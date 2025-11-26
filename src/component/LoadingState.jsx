import React from 'react';
import { MdPending } from 'react-icons/md';

const LoadingState = () => {
    return  (
    <div className="text-center flex items-center justify-center min-h-screen bg-indigo-100 p-8">
        <MdPending className="animate-spin text-indigo-500 mx-auto text-4xl mb-4" />
    
        </div>
    );
};

export default LoadingState;