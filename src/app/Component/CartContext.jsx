"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems, addToCart as localStorageAddToCart, removeFromCart, clearCart } from '../Component/localStorageAddToCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCartItems = getCartItems();
        setCartItems(savedCartItems);
    }, []);

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const updatedCart = [...prevItems];
            const existingItemIndex = updatedCart.findIndex(product => product.id === item.id);

            if (existingItemIndex > -1) {
                updatedCart[existingItemIndex].quantity += 1;
            } else {
                updatedCart.push({ ...item, quantity: 1 });
            }

            localStorageAddToCart(item);
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
            removeFromCart(itemId);
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
