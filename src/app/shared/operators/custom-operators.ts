import { filter, Observable, OperatorFunction } from 'rxjs';

/** Operator que acerta tipo  */
export function filterNil() {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      filter(
        (value) => value !== undefined && value !== null
      ) as OperatorFunction<T, Exclude<T, undefined | null>>
    );
  };
}
