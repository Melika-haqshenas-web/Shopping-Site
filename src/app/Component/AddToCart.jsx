"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { Poppins } from "next/font/google";
import { useCart } from "../Component/CartContext"

const popp = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AddToCart({ state, updateState }) {
    const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleQuantityChange = (productId, quantity) => {
        updateQuantity(productId, quantity); 
    };

    const handleClick = () => {
        const newState = state === true ? false : true;
        updateState(newState);
    };

    return (
        <section className="w-full h-[100vh] py-24 bg-[#000000dd] fixed top-0 left-0 z-40 flex justify-center items-center  cursor-default overflow-hidden">
            <div className="cartOpen w-full md:w-auto absolute top-0 right-0 h-[100vh] bg-white overflow-y-auto overflow-x-hidden pb-8">
                <div className="flex p-4 md:p-10">
                    <div className={`${popp.className} flex-1 flex justify-center items-center uppercase text-nowrap pr-10 pl-2 text-start text-3xl font-bold`}>Your Cart</div>
                    <div className="flex-1 flex justify-center items-center pl-10 pr-2 text-end">
                        <IoCloseOutline onClick={handleClick} className="text-[#000] text-4xl hover:text-[#e65540] cursor-pointer transition duration-300" />
                    </div>
                </div>
                <div className="mx-8 my-4">
                    {cartItems.length === 0 ? (
                        <>
                            <h3 className='mb-2 text-xl'>Your cart is empty.</h3>
                            <p className='mb-2 text-base text-[#333333]'> Add your desired product from the products section.</p>
                        </>
                    ) : (
                        <div>
                            {cartItems.map((val) => (
                                <div key={val.id} className="py-4 border rounded flex flex-wrap md:flex-nowrap justify-center items-center my-2">
                                    <div className='px-2'>
                                        <Image src={val.image} width={50} height={50} alt="product" />
                                    </div>
                                    <div className='flex-1 p-2 '>
                                        <h3 className='text-base text-[#333333] mb-2'>{val.title}</h3>
                                        <div className='flex'>
                                            <p className='text-sm text-[#888888] pr-4'>{val.quantity} * {val.price}</p>
                                            <input
                                                type="number"
                                                value={val.quantity}
                                                onChange={(e) => handleQuantityChange(val.id, Number(e.target.value))}
                                                min="1"
                                                className='border w-10 h-5'
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full md:w-fit md:pr-5 flex justify-center items-center'>
                                        <button onClick={() => removeFromCart(val.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded inline-block">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <h4 className={`${popp.className} text-xl`}>Total: ${calculateTotal().toFixed(2)}</h4>
                </div>
                <div className="md:flex gap-2 mx-8">
                    <button onClick={clearCart} className="w-full md:w-auto my-2 md:m-0 border border-[#cdcdcd] text-[#333] p-2 transition duration-300 hover:border-0 hover:text-[#e6e6e6] hover:bg-[#e65540] rounded-md flex-1 flex justify-center items-center text-nowrap uppercase font-bold">Clear Cart</button>
                    <button className="w-full md:w-auto my-2 md:m-0 p-2 transition duration-300 text-[#e65540] bg-[#e6e6e6] rounded-md flex-1 flex justify-center items-center text-nowrap uppercase font-bold hover:text-[#e6e6e6] hover:bg-[#e65540]">Check out</button>
                </div>
            </div>
        </section>
    );
}
