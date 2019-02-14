# redux-observable-rn-alert

[![npm version](https://img.shields.io/npm/v/redux-observable-rn-alert.svg)](https://www.npmjs.com/package/redux-observable-rn-alert)
[![Build Status](https://travis-ci.org/tsugitta/redux-observable-rn-alert.svg?branch=master)](https://travis-ci.org/tsugitta/redux-observable-rn-alert)
[![Coverage Status](https://coveralls.io/repos/github/tsugitta/redux-observable-rn-alert/badge.svg?branch=master)](https://coveralls.io/github/tsugitta/redux-observable-rn-alert?branch=master)

This library offers a way to use `Alert.alert()` with a side-effect in a react-native app using redux & redux-observable.

## Supported redux-observable versions

| redux-observable version | Supporting redux-observable-rn-alert version |
| ------------------------ | -------------------------------------------- |
| < 1.0.0                  | 0.1.3                                        |
| >= 1.0.0                 | >= 0.1.4                                     |

## Installation

```bash
yarn add redux-observable-rn-alert
```

or

```bash
npm i redux-observable-rn-alert --save
```

## Setup

in the root epic, add `alertEpic`.

```js
import { combineEpics } from 'redux-observable'
import { alertEpic } from 'redux-observable-rn-alert'

export const rootEpic = combineEpics(
  // ..
  alertEpic,
)
```

## Usage

You can show an alert by calling the action. Also, you can pass actions that are called when buttons are pressed.

```js
import { AlertActions } from 'redux-observable-rn-alert'

dispatch(
  AlertActions.alert({
    title: 'foo',
    message: 'bar',
    buttons: [
      {
        text: 'baz',
        onPressAction: { type: 'BAZ', payload: { qux: 'qux' } },
      },
    ],
    options: {
      // below are only for Android
      cancelable: true,
      onDismissAction: { type: 'QUX', payload: { qux: 'qux' } },
    },
    type: '',
  }),
)
```

## Interface

Basically, the payload attributes of `AlertActions.alert` follow the attributes of `Alert.alert()`.
below are the interface and differences from the attributes of `Alert.alert()`.

| NAME    | TYPE                                                               | REQUIRED | DIFFERENCE                                                  |
| ------- | ------------------------------------------------------------------ | -------- | ----------------------------------------------------------- |
| title   | `string`                                                           | Yes      | Nothing                                                     |
| message | `string`                                                           | No       | Nothing                                                     |
| buttons | `Array<{ text?: string, onPressAction?: Action, style?: string }>` | No       | onPressAction corresponds to onPress of `Alert.alert()`     |
| options | `{ cancelable?: boolean, onDismissAction?: Action }`               | No       | onDismissAction corresponds to onDismiss of `Alert.alert()` |
| type    | `string`                                                           | No       | Nothing                                                     |
