/* Enable strict mode */
"use strict";

/* Hash table with key-value
    Romano  | Árabe 
    --------|--------
    I       | 1 
    V       | 5 
    X       | 10 
    L       | 50 
    C       | 100 
    D       | 500 
    M       | 1000 
 */
const values = [];
values.push({key: 'I', value: 1});
values.push({key: 'V', value: 5});
values.push({key: 'X', value: 10});
values.push({key: 'L', value: 50});
values.push({key: 'C', value: 100});
values.push({key: 'D', value: 500});
values.push({key: 'M', value: 1000});

/* Wrong rules table:
 *  - If any of these regex are included in the roman number it means is wrong (I will use this regex as long as .match method)
 *  - RulesT array contains the explanations of the rules included here.
 */
const rules = [];
rules.push({rule: '\s',          message: 'Whitespaces are not allowed.'});
rules.push({rule: '[^IVXLCDM]+', message: 'A roman number can contain only characters I, V, X, L, C, D, M.'});
rules.push({rule: 'I{4,}',       message: 'Character I detected more than three consecutive times.'});
rules.push({rule: 'X{4,}',       message: 'Character X detected more than three consecutive times.'});
rules.push({rule: 'C{4,}',       message: 'Character C detected more than three consecutive times.'});
rules.push({rule: 'M{4,}',       message: 'Character M detected more than three consecutive times.'});
rules.push({rule: 'V.*?V',       message: 'Character V detected more than once.'});
rules.push({rule: 'L.*?L',       message: 'Character L detected more than once.'});
rules.push({rule: 'D.*?D',       message: 'Character D detected more than once.'});
rules.push({rule: 'I[^IVX]',     message: 'I can be followed only by I, V or X.'});
rules.push({rule: 'X[^XLC]',     message: 'X can be followed only by X, L or C.'});
rules.push({rule: 'C[^CDM]',     message: 'C can be followed only by C, D or M.'});

/* Function to validate a roman number */
function validateRomanNumber(number) {
    let result = {value: true, message: []};
    number = number.toUpperCase();
    rules.forEach(r => {
        if (number.match(r.rule)) {
            result.value = false;
            result.message.push(r.message);
        }
    });
    return result;
}

function convertRomanToDec (number) {
    let valueBlock, valueNumber;
    for (let i = 0; i < number.length; i++) {
        const aux = number[i];
        
    }
}

/* Tests validador*/
let aux;
aux = validateRomanNumber('IIX');
console.log (`- IIX is a valid number? ${aux.value}`);
if (!aux.value) console.log(`Reasons:\n\r${aux.message.join('\n\r')}`);
aux = validateRomanNumber('IIIX');
console.log (`- IIIX is a valid number? ${aux.value}`);
if (!aux.value) console.log(`Reasons:\n\r${aux.message.join('\n\r')}`);
aux = validateRomanNumber('IIIIX');
console.log (`- IIIIX is a valid number? ${aux.value}`);
if (!aux.value) console.log(`Reasons:\n\r${aux.message.join('\n\r')}`);
aux = validateRomanNumber('IVV');
console.log (`- IVV is a valid number? ${aux.value}`);
if (!aux.value) console.log(`Reasons:\n\r${aux.message.join('\n\r')}`);
aux = validateRomanNumber('IVLVLDIIII');
console.log (`- IVLVLDIIII is a valid number? ${aux.value}`);
if (!aux.value) console.log(`Reasons:\n\r${aux.message.join('\n\r')}`);
