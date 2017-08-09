import React from 'react';

export default function ProductsSorting() {
    return (
        <div className="products-selection-bg-color">
            <div className="products-selection">
                <form>
                    <div>
                        <input type="checkbox" name="products-type" value="men" />
                        <label>men</label>
                    </div>
                    <div>
                        <input type="checkbox" name="products-type" value="women" />
                        <label>women</label>
                    </div>
                    <div>
                        <input type="checkbox" name="products-type" value="children" />
                        <label>children</label>
                    </div>
                </form>
                <button>see all products</button>
            </div>
        </div>
    );
}
