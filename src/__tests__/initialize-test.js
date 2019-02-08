import { expect } from 'chai'
import sinon from 'sinon'
import initialize from '../initialize'
import { push } from '../actions'

describe('initialize', () => {
  it('dispatches a push action', async () => {
    const location = '/foo'
    const store = {
      dispatch: sinon.spy(arg => arg),
    }

    await initialize({ location, store, routes: [] })
    expect(store.dispatch).to.have.been.calledWith(push(location))
  })

  it.only('throws when not given a store', async () => {
    expect(initialize).to.throw(Error)
  })
})
