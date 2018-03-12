import fs from 'fs'

class Project {
  // constructor () {}

  load (path, {encoding = 'utf8', flag} = {}) {
    return fs.readFileSync(path, {encoding, flag})
  }

  save (path, data, cb) {
    fs.writeFile(path, JSON.stringify(data), cb)
  }
}

export default new Project()
