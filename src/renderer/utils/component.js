function getTypeConstructor (type) {
  switch (type) {
    case 'Number':
      return Number
    case 'Boolean':
      return Boolean
    case 'Array':
      return Array
    case 'Object':
      return Object
    default:
      return String
  }
}

export function createProps ($props) {
  if (!$props) return () => ({})
  return (props = {}) => $props.reduce((pre, {key, default: defaultValue}) => {
    pre[key] = Reflect.has(props, key) ? props[key] : defaultValue
    return pre
  }, {
    slots: props.slots || [],
    style: props.style || {}
  })
}

export const toProps = ($props) => {
  if (!$props) return () => ({})
  return function () {
    const that = this
    return $props.reduce((pre, {key}) => {
      pre[key] = that[key]
      return pre
    }, {
      slots: that.slots,
      style: that.style
    })
  }
}

export function toPropsModel ($props) {
  if (!$props) return {}
  return $props.reduce((pre, {key, type, default: defaultValue}) => {
    pre[key] = {
      type: getTypeConstructor(type),
      default: defaultValue
    }
    return pre
  },
  {
    slots: {
      type: Array,
      default: () => []
    }
  },
  {
    style: {
      type: Object,
      default: () => ({})
    }
  })
}

export function wrapComponent ({tag, originTag, config: {Props}}) {
  return {
    name: tag,
    props: toPropsModel(Props),
    render (h) {
      return h(
        originTag,
        {
          props: toProps(Props).call(this),
          style: this.style
        },
        this.slots.map(_ => h(_.setting.tag, {
          slot: _.slot,
          attrs: { id: _.id },
          props: _.props,
          style: _.props.style
        }))
      )
    }
  }
}

// 拼接组件属性
export function stringifyAttributes ({props, config}) {
  function stringifyAttribute (key, val, type) {
    return `${type !== 'String' ? ':' : ''}${key}="${val}"`
  }
  let propsModel = config.Props
  return propsModel.reduce((pre, {key, type, default: defaultValue}) =>
    defaultValue === props[key] ? pre : `${pre} ${stringifyAttribute(key, props[key], type)}`
    , '')
}

// 组件转换为模板字符串
export function stringifyTemplate (components) {
  return components.reduce((pre, {props: { slots, ...props }, setting: { label, config }}) => {
    return `${pre}<${label} ${stringifyAttributes({props, config})}>${slots.length ? stringifyTemplate(slots) : ''}</${label}>`
  }, '')
}
