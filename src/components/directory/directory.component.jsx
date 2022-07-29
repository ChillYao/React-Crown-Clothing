import React from 'react';
import './directory.component.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({ categories }) => {
    //console.log(categories);
    return (
        <div className="categories-container">
            {categories.map((category) => {
                //console.log(category);
                return <CategoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};
export default Directory;
