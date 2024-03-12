'use client';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { cartApi } from '../apis/cartApi';
import { useUser } from '@clerk/nextjs';

interface CartContextValue {
    cartItems: any[];
    addToCart: (item: any[]) => void;
    removeFromCart: (id: number) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const { user } = useUser();

    const getCartItems = () => {
        cartApi
            .getDataCartByUser(user?.primaryEmailAddress?.emailAddress.toString())
            .then((res) => {
                const dataCart = res.data.data;
                setCartItems([...cartItems, ...dataCart]);
            });
    };
    const addToCart = (item: any) => {
        setCartItems((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
    };

    useEffect(() => {
        getCartItems();
    }, [user?.primaryEmailAddress?.emailAddress]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
