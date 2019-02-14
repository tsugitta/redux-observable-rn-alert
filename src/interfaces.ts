import { Alert } from 'react-native'
import { Action } from 'redux'

export interface AlertButtonWithAction {
  text?: string
  onPressAction?: Action
  style?: 'default' | 'cancel' | 'destructive'
}

// For Android
export interface AlertOptionsWithAction {
  cancelable?: boolean
  onDismissAction?: Action
}

export interface AlertActionPayload {
  title: string
  message?: string
  buttons?: AlertButtonWithAction[]
  options?: AlertOptionsWithAction
  type?: string
}
