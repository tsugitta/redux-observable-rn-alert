import { AlertActionPayload } from './interfaces'

const ALERT = 'Alert/ALRET' as 'Alert/ALERT'

const alert = (payload: AlertActionPayload) => ({
  type: ALERT as typeof ALERT,
  payload,
})

export const AlertActions = {
  ALERT,
  alert,
}
