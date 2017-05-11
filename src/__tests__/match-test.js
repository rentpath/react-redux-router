import { expect } from 'chai'
import match from '../match'

describe('match', () => {
  it('returns a transition result', async () => {
    const result = await match({
      routes: [],
      location: '/foo',
    })
    expect(result).to.have.property('location')
    expect(result).to.have.property('route')
    expect(result).to.have.property('params')
    expect(result).to.have.property('routes')
    expect(result).to.have.property('strict')
  })
})
