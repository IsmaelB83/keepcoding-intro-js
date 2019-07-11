'use strict';

/* Imports */
let RomanNumber = require('./RomanNumber');

/* Instancio la clase para gestión de números romanos */
let romanNumbers = new RomanNumber (1, 3999);

/* Tests validador */
let tests1 = ['XI', 'IIX', 'VIII', 'IIIX', 'VII', 'IIII', 'IVV', 'XXC', 'LXXX', 'IVLVLDIII', 'VD', 'CDXCV', 'MMDCCCLXVIII'];
console.log('\n\r');
console.log('**********************************');
console.log('* TESTS DEL VALIDADOR DE NÚMEROS *');
console.log('**********************************');
tests1.forEach(t => {
    let errors = [];
    console.log (`- Es ${t} un número romano válido? ${romanNumbers.isValidNumber(t, errors)}`);
    // Si se han devuelto errores los muestro por pantalla
    if (errors.length > 0) {
        console.log(errors.join('\n\r'));
    }
});
// Resultado esperado true, false, true, false, true, false, false, false, true, false, false, true

/* Tests del conversor a decimal */
let tests2 = ['XXXV', 'XXI', 'VI', 'XIII', 'XXXVII', 'CLVII', 'CLXXVII', 'CXLV', 'CCLI', 'CXIV', 'DCCCXVII', 'CCCXXXII', 
              'CDXLVI', 'DCCCXCI', 'CCCLII', 'MMMCDXI', 'MMCMIX', 'MMCDLXV', 'MMDCCCXI', 'MMDCCCLXVIII' ];
console.log('\n\r');
console.log('*********************************');
console.log('* TESTS DEL CONVERSOR A DECIMAL *');
console.log('*********************************');
tests2.forEach(t => {
    console.log (`- Cual es el número decimal de ${t}? ${romanNumbers.romanToDec(t)}`);
});
// Resultado esperado 35, 21, 6, 13, 37, 157, 177, 145, 251, 114, 817, 332, 446, 891, 352, 3411, 2909, 2465, 2811, 2868

/* Tests del conversor a romano */
let tests3 = [35, 21, 6, 13, 37, 157, 177, 145, 251, 114, 817, 332, 446, 891, 352];
console.log('\n\r');
console.log('********************************');
console.log('* TESTS DEL CONVERSOR A ROMANO *');
console.log('********************************');
tests3.forEach(t => {
    let roman = romanNumbers.decToRoman(t);
    if (romanNumbers.isValidNumber(roman)) {
        console.log (`- Cual es el número romano de ${t}? ${roman}`);
    } else {
        console.log (`- Error calculando el número romano de ${t}. El número obtenido ${roman} no cumple las reglas de números romanos`);
    }
});
// Resultado esperado 'XXXV', 'XXI', 'VI', 'XIII', 'XXXVII', 'CLVII', 'CLXXVII', 'CXLV', 'CCLI', 'CXIV', 'DCCCXVII', 'CCCXXXII', 'CDXLVI', 'DCCCXCI'