const resolveOnAll = []

export const getGlobalResolves = () => ([...resolveOnAll])

export default resolveFunc => resolveOnAll.push(resolveFunc)
