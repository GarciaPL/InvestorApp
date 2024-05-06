import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AppContext from '../context/AppContext'

import InvestorDetails from './InvestorDetails'
import Loading from '../common/Loading'
import Error from '../common/Error'

function Investors() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [investors, setInvestors] = useState([])

  const { baseUrl, investorsEndpoint } = useContext(AppContext)
  const investorsApi = `${baseUrl}${investorsEndpoint}`

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
