export const isFunc = val => (
  typeof val === 'function'
)

export const isPromise = val => (
  (val && isFunc(val.then)) || false
)

export const sanitize = obj => (
  Object.keys(obj).filter(key => (
    !isFunc(obj[key])
  )).reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {})
)
