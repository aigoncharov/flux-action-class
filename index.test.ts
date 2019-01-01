import { expect } from 'chai'
import { isValid } from 'shortid'

import { ActionStandard } from './index'

describe(`${ActionStandard.name}:`, () => {
  describe('prefix:', () => {
    it('is shortid', () => {
      expect(isValid(ActionStandard.prefix)).to.be.equal(true)
    })
  })
})
