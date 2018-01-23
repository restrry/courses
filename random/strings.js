const camelCase2SnakeCase = s => s.replace(/([A-Z])/g, '_$1').toLowerCase();
const snakeCase2CamelCase = s => s.replace(/\.?([A-Z])/g, i => `_${i.toLowerCase()}`)
