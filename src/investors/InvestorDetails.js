import React from 'react'
import { useNavigate } from 'react-router-dom'

function InvestorDetails({ investors }) {
  const navigate = useNavigate()

  const handleInvestorClick = (invertorId) => {
    navigate(`/investor/${invertorId}`)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>FirmId</th>
          <th>FirmName</th>
          <th>Type</th>
          <th>DateAdded</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {investors.map((investor) => (
          <tr key={investor.firm_id}
            onClick={() => handleInvestorClick(investor.firm_id)}
          >
            <td>{investor.firm_id}</td>
            <td>{investor.firm_name}</td>
            <td>{investor.firm_type}</td>
            <td>{investor.date_added}</td>
            <td>{investor.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InvestorDetails
