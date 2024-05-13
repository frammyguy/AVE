import React from 'react';
import Navbar from './components/Navbar/navbar'
import Clicker from './components/Clicker/clicker'
import Shop from './components/Shop/shop'

export default function App() {
    return (
        <>
            <Navbar/>
            <Clicker />
            <Shop />
        </>
    );
}