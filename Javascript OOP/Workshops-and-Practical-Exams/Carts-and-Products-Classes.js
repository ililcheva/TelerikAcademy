function solve() {
    'use strict';

    class Product {
        constructor(productType, name, price) {
            this.productType = productType;
            this.name = name;
            this.price = price;
        }
        get productType() {
            return this._productType;
        }
        set productType(x) {
            this._productType = x;
        }
        get name() {
            return this._name;
        }
        set name(x) {
            this._name = x;
        }
        get price() {
            return this._price;
        }
        set price(x) {
            this._price = x;
        }
    }

    class ShoppingCart {
        constructor() {
            this._products = [];
        }
        get products() {
            return this._products;
        }

        add(product) {
            if (!(product instanceof Product)) {
                throw new Error('Not a product-like object!');
            }
            this.products.push(product);
            return this;
        }

        remove(product) {
            if (!(product instanceof Product)) {
                throw new Error('Not a product-like object!');
            }
            if (this.products.length === 0) {
                throw new Error('No products in cart!');
            }
            let productIndex = this.products.findIndex(p => p.productType === product.productType && p.name === product.name && p.price === product.price);
            if (productIndex === -1) {
                throw new Error('There isn\'t such product');
            }
            this.products.splice(productIndex, 1);
            return this;
        }

        showCost() {
            return this.products.reduce((partialCost, product) => partialCost + product.price, 0);
        }

        showProductTypes() {
            let uniqueObjectTypes = {};
            this.products.forEach(product => {
                uniqueObjectTypes[product.productType] = true;
            });
            return Object.keys(uniqueObjectTypes).sort((a, b) => a.localeCompare(b));
        }

        getInfo() {
            let groupedByName = {};

            this.products.forEach(product => {
                if (!groupedByName[product.name]) {
                    groupedByName[product.name] = {
                        name: product.name,
                        quantity: 0,
                        price: 0
                    };
                }
                groupedByName[product.name].quantity += 1;
                groupedByName[product.name].price += product.price;
            });
            let uniqueProducts = Object.keys(groupedByName)
                .sort((a, b) => a.localeCompare(b))
                .map(key => groupedByName[key]);
            let totalPrice = uniqueProducts.reduce((cost, p) => cost + p.price, 0);

            return {
                products: uniqueProducts,
                totalPrice: totalPrice
            };
        }
    }

    return {
        Product,
        ShoppingCart
    };
}

module.exports = solve;