module.exports = {
  generateParams: (params = {}) => {
    let paramsString = "?"
    for (let key in params) {
      const value = params[key]
      paramsString += key
      switch (typeof value) {
        case "boolean":
          paramsString += `=${value ? 1 : 0}&`
          break;
        case "string":
          paramsString += `=${value}&`
          break;
        case "number":
          paramsString += `=${value}&`
          break;
      }
    }
    paramsString = paramsString.substr(0, paramsString.length - 1)
    return paramsString
  }
}