import parser from '@/plugins/parser'
const files = require.context('.', true, /\.(\/[^/]+){2}\.vue$/)
const layouts = []

files.keys().forEach(key => {
  layouts.push(parser(`${__dirname}/${key.replace('./', '')}`))
})

export default layouts
