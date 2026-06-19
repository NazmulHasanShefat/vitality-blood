import Footer from '@/components/footer/Footer';
import Navbar from '@/components/header/Navbar';
import React from 'react';

const HomeLayout = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;