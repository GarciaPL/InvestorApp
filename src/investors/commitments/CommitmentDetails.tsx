import { CommitmentDetailsProps, Commitment } from '../types/Types'

const CommitmentDetails = ({ commitments }: CommitmentDetailsProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>FirmID</th>
          <th>AssetClass</th>
          <th>Amount</th>
          <th>Currency</th>
        </tr>
      </thead>
      <tbody>
        {commitments.map((commitment: Commitment) => (
          <tr key={commitment.id}>
            <td>{commitment.id}</td>
            <td>{commitment.firm_id}</td>
            <td>{commitment.asset_class}</td>
            <td>{commitment.amount}</td>
            <td>{commitment.currency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CommitmentDetails
