import React from 'react';
import './product-card.style.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const { addItemToCart } = useContext(CartContext);

    //为什么这里的onClick不能直接call addItemToCart??
    //这样在react render的时候addItemToCart就会被执行。

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button
                buttontype={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default ProductCard;
