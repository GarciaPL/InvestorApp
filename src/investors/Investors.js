import React, { useState, useEffect } from 'react'
import axios from 'axios'

import InvestorDetails from './InvestorDetails'
import Loading from '../common/Loading'
import Error from '../common/Error'

function Investors() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [investors, setInvestors] = useState([])

  const investorsApi = 'http://127.0.0.1:8000/api/investors'

  useEffect(() => {
    setLoading(true)
    axios
      .get(investorsApi)
      .then((response) => {
        setInvestors(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (error) {
    return <Error error={error} />
  }

  return (
    <div>
      {loading ? <Loading /> : <InvestorDetails investors={investors} />}
    </div>
  )
}

export default Investors
