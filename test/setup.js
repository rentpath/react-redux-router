import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsdom from 'jsdom-global'

chai.use(sinonChai)
const cleanup = jsdom()
