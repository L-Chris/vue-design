const files = require.context('.', false, /\.vue$/)
const modules = {}

files.keys().forEach(key => {
  if (key.includes('/index')) return
  modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default modules
