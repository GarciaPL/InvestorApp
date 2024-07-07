import * as R from 'ramda'

export const parseMillions: (value: string) => number = R.pipe(
  R.replace('M', ''),
  R.trim,
  parseInt
) as (value: string) => number
