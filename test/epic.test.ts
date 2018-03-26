import { ActionsObservable } from 'redux-observable'
import { AlertActions } from '../src/actions'
import { alertEpic } from '../src/epic'

jest.mock('react-native', () => {
  return {
    Alert: {
      alert: jest.fn()
    }
  }
})

describe('alertEpic', () => {
  const { Alert } = require('react-native')

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows alert when alertAction passed', done => {
    const title = 'foo'
    const message = 'bar'
    const type = 'baz'

    const action = AlertActions.alert({ title, message, type })
    const action$ = ActionsObservable.of(action)

    alertEpic(action$, null, null).subscribe(() => {})

    expect(Alert.alert).toHaveBeenCalledWith(title, message, undefined, undefined, type)
    done()
  })

  it('does not show alert when non alertAction passed', done => {
    const action = { type: 'foo', payload: {} }
    const action$ = ActionsObservable.of(action)

    alertEpic(action$, null, null).subscribe(
      () => {},
      () => {},
      () => {
        expect(Alert.alert).not.toHaveBeenCalled()
        done()
      }
    )
  })

  it('emits button action when button was pressed', done => {
    const barAction = { type: 'bar', payload: {} }
    const bazAction = { type: 'baz', payload: {} }

    const buttonsWithAction = [
      {
        text: 'bar',
        onPressAction: barAction
      },
      {
        text: 'baz',
        onPressAction: bazAction
      }
    ]

    const action = AlertActions.alert({ title: 'foo', buttons: buttonsWithAction })
    const action$ = ActionsObservable.of(action)

    alertEpic(action$, null, null).subscribe(actions => {
      expect(actions).toEqual(barAction)
      done()
    })

    const buttons = Alert.alert.mock.calls[0][2]
    buttons[0].onPress()
  })

  it('emits dismiss action when dismissed (only Android)', done => {
    const barAction = { type: 'foo', payload: {} }

    const optionsWithAction = {
      cancelable: true,
      onDismissAction: barAction
    }

    const action = AlertActions.alert({ title: 'foo', options: optionsWithAction })
    const action$ = ActionsObservable.of(action)

    alertEpic(action$, null, null).subscribe(actions => {
      expect(actions).toEqual(barAction)
      done()
    })

    const options = Alert.alert.mock.calls[0][3]
    options.onDismiss()
  })
})
