# redux-observable-rn-alert

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/tsugitta/redux-observable-rn-alert.svg?branch=master)](https://travis-ci.org/tsugitta/redux-observable-rn-alert)
[![Coverage Status](https://coveralls.io/repos/github/tsugitta/redux-observable-rn-alert/badge.svg?branch=master)](https://coveralls.io/github/tsugitta/redux-observable-rn-alert?branch=master)

This library offers a way to use `Alert.alert()` with a side-effect in a react-native app using redux & redux-observable.

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
import { combineEpics } from 'redux-observable';
import { alertEpic } from 'redux-observable-rn-alert';

export const rootEpic = combineEpics(
  // ..
  alertEpic 
);
```

## Usage

You can show an alert by calling the action. Also, you can pass actions that are called when buttons are pressed.

```js
import { AlertActions } from 'redux-observable-rn-alert';

dispatch(AlertActions.alert({
  title: 'foo',
  message: 'bar',
  buttons: [
    {
      text: 'baz',
      onPressAction: { type: 'BAZ', payload: { qux: 'qux' } }
    }
  ]
}));
```
