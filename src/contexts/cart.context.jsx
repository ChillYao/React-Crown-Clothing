import { createContext, useState } from 'react';

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCardItem(cartItems, productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
