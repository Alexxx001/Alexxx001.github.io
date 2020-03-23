const ITMO_BORN_YEAR = 1990;
const ITMO_BORN_MONTH = 3;
const ITMO_BORN_DAY = 26;

var str = ITMO_BORN_YEAR + "-" + ITMO_BORN_MONTH + "-" + ITMO_BORN_DAY;
var itmoBornDate = new Date(str);
console.log(itmoBornDate.toDateString()); // Mon Mar 26 1990