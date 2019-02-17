import { expect } from 'chai'

import { ActionStandard, prefixDefault, setPrefix } from './index'

// From https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.js
const isPlainObject = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

// tslint:disable max-classes-per-file
describe(ActionStandard.name, () => {
  describe('prefix', () => {
    it('exists', () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.type.startsWith(prefixDefault)).to.be.equal(true)
      expect(isPlainObject(test)).to.be.equal(true)
    })
    it('can be changed via subsclassing', () => {
      const prefixNew = 'test'
      class Test extends ActionStandard {
        protected static readonly prefix = prefixNew
      }
      const test = new Test()
      expect(test.type.startsWith(prefixNew)).to.be.equal(true)
      expect(isPlainObject(test)).to.be.equal(true)
    })
    it('can be changed via setPrefix', () => {
      const prefixNew = 'test'
      setPrefix(prefixNew)
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.type.startsWith(prefixNew)).to.be.equal(true)
      expect(isPlainObject(test)).to.be.equal(true)
    })
    it('can be inherited', () => {
      const prefixNew = 'test'
      class TestParent extends ActionStandard {
        protected static readonly prefix = prefixNew
      }
      class TestChild extends TestParent {}
      const test = new TestChild()
      expect(test.type.startsWith(prefixNew)).to.be.equal(true)
      expect(isPlainObject(test)).to.be.equal(true)
    })
  })

  describe('type', () => {
    it("ends with class' name", () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(Test.type.endsWith('Test')).to.be.equal(true)
      expect(test.type.endsWith('Test')).to.be.equal(true)
      expect(isPlainObject(test)).to.be.equal(true)
    })
    it("is prefix with class' name", () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(Test.type).to.be.equal(`${prefixDefault}Test`)
      expect(test.type).to.be.equal(`${prefixDefault}Test`)
      expect(isPlainObject(test)).to.be.equal(true)
    })
  })

  describe('params', () => {
    it('no payload and no meta', () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.payload).to.be.equal(undefined)
      expect(test.meta).to.be.equal(undefined)
      expect(test.error).to.be.equal(false)
    })
    it('payload and no meta', () => {
      const payload = 42
      class Test extends ActionStandard<number> {}
      const test = new Test(payload)
      expect(test.payload).to.be.equal(payload)
      expect(test.meta).to.be.equal(undefined)
      expect(test.error).to.be.equal(false)
    })
    it('payload and meta', () => {
      const payload = 42
      const meta = 'test'
      class Test extends ActionStandard<number, string> {}
      const test = new Test(payload, meta)
      expect(test.payload).to.be.equal(payload)
      expect(test.meta).to.be.equal(meta)
      expect(test.error).to.be.equal(false)
    })
    it('no payload and meta', () => {
      const meta = 'test'
      class Test extends ActionStandard<undefined, string> {}
      const test = new Test(undefined, meta)
      expect(test.payload).to.be.equal(undefined)
      expect(test.meta).to.be.equal(meta)
      expect(test.error).to.be.equal(false)
    })
    it('error payload', () => {
      const payload = new Error()
      class Test extends ActionStandard<Error> {}
      const test = new Test(payload)
      expect(test.payload).to.be.equal(payload)
      expect(test.meta).to.be.equal(undefined)
      expect(test.error).to.be.equal(true)
    })
  })
})
