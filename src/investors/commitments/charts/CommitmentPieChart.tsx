import { PieChart } from '@mui/x-charts/PieChart'
import * as R from 'ramda'
import { parseMillions } from './utils'

import { CommitmentDetailsProps, PieChartLabel } from '../../types/Types'

const CommitmentPieChart = ({ commitments }: CommitmentDetailsProps) => {
  const transformCommitments = R.map(
    R.applySpec({
      id: R.prop('id'),
      value: R.pipe(R.prop('amount'), parseMillions),
      label: ({ amount, currency }: PieChartLabel) => `${amount} (${currency})`,
    })
  )

  return (
    <div>
      <PieChart
        series={[
          {
            // @ts-ignore
            data: [...transformCommitments(commitments)],
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
