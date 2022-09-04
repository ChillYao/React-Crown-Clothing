import { createContext, useState, useEffect } from 'react';

const addCardItem = (cartItems, productToAdd) => {
    //find if cartItems contain productToAdd
    const exsitingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //if found, increament quantity
    if (exsitingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === exsitingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    //return new array with modified cartItems/ new cartItem
    /* (When It runs to this line, we know each cartItems 
    do not match the productToAdd, so add a new product item) */
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
    //find if cartItems contain productToRemove
    const exsitingCartItem = cartItems.find(
        (cartItem) => productToRemove.id === cartItem.id
    );

    //if the quantity === 1, remove the Item
    if (exsitingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== exsitingCartItem.id
        );
    }

    //if not, decrease the number by 1
    if (exsitingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === exsitingCartItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (accum, current) => accum + current.quantity,
            0
        );
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        cartItems,
        cartCount,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
