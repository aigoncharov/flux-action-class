# flux-action-class [![Build Status](https://travis-ci.org/keenondrums/flux-action-class.svg?branch=master)](https://travis-ci.org/keenondrums/flux-action-class)

Boilerplate free class-based action creator following [flux-standard-action](https://github.com/redux-utilities/flux-standard-action) spec built with TypeScript

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Quick start](#quick-start)
- [In depth](#in-depth)
- [Examples](#examples)
  - [Create an action with no payload and no meta](#create-an-action-with-no-payload-and-no-meta)
  - [Create an action with payload and no meta](#create-an-action-with-payload-and-no-meta)
  - [Create an action with payload and meta](#create-an-action-with-payload-and-meta)
  - [Create an action with no payload and meta](#create-an-action-with-no-payload-and-meta)
  - [Create an error action with no meta](#create-an-error-action-with-no-meta)
  - [Create an error action with meta](#create-an-error-action-with-meta)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm i flux-action-class
```

## Quick start

```ts
import { ActionStandard } from 'flux-action-class'

class ActionToDoIncrement extends ActionStandard {}
// Creates action with no payload, no meta and type 'flux-action-class:ActionToDoIncrement'

const reducer = (state, action) => {
  switch (action.type) {
    case ActionToDoIncrement.type:
    // Do stuff
  }
}
```

## In depth

`ActionStandard` is an abstract class with two generics, payload and meta, set to `undefined` by default. It has:

- Static `type` getter based on class' name to easily use it in your reducers
- Own (non-static) `type` getter which uses the static one to comply with [flux-standard-action](https://github.com/redux-utilities/flux-standard-action)
- Own (non-static) `payload` readonly field typed as the first generic (`undefined` by default)
- Own (non-static) `meta` readonly field typed as the second generic (`undefined` by default)
- Own (non-static) `error` readonly boolean field set to `true` if payload is an instance of `Error`
- Protected static `_prefix` field which is the the first part of `type` set to 'flux-action-class:' by default

## Examples

### Create an action with no payload and no meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest1 extends ActionStandard {}
// Creates action with no payload, no meta, type 'flux-action-class:ActionTest1' and error = false

// TS compiler expects no arguments provided to the constructor
new ActionTest1() // Correct
new ActionTest1('test') // Failure
```

### Create an action with payload and no meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest2 extends ActionStandard<number> {}
// Creates action with payload of type number, no meta, type 'flux-action-class:ActionTest2' and error = false

// TS compiler expects one argument provided to the constructor
new ActionTest2(5) // Correct
new ActionTest2() // Failure
new ActionTest2('test') // Failure
new ActionTest2(5, 'test') // Failure
```

### Create an action with payload and meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest3 extends ActionStandard<number, string> {}
// Creates action with payload of type number, meta of type string, type 'flux-action-class:ActionTest3' and error = false

// TS compiler expects two arguments provided to the constructor
new ActionTest3(5, 'test') // Correct
new ActionTest3() // Failure
new ActionTest3('test') // Failure
new ActionTest3(5, 45) // Failure
```

### Create an action with no payload and meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest4 extends ActionStandard<undefined, string> {}
// Creates action with no payload, meta of type string, type 'flux-action-class:ActionTest4' and error = false

// TS compiler expects two arguments provided to the constructor
new ActionTest4(undefined, 'test') // Correct
new ActionTest4() // Failure
new ActionTest4('test') // Failure
new ActionTest4(5, 45) // Failure
```

### Create an error action with no meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest5 extends ActionStandard<Error> {}
// Creates action with error payload, no meta, type 'flux-action-class:ActionTest5' and error = true

// TS compiler expects one argument provided to the constructor
new ActionTest5(new Error()) // Correct
new ActionTest3() // Failure
new ActionTest3('test') // Failure
new ActionTest3(5, 45) // Failure
```

### Create an error action with meta

```ts
import { ActionStandard } from 'flux-action-class'

class ActionTest6 extends ActionStandard<Error, string> {}
// Creates action with error payload, meta of type string, type 'flux-action-class:ActionTest6' and error = true

// TS compiler expects one argument provided to the constructor
new ActionTest6(new Error(), 'string') // Correct
new ActionTest6() // Failure
new ActionTest6('test') // Failure
new ActionTest6(5, 45) // Failure
```
