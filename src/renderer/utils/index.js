export const noop = () => {}
export const identity = _ => _

export const spliceIf = (collection, fn) => {
  let index = collection.findIndex(_ => fn(_))
  if (index >= 0) collection.splice(index, 1)
  return collection
}

export function partition (collection, predicate) {
  let result = [[], []]
  collection.forEach(_ => {
    result[predicate(_) ? 0 : 1].push(_)
  })
  return result
}

// 对对象解析路径下的属性
const bailRE = /[^\w.$]/
export const parsePath = path => {
  if (bailRE.test(path)) return
  const segments = path.split('.')
  return obj => {
    for (let segment of segments) {
      if (!obj) return
      obj = obj[segment]
    }
    return obj
  }
}

export const guid = (id => () => (id++).toString())(1000)

// 递归
const recursive = (collection, predicate, iteratee, parseChildren) => {
  let children, result
  for (let i = 0, len = collection.length; i < len; i++) {
    let _ = collection[i]
    if (predicate(_)) return iteratee(_, i, collection)
    children = parseChildren(_)
    if (children && children.length) {
      result = recursive(children, predicate, iteratee, parseChildren)
      if (result) return result
    }
  }
}

const map = (collection, iteratee, parseChildren, output = [], stack = []) => {
  let children
  for (let i = 0, len = collection.length; i < len; i++) {
    let _ = collection[i]
    stack.push(iteratee(_))
    children = parseChildren(_)
    if (children && children.length) map(children, iteratee, parseChildren, output, stack)
    let pNode = stack.pop()
    if (stack.length) {
      let parentNode = stack[stack.length - 1]
      if (!parentNode.children) parentNode.children = []
      parentNode.children.push(pNode)
    } else {
      output.push(pNode)
    }
  }
  return output
}

// 递归map
export function recursiveMap (collection, iteratee, childrenKey) {
  const parseChildren = parsePath(childrenKey)
  return map(collection, iteratee, parseChildren)
}

// 递归查询
export function recursiveFind (collection, predicate, path) {
  const parseChildren = parsePath(path)
  return recursive(collection, predicate, identity, parseChildren)
}
// 递归删除
export function recursiveSpliceBy (collection, predicate, path) {
  const parseChildren = parsePath(path)
  return recursive(collection, predicate, (_, i, arr) => arr.splice(i, 1), parseChildren)
}

// 创建挂载点
export function createElement (target, id = guid()) {
  let element = document.createElement('div')
  element.id = id
  target.appendChild(element)
  return element
}
