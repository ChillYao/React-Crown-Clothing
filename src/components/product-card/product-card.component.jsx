import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
} from './product-card.style';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const { addItemToCart } = useContext(CartContext);

    //为什么这里的onClick不能直接call addItemToCart??
    //这样在react render的时候addItemToCart就会被执行。

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to card
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;
