/* Enable strict mode */
"use strict";

/* Tests */
console.log(`1: ${main(1)}`);
console.log(`2: ${main(1)}`);
console.log(`3: ${main(3)}`);
console.log(`4: ${main(4)}`);
console.log(`5: ${main(5)}`);
console.log(`6: ${main(6)}`);
console.log(`7: ${main(7)}`);
console.log(`8: ${main(8)}`);
console.log(`9: ${main(9)}`);
console.log(`10: ${main(10)}`);
console.log(`13: ${main(13)}`);
console.log(`15: ${main(15)}`);
console.log(`21: ${main(21)}`);
console.log(`33: ${main(33)}`);
console.log(`51: ${main(51)}`);
console.log(`53: ${main(53)}`);
console.log(`75: ${main(75)}`);

/* Function main que resuelve la primera kata */
function main(number) {
    try {
        /* Throw an exception in case of wrong parameters */
        if (isNaN(number) || number < 1 || number > 100) throw 'Error';
        /* Result is the string that will be returned from this function */
        let result = '';
        result += divisible(number,3)?'Foo':'';
        result += divisible(number,5)?'Bar':'';
        result += divisible(number,7)?'Quix':'';
        /* Loop over each character of the number recevied as a parameter */
        let numberChar = String(number);
        for (let i = 0; i < numberChar.length; i++) {
            switch (numberChar[i]) {
                case '3':   result += 'Foo';    break;
                case '5':   result += 'Bar';    break;
                case '7':   result += 'Quix';   break;
            }
        }
        return result;
    } catch (error) {
        return 'Error. Debe introducir un número entre 1 y 100';
    }        
}

/* Function to check wether number is divisible by base or not */
function divisible (number, base) {
    return number % base === 0;
}