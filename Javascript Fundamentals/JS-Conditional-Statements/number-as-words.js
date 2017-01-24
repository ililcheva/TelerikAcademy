'use strict';

function solve(args) {
    var number = +args[0],
        onesDigit = number % 10,
        tensDigit = ((number / 10) | 0) % 10,
        hundredsDigit = ((number / 100) | 0) % 10;
    if (number >= 0 && number < 10) {
        switch (onesDigit) {
            case 1:
                onesDigit = 'One';
                break;
            case 2:
                onesDigit = 'Two';
                break;
            case 3:
                onesDigit = 'Three';
                break;
            case 4:
                onesDigit = 'Four';
                break;
            case 5:
                onesDigit = 'Five';
                break;
            case 6:
                onesDigit = 'Six';
                break;
            case 7:
                onesDigit = 'Seven';
                break;
            case 8:
                onesDigit = 'Eight';
                break;
            case 9:
                onesDigit = 'Nine';
                break;
            case 0:
                onesDigit = 'Zero';
                break;
        }
        console.log(onesDigit);
    } else if (number >= 10 && number < 20) {
        switch (onesDigit) {
            case 0:
                onesDigit = 'Ten';
                break;
            case 1:
                onesDigit = 'Eleven';
                break;
            case 2:
                onesDigit = 'Twelve';
                break;
            case 3:
                onesDigit = 'Thirteen';
                break;
            case 4:
                onesDigit = 'Fourteen';
                break;
            case 5:
                onesDigit = 'Fifteen';
                break;
            case 6:
                onesDigit = 'Sixteen';
                break;
            case 7:
                onesDigit = 'Seventeen';
                break;
            case 8:
                onesDigit = 'Eighteen';
                break;
            case 9:
                onesDigit = 'Nineteen';
                break;
        }
        console.log(onesDigit);
    } else if (number >= 20 && number < 100) {
        switch (tensDigit) {
            case 2:
                tensDigit = 'Twenty';
                break;
            case 3:
                tensDigit = 'Thirty';
                break;
            case 4:
                tensDigit = 'Forty';
                break;
            case 5:
                tensDigit = 'Fifty';
                break;
            case 6:
                tensDigit = 'Sixty';
                break;
            case 7:
                tensDigit = 'Seventy';
                break;
            case 8:
                tensDigit = 'Eighty';
                break;
            case 9:
                tensDigit = 'Ninety';
                break;
        }
        if (onesDigit === 0) {
            console.log(tensDigit);
        } else {
            switch (onesDigit) {
                case 1:
                    onesDigit = 'one';
                    break;
                case 2:
                    onesDigit = 'two';
                    break;
                case 3:
                    onesDigit = 'three';
                    break;
                case 4:
                    onesDigit = 'four';
                    break;
                case 5:
                    onesDigit = 'five';
                    break;
                case 6:
                    onesDigit = 'six';
                    break;
                case 7:
                    onesDigit = 'seven';
                    break;
                case 8:
                    onesDigit = 'eight';
                    break;
                case 9:
                    onesDigit = 'nine';
                    break;
            }
            console.log(tensDigit + ' ' + onesDigit);
        }
    } else {
        switch (hundredsDigit) {
            case 1:
                hundredsDigit = 'One hundred';
                break;
            case 2:
                hundredsDigit = 'Two hundred';
                break;
            case 3:
                hundredsDigit = 'Three hundred';
                break;
            case 4:
                hundredsDigit = 'Four hundred';
                break;
            case 5:
                hundredsDigit = 'Five hundred';
                break;
            case 6:
                hundredsDigit = 'Six hundred';
                break;
            case 7:
                hundredsDigit = 'Seven hundred';
                break;
            case 8:
                hundredsDigit = 'Eight hundred';
                break;
            case 9:
                hundredsDigit = 'Nine hundred';
                break;
        }
        if ((onesDigit === 0) && (tensDigit === 0)) {
            console.log(hundredsDigit);
        } else if (tensDigit === 0) {
            switch (onesDigit) {
                case 1:
                    onesDigit = 'one';
                    break;
                case 2:
                    onesDigit = 'two';
                    break;
                case 3:
                    onesDigit = 'three';
                    break;
                case 4:
                    onesDigit = 'four';
                    break;
                case 5:
                    onesDigit = 'five';
                    break;
                case 6:
                    onesDigit = 'six';
                    break;
                case 7:
                    onesDigit = 'seven';
                    break;
                case 8:
                    onesDigit = 'eight';
                    break;
                case 9:
                    onesDigit = 'nine';
                    break;
            }
            console.log(hundredsDigit + ' and ' + onesDigit);
        } else if (tensDigit === 1) {
            switch (onesDigit) {
                case 0:
                    onesDigit = 'ten';
                    break;
                case 1:
                    onesDigit = 'eleven';
                    break;
                case 2:
                    onesDigit = 'twelve';
                    break;
                case 3:
                    onesDigit = 'thirteen';
                    break;
                case 4:
                    onesDigit = 'fourteen';
                    break;
                case 5:
                    onesDigit = 'fifteen';
                    break;
                case 6:
                    onesDigit = 'sixteen';
                    break;
                case 7:
                    onesDigit = 'seventeen';
                    break;
                case 8:
                    onesDigit = 'eighteen';
                    break;
                case 9:
                    onesDigit = 'nineteen';
                    break;
            }
            console.log(hundredsDigit + ' and ' + onesDigit);
        } else {
            switch (tensDigit) {
                case 2:
                    tensDigit = 'twenty';
                    break;
                case 3:
                    tensDigit = 'thirty';
                    break;
                case 4:
                    tensDigit = 'forty';
                    break;
                case 5:
                    tensDigit = 'fifty';
                    break;
                case 6:
                    tensDigit = 'sixty';
                    break;
                case 7:
                    tensDigit = 'seventy';
                    break;
                case 8:
                    tensDigit = 'eighty';
                    break;
                case 9:
                    tensDigit = 'ninety';
                    break;
            }
            if (onesDigit === 0) {
                console.log(hundredsDigit + ' and ' + tensDigit);
            } else {
                switch (onesDigit) {
                    case 1:
                        onesDigit = 'one';
                        break;
                    case 2:
                        onesDigit = 'two';
                        break;
                    case 3:
                        onesDigit = 'three';
                        break;
                    case 4:
                        onesDigit = 'four';
                        break;
                    case 5:
                        onesDigit = 'five';
                        break;
                    case 6:
                        onesDigit = 'six';
                        break;
                    case 7:
                        onesDigit = 'seven';
                        break;
                    case 8:
                        onesDigit = 'eight';
                        break;
                    case 9:
                        onesDigit = 'nine';
                        break;
                }
                console.log(hundredsDigit + ' and ' + tensDigit + ' ' + onesDigit);
            }
        }
    }
}

var arr = ['888'];
solve(arr);