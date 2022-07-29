import { createContext, useState, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

// helper functions to add, remove and clear cart items
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

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// Type for reduer
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
  };


  // Intial state for the reducer
  const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  };

  // Reducer for the cart
  const cartReducer = (state, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
          ...state,
          ...payload,
        };
      default:
        throw new Error(`Unhandled type ${type} in cartReducer`);
    }
  };

// Cart context which can be used to store the cart items
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
      );

      const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        );
    
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.price,
          0
        );
    
        const payload = {
          cartItems,
          cartCount: newCartCount,
          cartTotal: newCartTotal,
        };
    
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
      };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCardItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems =removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems =clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
