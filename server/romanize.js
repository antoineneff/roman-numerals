const { ValidationError } = require('./errors')

// ONLY VALUES TO 100 SINCE WE'RE NOT ACCEPTING LARGER NUMBERS
const letters = ['C', 'IC', 'XC', 'L', 'IL', 'XL', 'X', 'IX', 'V', 'IV', 'I']
const values = [100, 99, 90, 50, 49, 40, 10, 9, 5, 4, 1]

/**
 * @description Convert a number to roman notation
 * @param {number} number
 * @return {string} Converted number
 */

function convert(number) {
  // PARAMETER SHOULD BE A NUMBER
  if (typeof number !== 'number') {
    throw new ValidationError('Merci de renseigner un nombre valide')
  }
  // PARAMETER SHOULD BE AN INTEGER (NO FLOAT)
  if (Number.isInteger(number) === false) {
    throw new ValidationError('Merci de renseigner un nombre entier')
  }
  // PARAMETER SHOULD BE BETWEEN ]0, 100]
  if (number <= 0 || number > 100) {
    throw new ValidationError('Merci de renseigner un nombre compris entre 0 et 100')
  }

  let converted = ''
  let numberToConvert = number
  for (let i = 0; i < values.length; i += 1) {
    while (values[i] <= numberToConvert && numberToConvert > 0) {
      converted += letters[i]
      numberToConvert -= values[i]
    }
  }
  return converted
}

module.exports = convert
