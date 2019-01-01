import { expect } from 'chai'

import { ActionStandard, prefix } from './index'

// tslint:disable max-classes-per-file
describe(`${ActionStandard.name}:`, () => {
  describe('prefix:', () => {
    it('exists', () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.type.startsWith(prefix)).to.be.equal(true)
    })
    it('can be changed', () => {
      const prefixNew = 'test'
      class Test extends ActionStandard {
        protected readonly _prefix = prefixNew
      }
      const test = new Test()
      expect(test.type.startsWith(prefixNew)).to.be.equal(true)
    })
  })
})
