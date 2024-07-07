import { BarChart } from '@mui/x-charts/BarChart'
import * as R from 'ramda'
import { parseMillions } from './utils'

import { CommitmentDetailsProps } from '../../types/Types'

const CommitmentByCurrencyBarChart = ({
  commitments,
}: CommitmentDetailsProps) => {
  const sumAmountsByCurrency = R.pipe(
    // @ts-ignore
    R.groupBy(R.prop('currency')),
    R.map(
      R.pipe(
        // @ts-ignore
        R.map(R.evolve({ amount: parseMillions })),
        R.reduce(
          (acc: number, commitment: { amount: number }) =>
            acc + commitment.amount,
          0
        )
      )
    ),
    R.toPairs,
    R.map(([currency, sum]: [string, number]) => ({ currency, sum }))
  )

  // @ts-ignore
  const currencies = R.pipe(sumAmountsByCurrency, R.map(R.prop('currency')))

  // @ts-ignore
  const sums = R.pipe(sumAmountsByCurrency, R.map(R.prop('sum')))

  return (
    <div>
      <BarChart
        width={600}
        height={500}
        // @ts-ignore
        series={[{ data: [...sums(commitments)] }]}
        xAxis={[
          {
            // @ts-ignore
            data: [...currencies(commitments)],
            scaleType: 'band',
          },
        ]}
      />
    </div>
  )
}

export default CommitmentByCurrencyBarChart
