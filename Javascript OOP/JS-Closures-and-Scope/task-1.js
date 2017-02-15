'use strict';

function solve() {
    var library = (function() {
        var books = [];
        var categories = [];

        function listBooks(currentBook) {
            if (arguments.length > 0) {
                if (typeof currentBook.category !== 'undefined') {
                    return typeof categories[currentBook.category] !== 'undefined' ?
                        categories[currentBook.category].books : [];
                }
                if (typeof currentBook.author !== 'undefined') {
                    let booksByAuthor = [];
                    books.forEach(function(elem) {
                        if (elem.author === currentBook.author) {
                            booksByAuthor.push(elem);
                        }
                    });
                    return booksByAuthor;
                }
            }
            return books;

        }


        function addBook(book) {
            function validateParameter(collection, param) {
                if (typeof collection[param] === 'string') {
                    if (param === 'title' || param === 'category') {
                        if (collection[param].length < 2 || collection[param].length > 100) {
                            throw new Error('Invalid' + param);
                        }
                    } else if (param === 'author') {
                        if (collection[param] === '') {
                            throw new Error('Invalid author!');
                        }
                    } else if (param === 'isbn') {
                        if (collection[param].length !== 10 && collection[param].length !== 13) {
                            throw new Error('Invalid ISBN!');
                        }
                        if (!(/^[0-9]+$/).test(collection[param].toString())) {
                            throw new Error('ISBN must be a valid number');
                        }
                    } else {
                        //should not happen
                    }
                } else if (collection[param] === 'undefined') {
                    throw new Error('The' + param + 'is missing');
                } else {
                    //should not happen
                }

            }

            function parameterAlreadyExists(name, type) {
                for (let ind = 0, len = books.length; ind < len; ind += 1) {
                    if (books[ind][type] === name) {
                        return true;
                    }
                }
                return false;
            }

            function throwBookParamNotUniqueError(parameter) {
                throw new Error('A book with the same' + parameter + 'already exists.');
            }

            if (parameterAlreadyExists(book.title, 'title')) {
                throwBookParamNotUniqueError('title');
            }
            if (parameterAlreadyExists(book.isbn, 'isbn')) {
                throwBookParamNotUniqueError('ISBN');
            }
            if (categories.indexOf(book.category) < 0) {
                addCategory(book.category);
            }
            book.ID = books.length + 1;
            categories[book.category].books.push(book);
            validateParameter(book, 'title');
            validateParameter(book, 'category');
            validateParameter(book, 'author');
            validateParameter(book, 'isbn');
            books.push(book);
            return book;
        }

        function addCategory(name) {
            categories[name] = {
                books: [],
                ID: categories.length + 1
            };
        }

        function listCategories(category) {
            let categoriesName = [];
            Array.prototype.push.apply(categoriesName, Object.keys(categories));
            return categoriesName;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}
module.exports = solve;