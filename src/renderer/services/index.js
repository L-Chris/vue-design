const files = require.context('.', true, /models\/[^/]+\.js$/)

files.keys().forEach(key => {
  module.exports[key.replace(/\.\/models\/|\.js/g, '')] = files(key).default
})
