/* Enable strict mode */
'use strict';

/* Hash table con la conversión por símbolo romano
    Romano  | Decimal 
    --------|--------
    I       | 1 
    V       | 5 
    X       | 10 
    L       | 50 
    C       | 100 
    D       | 500 
    M       | 1000 
    A esta tabla le voy a añadir los valores IV, IX, XL, XC, CD, CM para facilitar el algoritmo de conversión decimal-romano
 */
const values = new Map();
values.set('I', 1);
values.set('IV', 4);
values.set('V', 5);
values.set('IX', 9);
values.set('X', 10);
values.set('XL', 40);
values.set('L', 50);
values.set('XC', 90);
values.set('C', 100);
values.set('CD', 400);
values.set('D', 500);
values.set('CM', 900);
values.set('M', 1000);

/* Array de reglas que debe cumplir un número romano válido */
const rules = [];
// Evitar espacios en el número recibido
rules.push({rule: '\s',          message: 'Espacios en blanco no permitidos.'});
// Los únicos simbolos permitidos son I V X L C D M (case sensitive. El programa validador debe convertir a mayúsculas lo que pase el usuario)
rules.push({rule: '[^IVXLCDM]+', message: 'Sólo pueden utilizarse los símbolos:I V X L C D M.'});
// Los símbolos I, X, C y M se pueden repetir sólo hasta tres veces consecutivas
rules.push({rule: 'I{4,}',       message: 'I sólo puede aparecer un máximo de 3 veces consecutivas.'});
rules.push({rule: 'X{4,}',       message: 'X sólo puede aparecer un máximo de 3 veces consecutivas.'});
rules.push({rule: 'C{4,}',       message: 'C sólo puede aparecer un máximo de 3 veces consecutivas.'});
rules.push({rule: 'M{4,}',       message: 'M sólo puede aparecer un máximo de 3 veces consecutivas.'});
// Los símbolos V, L y D no pueden repetirse.
rules.push({rule: 'V.*?V',       message: 'V no puede aparecer más de una vez.'});
rules.push({rule: 'L.*?L',       message: 'L no puede aparecer más de una vez.'});
rules.push({rule: 'D.*?D',       message: 'D no puede aparecer más de una vez.'});
// Los símbolos I, X y C sólamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
rules.push({rule: 'I[^IVX]',     message: 'I sólo puede restar a V y X. O estar sucedido por un símbolo de menor valor. '});
rules.push({rule: 'X[^IVXLC]',   message: 'X sólo puede restar a L y C. O estar sucedido por un símbolo de menor valor. '});
rules.push({rule: 'C[^IVXLCDM]', message: 'C sólo puede restar a D y M. O estar sucedido por un símbolo de menor valor. '});
// Estas reglas sirven para controlar las normas en modo resta. Por ejemplo IIX, XXL, CCD son numeros incorrectos en romano
rules.push({rule: 'II[^I]',      message: 'II no es válido en notación resta.'});
rules.push({rule: 'XX[^IVX]',    message: 'XX no es válido en notación resta.'});
rules.push({rule: 'CC[^IVXLC]',  message: 'CC no es válido en notación resta.'});
// Símbolos V, L y D no pueden colocarse a la izquierda de otro mayor
rules.push({rule: 'V[XLCDM]',    message: 'V no puede preceder a un número de mayor valor.'}); 
rules.push({rule: 'L[CDM]',      message: 'L no puede preceder a un número de mayor valor.'});
rules.push({rule: 'D[M]',        message: 'D no puede preceder a un número de mayor valor.'});


/** 
 *  Función para validar números romanos 
 *  @params number: número romano a validar
 *  @params errors: array de errores detectados en el número validado. Si el número es válido el array se devolverá en blanco
 *  @returns: true = correcto - false = incorrecto
 */
function isValidNumber(number, errors) {
    // Reinicializao el array de errores en caso de que se haya recibido como parametro. Si no se ha recibido lo creo vacio.
    if (errors) {
        errors.splice(0,errors.length);
    } else {
        errors = [];
    }
    // Convierto a mayúsculas para evitar problemas case-sensitive
    number = number.toUpperCase();
    // Recorro el array de reglas aplicando por cada expresión regular el chequeo sobre el número recibido
    let flag = true;
    rules.forEach(r => {
        if (number.match(r.rule)) {
            // Si alguna regla salta es que es el número es erroneo. Almaceno la causa en el array
            flag = false;
            errors.push(r.message);
        }
    });
    return flag;
}

/** 
 *  Función para convertir a decimal desde un número romano
 *  @params number: número romano a convertir
 *  @returns: Integer con el número en decimal. O el valor -1 en caso de error
 */
function romanToDec (number) {
    // Primero se valida el string recibido
    if (!isValidNumber(number)) return -1;
    // Si el string es válido se continua
    let currentValue, nextValue, result = 0;
    for (let i = 0; i < number.length; i++) {        
        // Value of current roman digit
        currentValue = values.get(number[i]);
        // Value of next roman digit (in case it exists)
        if (i+1 < number.length) {
            nextValue = values.get(number[i+1]);
            // Algorythm
            if (currentValue >= nextValue) {
                result += currentValue;
            } else {
                result += nextValue - currentValue;
                i++;
            }        
        } else {
            result += currentValue;
            i++;
        }
    }
    // Return decimal value
    return result;
}

/** 
 *  Función para convertir a romano desde un número decimal
 *  @params number: número decimal a convertir
 *  @returns: String con el número en romano. O la cadena vacia en caso de error
 */
function decToRoman (number) {
    // Primero se valida el número recibido, y si está dentro del rango admitido
    if (isNaN(number) || number < 1 || number > 3999) {
        return '';
    }
    // Declaracion de variables locales a la función
    let value, auxValues, result = '';
    // Auxvalues me sirve para iterar sobre el dictionario de valores básicos, en orden inverso (mayor a menor valor)
    auxValues = Array.from(values).reverse();
    // Utilizo una variable auxiliar para no persistir las modificaciones que voy a hacer en el parámetro recibido
    value = number; 
    do {
        // Busco el símbolo romano de mayor posible, que sea menor o igual al valor restante del número calculado
        for (let i = 0; i < auxValues.length; i++) {
            let symbol = auxValues[i];
            if (symbol[1] <= value) {
                // Me quedo con el mayor valor posible, y resto ese valor al contador actual (value)
                result += symbol[0];
                value -= symbol[1];
                break;
            }
        }
    } while (value > 0);
    // Return decimal value
    return result;
}


/* Tests validador */
// Resultado esperado true, false, true, false, true, false, false, false, true, false, false, true
let tests1 = ['XI', 'IIX', 'VIII', 'IIIX', 'VII', 'IIII', 'IVV', 'XXC', 'LXXX', 'IVLVLDIII', 'VD', 'CDXCV', 'MMDCCCLXVIII'];
console.log('\n\r');
console.log('**********************************');
console.log('* TESTS DEL VALIDADOR DE NÚMEROS *');
console.log('**********************************');
tests1.forEach(t => {
    let errors = [];
    console.log (`- Es ${t} un número romano válido? ${isValidNumber(t, errors)}`);
    // Si se han devuelto errores los muestro por pantalla
    if (errors.length > 0) {
        console.log(errors.join('\n\r'));
    }
});

/* Tests del conversor a decimal */
// Resultado esperado 35, 21, 6, 13, 37, 157, 177, 145, 251, 114, 817, 332, 446, 891, 352, 3411, 2909, 2465, 2811, 2868
let tests2 = ['XXXV', 'XXI', 'VI', 'XIII', 'XXXVII', 'CLVII', 'CLXXVII', 'CXLV', 'CCLI', 'CXIV', 'DCCCXVII', 'CCCXXXII', 
              'CDXLVI', 'DCCCXCI', 'CCCLII', 'MMMCDXI', 'MMCMIX', 'MMCDLXV', 'MMDCCCXI', 'MMDCCCLXVIII' ];
console.log('\n\r');
console.log('*********************************');
console.log('* TESTS DEL CONVERSOR A DECIMAL *');
console.log('*********************************');
tests2.forEach(t => {
    console.log (`- Cual es el número decimal de ${t}? ${romanToDec(t)}`);
});

/* Tests del conversor a romano */
// Resultado esperado 'XXXV', 'XXI', 'VI', 'XIII', 'XXXVII', 'CLVII', 'CLXXVII', 'CXLV', 'CCLI', 'CXIV', 'DCCCXVII', 'CCCXXXII', 'CDXLVI', 'DCCCXCI'
let tests3 = [35, 21, 6, 13, 37, 157, 177, 145, 251, 114, 817, 332, 446, 891, 352];
console.log('\n\r');
console.log('********************************');
console.log('* TESTS DEL CONVERSOR A ROMANO *');
console.log('********************************');
tests3.forEach(t => {
    let roman = decToRoman(t);
    if (isValidNumber(roman)) {
        console.log (`- Cual es el número romano de ${t}? ${roman}`);
    } else {
        console.log (`- Error calculando el número romano de ${t}. El número obtenido ${roman} no cumple las reglas de números romanos`);
    }
});