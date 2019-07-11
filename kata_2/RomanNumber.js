'use strict';

/**
 * Clase para trabajar con números romanos
 *  - Validación de números
 *  - Conversión de romano a decimal
 *  - Conversión de decimal a romano
 */
module.exports = class RomanNumber {
    
    /**
     * Carga los valores de los simbolos romanos y genera las reglas de validación.
     * @param {*} min Número mínimo que puede gestionar esta clase (1 en este casoº)
     * @param {*} max Número máximo que puede gestionar la clase (3999 en este caso)
     */
    constructor(min, max) {
        /**
         * Tabla de clave - valor con los simbolos básicos, y le añado también las sutracciones
         * básicas para facilitar el algoritmo de conversión decimal-romano:
         */
        this.values = new Map();
        this.values.set('I', 1);
        this.values.set('IV', 4);
        this.values.set('V', 5);
        this.values.set('IX', 9);
        this.values.set('X', 10);
        this.values.set('XL', 40);
        this.values.set('L', 50);
        this.values.set('XC', 90);
        this.values.set('C', 100);
        this.values.set('CD', 400);
        this.values.set('D', 500);
        this.values.set('CM', 900);
        this.values.set('M', 1000);  
        /* Array de reglas que debe cumplir un número romano válido */
        this.rules = [];
        // Evitar espacios en el número recibido
        this.rules.push({rule: '\s',          message: 'Espacios en blanco no permitidos.'});
        // Los únicos simbolos permitidos son I V X L C D M (case sensitive).
        this.rules.push({rule: '[^IVXLCDM]+', message: 'Sólo pueden utilizarse los símbolos: I V X L C D M.'});
        // Los símbolos I, X, C y M se pueden repetir sólo hasta tres veces consecutivas
        this.rules.push({rule: 'I{4,}',       message: 'I sólo puede aparecer un máximo de 3 veces consecutivas.'});
        this.rules.push({rule: 'X{4,}',       message: 'X sólo puede aparecer un máximo de 3 veces consecutivas.'});
        this.rules.push({rule: 'C{4,}',       message: 'C sólo puede aparecer un máximo de 3 veces consecutivas.'});
        this.rules.push({rule: 'M{4,}',       message: 'M sólo puede aparecer un máximo de 3 veces consecutivas.'});
        // Los símbolos V, L y D no pueden repetirse.
        this.rules.push({rule: 'V.*?V',       message: 'V no puede aparecer más de una vez.'});
        this.rules.push({rule: 'L.*?L',       message: 'L no puede aparecer más de una vez.'});
        this.rules.push({rule: 'D.*?D',       message: 'D no puede aparecer más de una vez.'});
        // Los símbolos I, X y C sólamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
        this.rules.push({rule: 'I[^IVX]',     message: 'I sólo puede restar a V y X. O estar sucedido por un símbolo de menor valor. '});
        this.rules.push({rule: 'X[^IVXLC]',   message: 'X sólo puede restar a L y C. O estar sucedido por un símbolo de menor valor. '});
        this.rules.push({rule: 'C[^IVXLCDM]', message: 'C sólo puede restar a D y M. O estar sucedido por un símbolo de menor valor. '});
        // Estas reglas sirven para controlar las normas en modo resta. Por ejemplo IIX, XXL, CCD son numeros incorrectos en romano
        this.rules.push({rule: 'II[^I]',      message: 'II no es válido en notación resta.'});
        this.rules.push({rule: 'XX[^IVX]',    message: 'XX no es válido en notación resta.'});
        this.rules.push({rule: 'CC[^IVXLC]',  message: 'CC no es válido en notación resta.'});
        // Símbolos V, L y D no pueden colocarse a la izquierda de otro mayor
        this.rules.push({rule: 'V[XLCDM]',    message: 'V no puede preceder a un número de mayor valor.'}); 
        this.rules.push({rule: 'L[CDM]',      message: 'L no puede preceder a un número de mayor valor.'});
        this.rules.push({rule: 'D[M]',        message: 'D no puede preceder a un número de mayor valor.'});
        /* Valores mínimo y máximo que es capaz de gestionar esta clase */
        this.min = min;
        this.max = max;
    }

    /** 
     *  Método que valida el número romano pasado como parametro
     *  @params number: número romano a validar
     *  @params errors: array de errores detectados en el número validado. Si el número es válido el array se devolverá en blanco
     *  @returns: true = correcto - false = incorrecto
     */
    isValidNumber(number, errors) {
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
        this.rules.forEach(r => {
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
    romanToDec (number) {
        // Primero se valida el string recibido
        if (!this.isValidNumber(number)) return -1;
        // Si el string es válido se continua
        let currentValue, nextValue, result = 0;
        for (let i = 0; i < number.length; i++) {        
            // Value of current roman digit
            currentValue = this.values.get(number[i]);
            // Value of next roman digit (in case it exists)
            if (i+1 < number.length) {
                nextValue = this.values.get(number[i+1]);
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
     *  Función para convertir a romano el número decimal recibido por parámetro
     *  @params number: número decimal a convertir
     *  @returns: String con el número en romano. O la cadena vacia en caso de error
     */
    decToRoman (number) {
        // Primero se valida el número recibido, y si está dentro del rango admitido
        if (isNaN(number) || number < this.min || number > this.max) {
            return '';
        }
        // Declaracion de variables locales a la función
        let value, auxValues, result = '';
        // Auxvalues me sirve para iterar sobre el dictionario de valores básicos, en orden inverso (mayor a menor valor)
        auxValues = Array.from(this.values).reverse();
        // Utilizo una variable auxiliar para no persistir las modificaciones que voy a hacer en el parámetro number recibido
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
}