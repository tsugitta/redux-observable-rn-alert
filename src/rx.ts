import { OperatorFunction } from 'rxjs/interfaces'
import { Observable } from 'rxjs/Observable'
import { filter } from 'rxjs/operators/filter'
import { Action, ActionCreator, isType } from 'typescript-fsa'

export { mergeMap } from 'rxjs/operators/mergeMap'

export { Observable } from 'rxjs/Observable'
export { Observer } from 'rxjs/Observer'

export const ofAction = <P>(
  actionCreator: ActionCreator<P>
): OperatorFunction<Action<any>, Action<P>> => filter(action => isType(action, actionCreator))
