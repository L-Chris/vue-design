import fs from 'fs'
import {recursiveMap, guid} from '@/utils'
import {widgetList} from '@/widgets'
const compiler = require('vue-template-compiler')

export default path => {
  let label = path.replace(/.+\/|\.vue/g, '')
  let data = fs.readFileSync(path, 'utf-8')
  let {template: content} = compiler.parseComponent(data)
  let {ast} = compiler.compile(content)
  console.log(ast)
}
