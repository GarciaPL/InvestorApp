import * as React from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import * as R from 'ramda'

function CommitmentByCurrencyBarChart({ commitments }) {
  const parseMillions = R.pipe(R.replace('M', ''), R.trim, parseInt)

  const sumAmountsByCurrency = R.pipe(
    R.groupBy(R.prop('currency')),
    R.map(
      R.pipe(
        R.map(R.evolve({ amount: parseMillions })),
        R.reduce((acc, commitment) => acc + commitment.amount, 0)
      )
    ),
    R.toPairs,
    R.map(([currency, sum]) => ({ currency, sum }))
  )

  const currencies = R.pipe(sumAmountsByCurrency, R.map(R.prop('currency')))

  const sums = R.pipe(sumAmountsByCurrency, R.map(R.prop('sum')))

  return (
    <div>
      <BarChart
        width={600}
        height={500}
        series={[{ data: [...sums(commitments)] }]}
        xAxis={[
          {
            data: [...currencies(commitments)],
            scaleType: 'band',
          },
        ]}
      />
    </div>
  )
}

export default CommitmentByCurrencyBarChart
