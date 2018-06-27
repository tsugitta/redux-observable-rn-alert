import { Alert, AlertButton, AlertOptions } from 'react-native'
import { ActionsObservable, Epic } from 'redux-observable'
import { Observable, Observer } from 'rxjs'
import { filter, mergeMap } from 'rxjs/operators'
import { Action } from 'typescript-fsa'
import { AlertActions } from './actions'
import { AlertButtonWithAction, AlertOptionsWithAction } from './interfaces'

const buttonWithActionToButton = <Payload>(
  observer: Observer<Action<Payload>>,
  buttonWithAction: AlertButtonWithAction<Payload>,
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

const optionsWithActionToOptions = <Payload>(
  observer: Observer<Action<Payload>>,
  optionsWithAction: AlertOptionsWithAction<Payload>,
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

export const alertEpic: Epic<Action<any>, any> = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    filter(AlertActions.alert.match),
    mergeMap(action => {
      const {
        title,
        message,
        buttons: buttonsWithAction,
        options: optionsWithAction,
        type,
      } = action.payload

      return Observable.create((observer: Observer<Action<any>>) => {
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
