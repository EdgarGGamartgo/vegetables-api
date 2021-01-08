//import formatCurrency from 'format-currency'
const formatCurrency = require('format-currency')
let opts = { maxFraction: 2 }
console.log(formatCurrency(64564564561.123456789, opts)) 