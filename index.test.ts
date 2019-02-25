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
    test('exists', () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.type.startsWith(prefixDefault)).toBe(true)
      expect(isPlainObject(test)).toBe(true)
    })
    test('can be changed via subsclassing', () => {
      const prefixNew = 'test'
      class Test extends ActionStandard {
        protected static readonly prefix = prefixNew
      }
      const test = new Test()
      expect(test.type.startsWith(prefixNew)).toBe(true)
      expect(isPlainObject(test)).toBe(true)
    })
    test('can be changed via setPrefix', () => {
      const prefixNew = 'test'
      setPrefix(prefixNew)
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.type.startsWith(prefixNew)).toBe(true)
      expect(isPlainObject(test)).toBe(true)
    })
    test('can be inherited', () => {
      const prefixNew = 'test'
      class TestParent extends ActionStandard {
        protected static readonly prefix = prefixNew
      }
      class TestChild extends TestParent {}
      const test = new TestChild()
      expect(test.type.startsWith(prefixNew)).toBe(true)
      expect(isPlainObject(test)).toBe(true)
    })
  })

  describe('type', () => {
    test("ends with class' name", () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(Test.type.endsWith('Test')).toBe(true)
      expect(test.type.endsWith('Test')).toBe(true)
      expect(isPlainObject(test)).toBe(true)
    })
    test("is prefix with class' name", () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(Test.type).toBe(`${prefixDefault}Test`)
      expect(test.type).toBe(`${prefixDefault}Test`)
      expect(isPlainObject(test)).toBe(true)
    })
  })

  describe('params', () => {
    test('no payload and no meta', () => {
      class Test extends ActionStandard {}
      const test = new Test()
      expect(test.payload).toBe(undefined)
      expect(test.meta).toBe(undefined)
      expect(test.error).toBe(false)
    })
    test('payload and no meta', () => {
      const payload = 42
      class Test extends ActionStandard<number> {}
      const test = new Test(payload)
      expect(test.payload).toBe(payload)
      expect(test.meta).toBe(undefined)
      expect(test.error).toBe(false)
    })
    test('payload and meta', () => {
      const payload = 42
      const meta = 'test'
      class Test extends ActionStandard<number, string> {}
      const test = new Test(payload, meta)
      expect(test.payload).toBe(payload)
      expect(test.meta).toBe(meta)
      expect(test.error).toBe(false)
    })
    test('no payload and meta', () => {
      const meta = 'test'
      class Test extends ActionStandard<undefined, string> {}
      const test = new Test(undefined, meta)
      expect(test.payload).toBe(undefined)
      expect(test.meta).toBe(meta)
      expect(test.error).toBe(false)
    })
    test('error payload', () => {
      const payload = new Error()
      class Test extends ActionStandard<Error> {}
      const test = new Test(payload)
      expect(test.payload).toBe(payload)
      expect(test.meta).toBe(undefined)
      expect(test.error).toBe(true)
    })
  })
})
