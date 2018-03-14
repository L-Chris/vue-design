import fs from 'fs'

class Project {
  // constructor () {}

  load (path, {encoding = 'utf8', flag} = {}) {
    let project = JSON.parse(fs.readFileSync(path, {encoding, flag}))
    return {
      pages: project.map(_ => ({
        id: _.id,
        label: _.label,
        children: _.children
      })),
      modules: project.reduce((pre, {id, components}) => {
        pre[id] = {
          namespaced: true,
          state () {
            return {
              components,
              selectedComponent: null,
              selectedBlock: null
            }
          }
        }
        return pre
      }, {})
    }
  }

  save (path, data, cb) {
    fs.writeFile(path, JSON.stringify(data), cb)
  }
}

export default new Project()
