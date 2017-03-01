function solve() {
    const getNextId = (function() {
        let counter = 0;
        return function() {
            counter += 1;
            return counter;
        }
    })();

    function isString(str) {
        if (typeof str !== 'string') {
            return false;
        }
        return true;
    }

    function isNumber(num) {
        if (typeof num !== 'number') {
            return false;
        }
        return true;
    }

    function validateRange(number, min, max) {
        if (!isNumber(number) || number < min || number > max) {
            throw 'Not in range';
        }
    }

    function validateBiggerThan(number, otherNumber) {
        if (!isNumber(number) || number <= otherNumber) {
            throw 'Not a valid number';
        }
    }

    function validateStringLength(str, min, max) {
        if (!isString(str)) {
            throw new Error('Is not a string!');
        }
        validateRange(str.length, min, max);
    }

    function isNonEmptyString(str) {
        if (!isString(str) || str === '') {
            throw 'Empty string!';
        }
    }

    function validateIsbn(isbn) {
        if (typeof isbn !== 'string' || !isbn.match(/^([0-9]{10}|[0-9]{13})$/)) {
            throw 'Isbn is not valid';
        }
    }

    function isAnObject(obj) {
        if (typeof obj !== 'object') {
            return false;
        }
        return true;
    }

    class Item {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this._id = getNextId();
        }
        get name() {
            return this._name;
        }
        set name(name) {
            validateStringLength(name, 2, 40);
            this._name = name;
        }
        get description() {
            return this._description;
        }
        set description(desc) {
            isNonEmptyString(desc);
            this._description = desc;
        }
        get id() {
            return this._id;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }
        get isbn() {
            return this._isbn;
        }
        set isbn(isbn) {
            validateIsbn(isbn);
            this._isbn = isbn;
        }
        get genre() {
            return this._genre;
        }
        set genre(genre) {
            validateStringLength(genre, 2, 20);
            this._genre = genre;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.duration = duration;
            this.rating = rating;
        }
        get duration() {
            return this._duration;
        }
        set duration(duration) {
            validateBiggerThan(duration, 0);
            this._duration = duration;
        }
        get rating() {
            return this._rating;
        }
        set rating(rating) {
            validateRange(rating, 1, 5);
            this._rating = rating;
        }
    }

    class Catalog {
        constructor(name) {
            this._id = getNextId();
            this.name = name;
            this._items = [];
        }
        get id() {
            return this._id;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            validateStringLength(name, 2, 40);
            this._name = name;
        }
        get items() {
            return this._items;
        }
        add(...items) {
            if (Array.isArray(items[0])) {
                items = items[0];
            }
            if (items.length === 0) {
                throw 'No items were passed!';
            }
            items.forEach(item => {
                if (!isAnObject(item)) {
                    throw new Error('Not an object!');
                }
                validateBiggerThan(item.id, 0);
                validateStringLength(item.name, 2, 40);
                isNonEmptyString(item.description);
            });


            this._items.push(...items);
            return this;
        }
        find(arg) {
            function findById(id) {
                if (!isNumber(id)) {
                    throw new Error('Not a number');
                }
                return this._items.find(item => item.id === id) || null;
            }

            function findByOptions(options) {
                if (!isAnObject(options)) {
                    throw new Error('Not an object!');
                }
                return this._items.filter(item => {
                    return ((!options.hasOwnProperty('name') || item.name === options.name) &&
                        (!options.hasOwnProperty('id') || item.id === options.id));
                });
            }

            if (isAnObject(arg)) {
                return findByOptions.call(this, arg);
            }
            return findById.call(this, arg);
        }

        search(pattern) {
            isNonEmptyString(pattern);
            return this._items.filter(item => {
                return item.name.indexOf(pattern) >= 0 || item.description.indexOf(pattern) >= 0;
            });
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...books) {
            if (Array.isArray(books[0])) {
                books = books[0];
            }
            books.forEach(book => {
                if (!isAnObject(book)) {
                    throw new Error('Not an object!');
                }
                validateIsbn(book.isbn);
                validateStringLength(book.genre, 2, 20);
            });
            return super.add(books);
        }
        getGenres() {
            return this._items.map(item => item.genre.toLowerCase())
                .sort((a, b) => a.localeCompare(b))
                .filter((genre, index, genres) => genre !== genres[index - 1]);
        }
        find(arg) {
            if (isAnObject(arg)) {
                const books = super.find(arg);
                if (arg.hasOwnProperty('genre')) {
                    return books.filter(book => book.genre === arg.genre);
                }
                return books;
            }
            return super.find(arg);
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }
        add(...medias) {
            if (Array.isArray(medias[0])) {
                medias = medias[0];
            }

            medias.forEach(media => {
                if (!isAnObject(media)) {
                    throw new Error('Not an object!');
                }
                validateBiggerThan(media.duration, 0);
                validateRange(media.rating, 1, 5);
            });

            return super.add(medias);
        }
        getTop(count) {
            if (!isNumber(count)) {
                throw new Error('Not a number');
            }
            if (count < 1) {
                throw 'Count have to be more than 1!';
            }
            return this._items.slice()
                .sort((x, y) => y.rating - x.rating)
                .slice(0, count)
                .map(media => {
                    return {
                        name: media.name,
                        id: media.id
                    };
                });
        }
        getSortedByDuration() {
            return this._items.slice().sort((x, y) => {
                if (x.duration === y.duration) {
                    return x.id - y.id;
                }
                return y.duration - x.duration;
            });
        }
        find(arg) {
            if (isAnObject(arg)) {
                const medias = super.find(arg);
                if (arg.hasOwnProperty('rating')) {
                    return medias.filter(media => media.rating === arg.rating);
                }
                return medias;
            }
            return super.find(arg);
        }
    }


    return {
        getBook: function(name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function(name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function(name) {
            return new BookCatalog(name);
        },
        getMediaCatalog: function(name) {
            return new MediaCatalog(name);
        }
    };
}

module.exports = solve;