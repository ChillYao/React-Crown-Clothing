import React from 'react';

const CategoryItem = ({ id, category }) => {
    console.log(id);
    return (
        <div key={id} className="category-container">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${category.imageUrl})` }}
            ></div>
            <div className="category-body-container">
                <h2>{category.title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default CategoryItem;
