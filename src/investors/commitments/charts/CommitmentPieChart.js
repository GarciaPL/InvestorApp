import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import * as R from 'ramda'

function CommitmentPieChart({ commitments }) {
  const parseMillions = R.pipe(R.replace('M', ''), R.trim, parseInt)

  const transformData = R.map(
    R.applySpec({
      id: R.prop('id'),
      value: R.pipe(R.prop('amount'), parseMillions),
      label: ({ amount, currency }) => `${amount} (${currency})`,
    })
  )

  return (
    <div>
      <PieChart
        series={[
          {
            data: [...transformData(commitments)],
            innerRadius: 0,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
        width={450}
        height={500}
      />
    </div>
  )
}

export default CommitmentPieChart
