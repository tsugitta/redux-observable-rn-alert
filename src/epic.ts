import { Alert, AlertButton, AlertOptions } from 'react-native'
import { Action } from 'redux'
import { ActionsObservable, Epic } from 'redux-observable'
import { Observable, Observer } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import { AlertActions } from './actions'
import { AlertButtonWithAction, AlertOptionsWithAction } from './interfaces'

const buttonWithActionToButton = (
  observer: Observer<Action>,
  buttonWithAction: AlertButtonWithAction,
): AlertButton => {
  const { text, onPressAction, style } = buttonWithAction

  const onPress =
    onPressAction &&
    (() => {
      observer.next(onPressAction)
      observer.complete()
    })

  return {
    text,
    style,
    onPress,
  }
}

const optionsWithActionToOptions = (
  observer: Observer<Action>,
  optionsWithAction: AlertOptionsWithAction,
): AlertOptions => {
  const { cancelable, onDismissAction } = optionsWithAction

  const onDismiss =
    onDismissAction &&
    (() => {
      observer.next(onDismissAction)
      observer.complete()
    })

  return {
    cancelable,
    onDismiss,
  }
}

export const alertEpic: Epic<Action, any> = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    filter(
      (action: Action): action is ReturnType<typeof AlertActions.alert> =>
        action.type === AlertActions.ALERT,
    ),
    mergeMap(action => {
      const {
        title,
        message,
        buttons: buttonsWithAction,
        options: optionsWithAction,
        type,
      } = action.payload

      return Observable.create((observer: Observer<Action>) => {
        const buttons =
          buttonsWithAction &&
          buttonsWithAction.map(buttonWithAction =>
            buttonWithActionToButton(observer, buttonWithAction),
          )
        const options = optionsWithAction && optionsWithActionToOptions(observer, optionsWithAction)

        Alert.alert(title, message, buttons, options, type)
      })
    }),
  )
