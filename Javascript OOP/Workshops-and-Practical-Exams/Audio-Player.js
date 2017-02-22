function solve() {
    let getNextId = (function() {
        let counter = 0;
        return function() {
            counter += 1;
            return counter;
        }
    })();

    const VALIDATOR = {
        validateString: function(str) {
            if (typeof str !== 'string' || str.length < 3 || str.length > 25) {
                throw new Error('Invalid' + str + '!');
            }
        },
        validateLength: function(length) {
            if (typeof length !== 'number' || length <= 0) {
                throw new Error('Invalid length!');
            }
        },
        validateImdbRating: function(rating) {
            if (typeof rating !== 'number' || rating < 1 || rating > 5) {
                throw new Error('Invalid' + rating + '!');
            }
        }
    };

    class Player {
        constructor(name) {
            this.name = name;
            this._playlists = [];
        }
        get name() {
            return this._name;
        }
        set name(name) {
            VALIDATOR.validateString(name);
            this._name = name;
        }
        get playlists() {
            return this._playlists;
        }
        addPlaylist(playlistToAdd) {
            if (typeof playlistToAdd !== 'object' || !playlistToAdd.hasOwnProperty('_name')) {
                throw new Error('Not a PlayList instance');
            }
            this._playlists.push(playlistToAdd);
            return this;
        }
        getPlaylistById(id) {
            return this._playlists.find(item => item.id = id) || null;
        }
        removePlaylist(arg) {
            let index;
            if (typeof arg === 'number') {
                index = this._playlists.findIndex(item => item.id === arg);
            }
            if (typeof arg === 'object') {
                index = this._playlists.findIndex(item => item.id === arg.id);
            }
            if (index === -1) {
                throw new Error('No such playlist!');
            }
            this._playlists.splice(index, 1);
            return this;
        }
        listPlaylists(page, size) {
            let len = this._playlists.length,
                newArr = [];
            if (typeof page !== 'number' || typeof size !== 'number' || page !== (page | 0) || size !== (size | 0) || page * size >= len || page < 0 || size <= 0) {
                throw new Error('Invalid data');
            }
            let sorted = this._playlists.slice()
                .sort((x, y) => x.id - y.id)
                .sort((x, y) => x.name.localeCompare(y.name));

            if (page === 0) {
                for (let i = 0; i < size; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else if (page > 0 && page < Math.floor(sorted.length / size)) {
                for (let i = page * size; i < (page + 1) * size; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else if (page === Math.floor(sorted.length / size)) {
                for (let i = page * size; i < sorted.length; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else {
                //should not happen
            }
            return newArr;
        }
        contains(playable, playlist) {
            let index;
            if (!this._playlists.find(item => (item.name === playlist.name) && (item.id === playlist.id))) {
                throw new Error('Non existent playlist!');
            }
            if (playable.hasOwnProperty('length')) {
                index = playlist._items.findIndex(item => item.title === playable.title && item.author === playable.author && item.length === playable.length);
            } else if (playable.hasOwnProperty('imdbRating')) {
                index = playlist._items.findIndex(item => item.title === playable.title && item.author === playable.author && item.imdbRating === playable.imdbRating);
            } else {
                index = playlist._items.findIndex(item => item.title === playable.title && item.author === playable.author);
            }
            if (index === -1) {
                return false;
            }
            return true;
        }
        search(pattern) {
            return this._playlists.filter(playlist => playlist._items.filter(song => song.title.indexOf(pattern) > -1))
                .map(playlist => {
                    return {
                        id: playlist.id,
                        title: playlist.title
                    };
                });


        }
    }

    class PlayList {
        constructor(name) {
            this.name = name;
            this._id = getNextId();
            this._items = [];
        }
        get name() {
            return this._name;
        }
        set name(name) {
            VALIDATOR.validateString(name);
            this._name = name;
        }
        get id() {
            return this._id;
        }
        get items() {
            this._items;
        }
        addPlayable(playable) {
            this._items.push(playable);
            return this;
        }
        getPlayableById(id) {
            return this._items.find(item => item.id === id) || null;
        }
        removePlayable(arg) {
            let index;
            if (typeof arg === 'number') {
                index = this._items.findIndex(item => item.id === arg);
            }
            if (typeof arg === 'object') {
                index = this._items.findIndex(item => item.id === arg.id);
            }
            if (index === -1) {
                throw new Error("No such playable!");
            }
            this._items.splice(index, 1);
            return this;
        }
        listPlayables(page, size) {
            let len = this._items.length,
                newArr = [];
            if (typeof page !== 'number' || typeof size !== 'number' || page !== (page | 0) || size !== (size | 0) || page * size >= len || page < 0 || size <= 0) {
                throw new Error('Invalid data');
            }
            let sorted = this._items.slice()
                .sort((x, y) => x.id - y.id)
                .sort((x, y) => x.title.localeCompare(y.title));

            if (page === 0) {
                for (let i = 0; i < size; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else if (page > 0 && page < Math.floor(sorted.length / size)) {
                for (let i = page * size; i < (page + 1) * size; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else if (page === Math.floor(sorted.length / size)) {
                for (let i = page * size; i < sorted.length; i += 1) {
                    newArr.push(sorted[i]);
                }
            } else {
                //should not happen
            }
            return newArr;
        }
    }

    class Playable {
        constructor(title, author) {
            this._id = getNextId();
            this.title = title;
            this.author = author;
        }
        get id() {
            return this._id;
        }
        get title() {
            return this._title;
        }
        set title(title) {
            VALIDATOR.validateString(title);
            this._title = title;
        }
        get author() {
            return this._author;
        }
        set author(author) {
            VALIDATOR.validateString(author);
            this._author = author;
        }
        play() {
            //[id]. [title] - [author]
            return ('[' + this.id + ']. [' + this.title + '] - [' + this.author + ']');
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            this.length = length;
        }
        get length() {
            return this._length;
        }
        set length(length) {
            VALIDATOR.validateLength(length);
            this._length = length;
        }
        play() {
            let text = super.play();
            return (text + ' - [' + this.length + ']');
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);
            this.imdbRating = imdbRating;
        }
        get imdbRating() {
            return this._imdbRating;
        }
        set imdbRating(imdbRating) {
            VALIDATOR.validateImdbRating(imdbRating);
            this._imdbRating = imdbRating;
        }
        play() {
            let text = super.play();
            //- [imdbRating]
            return (text + ' - [' + this.imdbRating + ']');
        }
    }


    const module = {
        getPlayer: function(name) {
            return new Player(name);
        },
        getPlaylist: function(name) {
            return new PlayList(name);
        },
        getAudio: function(title, author, length) {
            return new Audio(title, author, length);
        },
        getVideo: function(title, author, imdbRating) {
            return new Video(title, author, imdbRating);
        }
    };

    return module;
}

module.exports = solve;