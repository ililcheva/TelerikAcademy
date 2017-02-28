function solve() {
    'use strict';

    function isString(str) {
        if (typeof str !== 'string') {
            return false;
        }
        return true;
    }

    function isNumber(num) {
        if (isNaN(num) || typeof num !== 'number') {
            return false;
        }
        return true;
    }

    function isObject(obj) {
        if (typeof obj !== 'object') {
            return false;
        }
        return true;
    }

    function copyApp(app) {
        return {
            name: app.name,
            description: app.description,
            version: app.version,
            rating: app.rating,
            apps: app.apps // this is for stores
        };
    }

    const VALIDATOR = {
        validateName: function(name) {
            if (!isString(name) || !(/^([A-Za-z0-9\s]{1,24})$/g).test(name) || !(name.length >= 1 && name.length <= 24)) {
                throw new Error('Invalid name!');
            }
        },
        validateDescription: function(desc) {
            if (!isString(desc)) {
                throw new Error('Invalid description!');
            }
        },
        validateVersion: function(version) {
            if (!isNumber(version) || version <= 0) {
                throw new Error('Invalid version!');
            }
        },
        validateRating: function(rating) {
            if (!isNumber(rating) || !(rating >= 1 && rating <= 10)) {
                throw new Error('Invalid rating!');
            }
        },
        validateHostname: function(hostname) {
            if (!isString(hostname) || !(hostname.length >= 1 && hostname.length <= 32)) {
                throw new Error('Invalid hostname!');
            }
        },
        validateApps: function(apps) {
            apps.forEach(app => {
                if (Array.isArray(app)) {
                    app.forEach(a => {
                        if (!(a instanceof App)) {
                            throw new Error('There is an invalid app!');
                        }
                    });
                }
                if (!(app instanceof App)) {
                    throw new Error('There is an invalid app!');
                }
            });
        }
    };

    class App {
        constructor(name, description, version, rating) {
            this.name = name;
            this.description = description;
            this.version = version;
            this.rating = rating;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            VALIDATOR.validateName(name);
            this._name = name;
        }
        get description() {
            return this._description;
        }
        set description(description) {
            VALIDATOR.validateDescription(description);
            this._description = description;
        }
        get version() {
            return this._version;
        }
        set version(version) {
            VALIDATOR.validateVersion(version);
            this._version = version;
        }
        get rating() {
            return this._rating;
        }
        set rating(rating) {
            VALIDATOR.validateRating(rating);
            this._rating = rating;
        }

        release(args) {
            if (isNumber(args)) {
                if (!(args > this.version)) {
                    throw new Error('Version should be higher than the previous one!');
                }
                VALIDATOR.validateVersion(args);
                this.version = args;
            } else if (isObject(args)) {
                if (args.version === undefined) {
                    throw new Error('This property is mandatory!');
                } else {
                    if (!(args.version > this.version)) {
                        throw new Error('Version should be higher than the previous one!');
                    }
                    if (args.hasOwnProperty('description')) {
                        VALIDATOR.validateDescription(args.description);
                        this.description = args.description;
                    }
                    if (args.hasOwnProperty('rating')) {
                        VALIDATOR.validateRating(args.rating);
                        this.rating = args.rating;
                    }
                    VALIDATOR.validateVersion(args.version);
                    this.version = args.version;

                }
            } else {
                throw new Error('Invalid args!');
            }
            return this;
        }
    }

    class Store extends App {
        constructor(name, description, version, rating) {
            super(name, description, version, rating);
            this._apps = [];
        }
        get apps() {
            return this._apps;
        }
        uploadApp(app) {
            if (!(app instanceof App)) {
                throw new Error('app must be a valid instance of App!');
            }
            let indexOfApp = this._apps.findIndex(item => item.name === app.name);
            if (indexOfApp !== -1) {
                this._apps.splice(indexOfApp, 1);
            }
            this._apps.push(copyApp(app));
            return this;
        }
        takedownApp(name) {
            let appIndex = this._apps.findIndex(app => app.name === name);
            if (appIndex === -1) {
                throw new Error('An app with the given name does not exist in the store!');
            }
            this._apps.splice(appIndex, 1);
            return this;
        }
        search(pattern) {
            let regex = new RegExp(pattern, 'i');
            return this._apps.slice()
                .filter(app => app.name.search(regex) > -1)
                .sort((a, b) => a.name.localeCompare(b.name));
        }
        listMostRecentApps(count) {
            count = count || 10;

            return this._apps.slice()
                .reverse()
                .slice(0, count);
        }

        listMostPopularApps(count) {
            count = count || 10;

            return this._apps.map((app, index) => ({ app, index }))
                .sort((x, y) => {
                    if (y.app.rating !== x.app.rating) {
                        return y.app.rating - x.app.rating;
                    }
                    return y.index - x.index;
                })
                .slice(0, count)
                .map(x => x.app);
        }
    }

    class Device {
        constructor(hostname, apps) {
            this.hostname = hostname;
            if (!Array.isArray(apps)) {
                throw new Errpr('Not an array!');
            }
            this.apps = apps;
            this._stores = apps.filter(store => store instanceof Store).map(store => copyApp(store));
        }
        get hostname() {
            return this._hostname;
        }
        set hostname(hostname) {
            VALIDATOR.validateHostname(hostname);
            this._hostname = hostname;
        }
        get apps() {
            return this._apps;
        }
        set apps(apps) {
            VALIDATOR.validateApps(apps);
            this._apps = apps.map(app => copyApp(app));
        }
        search(pattern) {
            let regex = new RegExp(pattern, 'i'),
                matched = [],
                appsArr = [];
            if (this._stores.length > 0) {
                this._stores.forEach(store => {
                    matched = store.apps.filter(app => app.name.search(regex) > -1);
                    appsArr.push(...matched);
                });
                appsArr.sort((a, b) => a.name.localeCompare(b.name));

                for (let i = 1; i < appsArr.length; i += 1) {
                    if (appsArr[i].name === appsArr[i - 1].name) {
                        if (appsArr[i].version > appsArr[i - 1].version) {
                            appsArr.splice(i - 1, 1);
                        } else {
                            appsArr.splice(i, 1);
                        }
                    }
                }
                return appsArr;
            }


        }
        install(name) {
            let appIndex = this.apps.findIndex(app => app.name === name);
            let foundApps;
            if (appIndex === -1) {
                foundApps = this.search(name);
                let app = foundApps.find(app => app.name = name);
                if (app === undefined) {
                    throw new Error('Not found in the installed stores!');
                } else {
                    this._apps.push(copyApp(app));
                }
            }
            return this;
        }

        uninstall(name) {
            let appIndex = this.apps.findIndex(app => app.name === name);
            if (appIndex === -1) {
                throw new Error('No such app is installed!');
            }
            this._apps.splice(appIndex, 1);
            return this;
        }
        listInstalled() {
            return this.apps.slice().sort((x, y) => x.name.localeCompare(y.name));
        }
        update() {
            this.apps.forEach(app => {
                let foundApps = this.search(app.name);
                let item = foundApps.find(particular => particular.name === app.name);
                if (item !== undefined) {
                    if (item.version > app.version) {
                        app.version = item.version;
                        app.description = item.description;
                        app.rating = item.rating;
                    }
                }
            });
            return this;
        }
    }

    return {
        createApp(name, description, version, rating) {
            return new App(name, description, version, rating);
        },
        createStore(name, description, version, rating) {
            return new Store(name, description, version, rating);
        },
        createDevice(hostname, apps) {
            return new Device(hostname, apps);
        }
    };
}

// Submit the code above this line in bgcoder.com
module.exports = solve;
/*
let object = solve();
let app1 = object.createApp('Youtube', 'hihihihi', 6.7, 10);
let app2 = object.createApp('YoutubeDL', 'hihihihi', 6.9, 10);
let app3 = object.createApp('Zamunda', 'hihihihi', 8, 10);
let app4 = object.createApp('Temple Run', 'hihihihia', 1, 10);
let app5 = object.createApp('Subway Surfers', 'hihihihi', 2, 10);
let app6 = object.createApp('Zamunda', 'hihihihi', 5, 10);
let store = object.createStore('Google Play', 'hihihih', 1, 10);
store.uploadApp(app1);
store.uploadApp(app2);
let store1 = object.createStore('iTunes', 'hihihi', 1, 9);
store1.uploadApp(app3);
store1.uploadApp(app4);
let arr = [store, store1, app5];
//let app2_1 = object.createApp('YoutubeDL', 'hihihihi', 9, 10);
//store.uploadApp(app2_1);
let device = object.createDevice('Iva', arr);
device.uninstall('Subway Surfers');
device.install('Youtube');
console.log(device.listInstalled());
//console.log(device.search('e'));*/