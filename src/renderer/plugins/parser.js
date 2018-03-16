import fs from 'fs'
import htmlParser from 'htmlparser2'

let rootNode = null
let node = null
let stack = []

const parser = new htmlParser.Parser({
  onopentag (name, attributes) {
    node = {name, attributes}
    stack.push(node)
  },
  ontext (text) {
    if (text !== null && text.trim() !== '') {
      node.value = text
    }
  },
  onclosetag (tagname) {
    let pNode = stack.pop()
    if (!stack.length) {
      rootNode = pNode
    } else {
      let parentNode = stack[stack.length - 1]
      if (!parentNode.slots) parentNode.slots = []
      parentNode.slots.push(pNode)
    }
  },
  onerror (error) {
    console.log('error' + error)
  }
}, {
  lowerCaseTags: false,
  lowerCaseAttributeNames: false
})

export default (path) => {
  rootNode = null
  node = null
  stack = []

  let data = fs.readFileSync(path)
  parser.write(data)
  parser.end()
  return rootNode.slots[0]
}
