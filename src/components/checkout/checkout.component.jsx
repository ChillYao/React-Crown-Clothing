import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout.style.scss';

const Checkout = () => {
    const { cartItems, addItemToCart, removeItemFromCart } =
        useContext(CartContext);

    return (
        <div>
            <p>Checkout Page Works</p>
            {cartItems.map((cartItem) => {
                const { id, name, quantity } = cartItem;
                return (
                    <div key={id}>
                        <h2>{name}</h2>
                        <span>{quantity}</span>
                        <br />
                        <span onClick={() => removeItemFromCart(cartItem)}>
                            Decrement
                        </span>
                        <br />
                        <span onClick={() => addItemToCart(cartItem)}>
                            Increment
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Checkout;
