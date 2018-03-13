function reRender (components = this.components) {
  components.forEach(({id, parent}) => {
    let target = document.getElementById(parent)
    createElement(target, id)
    this.createComponent({id})
  })
}