import { expect } from 'chai'
import sinon from 'sinon'
import initialize from '../initialize'
import { push } from '../actions'

describe('initialize', () => {
  it('dispatches a push action', () => {
    const location = '/foo'
    const store = {
      dispatch: sinon.spy(arg => arg),
    }

    initialize({ location, store, routes: [] })
    expect(store.dispatch).to.have.been.calledWith(push(location))
  })

  it('throws when not given a store', () => {
    expect(initialize).to.throw(Error)
  })
})
