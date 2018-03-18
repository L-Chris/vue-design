import fs from 'fs'
import htmlParser from 'htmlparser2'
import {guid} from '@/utils'
import {widgetList} from '@/widgets'

let rootNode = null
let node = null
let stack = []

const parser = new htmlParser.Parser({
  onopentag (originTag, props = {}) {
    if (originTag === 'template') return
    let {createProps, setting} = widgetList.find(_ => _.setting.originTag === originTag)
    node = {id: guid(), props: Object.assign(createProps(), props), setting}
    stack.push(node)
  },
  ontext (text) {
    if (text !== null && text.trim() !== '') {
      node.innerText = text
    }
  },
  onclosetag (tagname) {
    if (tagname === 'template') return
    let pNode = stack.pop()
    if (!stack.length) {
      rootNode = pNode
    } else {
      let parentNode = stack[stack.length - 1]
      if (!parentNode.props.slots) parentNode.props.slots = []
      pNode.parent = parentNode.id
      parentNode.props.slots.push(pNode)
    }
  },
  onerror (error) {
    console.log('error' + error)
  }
}, {
  lowerCaseTags: false,
  lowerCaseAttributeNames: false
})

export default path => {
  rootNode = null
  node = null
  stack = []
  let label = path.replace(/.+\/|\.vue/g, '')

  let data = fs.readFileSync(path)
  parser.write(data)
  parser.end()

  rootNode.label = label
  return rootNode
}
