import './cart-dropdown.style.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items"></div>
            {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
