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

let id = 1000
export const guid = () => (id++).toString()

export const getOwnProperty = obj => {
  return Object.keys(obj).reduce((pre, _) => {
    pre[_] = obj[_]
    return pre
  }, {})
}

export function recursiveSetId (collection, parent) {
  for (let _ of collection) {
    _.id = guid()
    _.parent = parent
    if (_.props.slots.length) {
      recursiveSetId(_.props.slots, _.id)
    }
  }
  return collection
}

// 递归map
export function recursiveMap (collection, childrenKey) {
  let children
  for (let _ of collection) {
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      _.children = recursiveMap(children, childrenKey)
    } else {
      _.children = []
    }
  }
  return collection
}

// 递归查询
export function recursiveFindBy (collection, condition, childrenKey = 'children') {
  let children, result
  for (let _ of collection) {
    if (condition(_)) return _
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      result = recursiveFindBy(children, condition, childrenKey)
      if (result) return result
    }
  }
}
// 递归删除
export function recursiveSpliceBy (collection, condition, childrenKey = 'children') {
  let children, result
  for (let i = 0, len = collection.length; i < len; i++) {
    let _ = collection[i]
    if (condition(_)) return collection.splice(i, 1)
    children = parsePath(childrenKey)(_)
    if (children && children.length) {
      result = recursiveSpliceBy(children, condition, childrenKey)
      if (result) return result
    }
  }
}

// 创建挂载点
export function createElement (target, id = guid()) {
  let element = document.createElement('div')
  element.id = id
  target.appendChild(element)
  return element
}
