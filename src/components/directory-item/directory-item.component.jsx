import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BackgroundImage,
    DirectoryItemContainer,
    Body,
} from './directory-item.style.jsx';

const DirectoryItem = ({ category }) => {
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(category.route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={category.imageUrl} />
            <Body>
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
