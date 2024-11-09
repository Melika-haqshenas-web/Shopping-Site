
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems, removeFromCart, clearCart } from '../Component/localStorageAddToCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCartItems = getCartItems();
        setCartItems(savedCartItems);
    }, []);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(product => product.id === item.id);
            const updatedCart = [...prevItems];
    
            if (existingItemIndex > -1) {
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1,
                };
            } else {
                updatedCart.push({ ...item, quantity: 1 });
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    
    const updateQuantity = (productId, quantity) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(prevItems => {
            const updatedCart = prevItems.filter(item => item.id !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const handleClearCart = () => {
        setCartItems([]);
        clearCart();
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart: handleRemoveFromCart, clearCart: handleClearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
