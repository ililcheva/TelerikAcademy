'use strict';

function solve() {
    function getProduct(productType, name, price) {
        return { productType, name, price };
    }

    function getShoppingCart() {
        let products = [];

        function add(product) {
          this.products.push(product);
            return this;
        }

        function remove(product) {
            let productIndex = this.products.findIndex(p => p.productType === product.productType && p.name === product.name && p.price === product.price);
            if (productIndex < 0) {
                throw 'There isn\'t such product';
            }
            this.products.splice(productIndex, 1);
            return this;
        }

        function showCost() {
                return this.products.map(p => p.price)
                    .reduce((x, y) => x + y, 0);
        }

        function showProductTypes() {
            let uniqueObjectTypes = {};
            this.products.forEach(p => uniqueObjectTypes[p.productType] = true);
            return Object.keys(uniqueObjectTypes).sort((a, b) => a.localeCompare(b));
        }

        function getInfo() {
            const groupedByName = {};

            this.products.forEach(p => {
                if (groupedByName.hasOwnProperty(p.name)) {
                    groupedByName[p.name].quantity += 1;
                    groupedByName[p.name].totalPrice += p.price;
                } else {
                    groupedByName[p.name] = {
                        name: p.name,
                        quantity: 1,
                        totalPrice: p.price
                    };
                }
            });
            const uniqueProducts = Object.keys(groupedByName)
                .sort((a, b) => a.localeCompare(b))
                .map(n => {
                    return {
                        name: n,
                        quantity: groupedByName[n].quantity,
                        totalPrice: groupedByName[n].totalPrice
                    };
                });

            return { products: uniqueProducts, totalPrice: this.showCost() };
        }


        return { products, add, remove, showCost, showProductTypes, getInfo };
    }

    return {
        getProduct: getProduct,
        getShoppingCart: getShoppingCart
    };
}

module.exports = solve();