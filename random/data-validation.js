// // doesnt work, but fuck it
// function validateASCII(str){
//     return /^[\x20-\x7F]*$/.test(str);
// }

// const input = '|name|address|~n|Patrick|patrick@test.com|pat@test.com|~n|Annie||annie@test.com|~n';

// function processToTable(str){
//     const rowSeparator = '~n';
//     const escapeSymbol = '~';
//     const entitySeparatorSymbol = '|';
//     const rows = str.split('~n');

//     const [head, ...entities] = rows.map(row => splitWithEscape(row, entitySeparatorSymbol, escapeSymbol));
//     const maxLength = getMathLength(entities);
//     const table = new Table();
//     table.addHead(head, maxLength);
//     entities.filter(a => a.length).forEach(entity => table.addEntity(entity));
//     table.getShortInfo(); // ?
// }

// function getMathLength(arrs){
//     return Math.max(...arrs.map(a => a.length));
// }
// const last = arr => arr[arr.length - 1];
// class Table{
//     constructor(){
//         this.head = [];
//         this.entities = [];
//     }
//     addHead(fields, totalFields = fields.length){
//         for(let i = 0; i < totalFields; i++){
//             const key = fields[i] || `${last(fields)}_${i - fields.length + 1}`;
//             this.head.push(key);
//         }
//     }
//     addEntity(values){
//         this.entities.push(values);
//     }
//     getShortInfo(){
//         const numOfEntities = this.entities.length;
//         const numOfFieds = this.head.length;
//         const numOfEmptyFields = sum(this.entities.map(calcEmptyFieldsInArray));
//         const lastHeadField = last(this.head);
//         return [numOfEntities, numOfFieds, numOfEmptyFields, lastHeadField].join(':');
//     }
// }
// function sum(arr) {
//     return arr.reduce((acc, v) => acc + v, 0);
// }
// function calcEmptyFieldsInArray(arr){
//     return arr.reduce((acc, v) => v ? acc : acc + 1, 0);
// }
// function reduceByPair(arr, fn){
//     var result = [];
//     for(let i = 1; i < arr.length; i++){
//         result.push(fn(arr[i - 1], arr[i]));
//     }
//     return result;
// }

// function splitBy(str, symbol, escapeSymbol){
//     var result = [];
//     for(let i = 0; i < str.length; i++){
//         if(str.charAt(i) === symbol && str.charAt(i - 1) !== escapeSymbol){
//             result.push(i);
//         }
//     }
//     return result;
// }

// function splitWithEscape(str, separator, escapeSymbol){
//     return reduceByPair(splitBy(str, separator, escapeSymbol), (startIdx, endIdx) => {
//         return str.slice(startIdx + 1, endIdx);
//     });
// }

// processToTable(input);
