import React from 'react';

export default function ProductsSorting() {
    return (
        <div className="products-sorting">
            <h2>sort by</h2>
            <ul className="dropdown">
                <li className="active">price</li>
                <li>name</li>
            </ul>
        </div>
    );
}
