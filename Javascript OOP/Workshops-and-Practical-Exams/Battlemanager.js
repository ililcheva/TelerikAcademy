function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    let getNextId = (function() {
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

    function isObject(obj) {
        if (typeof obj !== 'object') {
            return false;
        }
        return true;
    }

    function isInRange(num, min, max) {
        if (!isNumber(num) || num < min || num > max) {
            return false;
        }
        return true;
    }

    function isFunction(func) {
        if (typeof func !== 'function') {
            return false;
        }
        return true;
    }

    const VALIDATOR = {
        validateName: function(name) {
            if (!isString(name)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
            if (!isInRange(name.length, 2, 20)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            let invalidSymbols = (/^[A-Za-z\s]/).test(name);
            if (!invalidSymbols) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validateManaCost: function(manaCost) {
            if (!isNumber(manaCost) || manaCost <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        },
        validateEffect: function(effect) {
            if (!isFunction(effect) || effect.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },
        validateUnitName: function(name) {
            if (!isString(name)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
            if (!isInRange(name.length, 2, 20)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            let invalidSymbols = (/^[A-Za-z]/).test(name);
            if (!invalidSymbols) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validateAlignment: function(alignment) {
            let invalidAlignment = ['good', 'neutral', 'evil'].indexOf(alignment) === -1;
            if (!isString(alignment) || invalidAlignment) {
                throw new Error('Alignment must be good, neutral or evil!');
            }
        },
        validateDamage: function(damage) {
            if (!isNumber(damage) || !isInRange(damage, 0, 100)) {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }
        },
        validateHealth: function(health) {
            if (!isNumber(health) || !(health >= 0 && health <= 200)) {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }
        },
        validateCount: function(count) {
            if (!isNumber(count) || !Number.isInteger(count) || count < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }
        },
        validateSpeed: function(speed) {
            if (!isNumber(speed) || !isInRange(speed, 0, 100)) {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }
        },
        validateMana: function(mana) {
            if (!isNumber(mana) || !Number.isInteger(mana) || mana < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        }

    };

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            VALIDATOR.validateName(name);
            this._name = name;
        }
        get manaCost() {
            return this._manaCost;
        }
        set manaCost(manaCost) {
            VALIDATOR.validateManaCost(manaCost);
            this._manaCost = manaCost;
        }
        get effect() {
            return this._effect;
        }
        set effect(effect) {
            VALIDATOR.validateEffect(effect);
            this._effect = effect;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }
        get name() {
            return this._name;
        }
        set name(name) {
            VALIDATOR.validateUnitName(name);
            this._name = name;
        }
        get alignment() {
            return this._alignment;
        }
        set alignment(alignment) {
            VALIDATOR.validateAlignment(alignment)
            this._alignment = alignment;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, speed, count, damage, health) {
            super(name, alignment);
            this._id = getNextId();
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }
        get id() {
            return this._id;
        }
        get damage() {
            return this._damage;
        }
        set damage(damage) {
            VALIDATOR.validateDamage(damage);
            this._damage = damage;
        }
        get health() {
            return this._health;
        }
        set health(health) {
            VALIDATOR.validateHealth(health);
            this._health = health;
        }
        get count() {
            return this._count;
        }
        set count(count) {
            VALIDATOR.validateCount(count);
            this._count = count;
        }
        get speed() {
            return this._speed;
        }
        set speed(speed) {
            VALIDATOR.validateSpeed(speed);
            this._speed = speed;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);
            this.mana = mana;
            this._spellbook = [];
            this._army = [];
        }
        get mana() {
            return this._mana;
        }
        set mana(mana) {
            VALIDATOR.validateMana(mana);
            this._mana = mana;
        }
        get spellbook() {
            return this._spellbook;
        }
        set spellbook(spellbook) {
            this._spellbook = spellbook;
        }
        get army() {
            return this._army;
        }
        set army(army) {
            this._army = army;
        }
    }

    const battleManagerData = {
        commanders: [],
        armyUnits: []
    };

    const battlemanager = {
        getCommander: function(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        },
        getArmyUnit: function(options) {
            let { name, alignment, speed, count, damage, health } = options;
            const newArmyUnit = new ArmyUnit(name, alignment, speed, count, damage, health);
            battleManagerData.armyUnits.push(newArmyUnit);
            return newArmyUnit;
        },
        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        },
        addCommanders(...commanders) {
            battleManagerData.commanders.push(...commanders);
            return this;
        },
        addArmyUnitTo(commanderName, armyUnit) {
            battleManagerData.commanders.find(commander => commander.name === commanderName)._army.push(armyUnit);
            return this;
        },
        addSpellsTo(commanderName, ...spells) {
            spells.forEach(spell => {
                if (!(spell instanceof Spell)) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }
            })
            battleManagerData.commanders.find(commander => commander.name === commanderName)._spellbook.push(...spells);

            return this;
        },
        findCommanders(query) {
            return battleManagerData
                .commanders
                .slice()
                .filter(commander => (!query.hasOwnProperty('name') || commander.name === query.name) && (!query.hasOwnProperty('alignment') || commander.alignment === query.alignment))
                .sort((a, b) => a.name.localeCompare(b.name));
        },
        findArmyUnitById(id) {
            return battleManagerData.armyUnits.find(unit => unit.id === id);
        },
        findArmyUnits(query) {
            return battleManagerData
                .armyUnits
                .slice()
                .filter(unit => (!query.hasOwnProperty('name') || unit.name === query.name) && (!query.hasOwnProperty('id') || unit.id === query.id) && (!query.hasOwnProperty('alignment') || unit.alignment === query.alignment))
                .sort((a, b) => {
                    if (a.speed === b.speed) {
                        return a.name.localeCompare(b.name);
                    }
                    return b.speed - a.speed;
                });
        },
        spellcast(casterName, spellName, targetUnitId) {
            let caster = battleManagerData.commanders.find(commander => commander.name === casterName);
            if (caster === undefined) {
                throw new Error('Can\'t cast with non-existant commander ' + casterName + '!');
            }
            let spell = caster._spellbook.find(spell => spell.name === spellName);
            if (spell === undefined) {
                throw new Error(casterName + ' doesn\'t know ' + spellName);
            }
            if ((caster.mana - spell.manaCost) < 0) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }
            caster.mana -= spell.manaCost;
            const unit = battleManagerData.armyUnits.find(unit => unit.id === targetUnitId);
            if (typeof unit === 'undefined') {
                throw new Error(ERROR_MESSAGES.TARGET_NOT_FOUND);
            }
            spell.effect(unit);
            return this;
        },
        battle(attacker, defender) {
            [attacker, defender].forEach(person => {
                if (!(person instanceof ArmyUnit)) {
                    throw new Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                }
            });
            let attackerTotalDamage = attacker.damage * attacker.count,
                defenderTotalHealth = defender.health * defender.count;
            defenderTotalHealth -= attackerTotalDamage;
            let newCount = Math.ceil(defenderTotalHealth / defender.health);
            defender.count = newCount < 0 ? 0 : newCount;
            return this;
        }
    };

    return battlemanager;
}

module.exports = solve;
/*
const battlemanager = solve();

const cyki = battlemanager.getCommander('Cyki', 'good', 15),
    koce = battlemanager.getCommander('Koce', 'good', 20);

battlemanager.addCommanders(cyki, koce);

const penguins = battlemanager.getArmyUnit({
        name: 'Penguin Warriors',
        alignment: 'neutral',
        damage: 15,
        health: 40,
        speed: 10,
        count: 120
    }),
    cavalry = battlemanager.getArmyUnit({
        name: 'Horsemen',
        alignment: 'good',
        damage: 40,
        health: 60,
        speed: 50,
        count: 50
    });

const openVim = battlemanager.getSpell('Open vim', 10, target => target.damage -= 5),
    haste = battlemanager.getSpell('Haste', 5, target => target.speed += 5),
    callReinforcements = battlemanager.getSpell('Reinforcements', 10, target => target.count += 5)

battlemanager
    .addArmyUnitTo('Cyki', penguins)
    .addSpellsTo('Cyki', openVim, haste)
    .addArmyUnitTo('Koce', cavalry)
    .addSpellsTo('Koce', haste, callReinforcements)
    .spellcast('Koce', 'Haste', cavalry.id)
    .spellcast('Cyki', 'Open vim', cavalry.id)
    .battle(penguins, cavalry)
    .spellcast('Koce', 'Reinforcements', cavalry.id);*/
