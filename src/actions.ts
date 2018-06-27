import { ActionCreator, actionCreatorFactory } from 'typescript-fsa'
import { AlertActionPayload } from './interfaces'

const actionCreator = actionCreatorFactory()

const alert: ActionCreator<AlertActionPayload> = actionCreator<AlertActionPayload>('Alert/ALERT')

export const AlertActions = {
  alert,
}
