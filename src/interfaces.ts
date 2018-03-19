import { Alert } from 'react-native'
import { Action } from 'typescript-fsa'

export interface AlertButtonWithAction<ActionPayload> {
  text?: string
  onPressAction?: Action<ActionPayload>
  style?: 'default' | 'cancel' | 'destructive'
}

// For Android
export interface AlertOptionsWithAction<ActionPayload> {
  cancelable?: boolean
  onDismissAction?: Action<ActionPayload>
}

export interface AlertActionPayload {
  title: string
  message?: string
  buttons?: Array<AlertButtonWithAction<any>>
  options?: AlertOptionsWithAction<any>
  type?: string
}
