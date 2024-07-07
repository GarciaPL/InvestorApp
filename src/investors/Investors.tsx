import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import AppContext from '../context/AppContext'

import InvestorDetails from './InvestorDetails'
import Loading from '../common/Loading'
import Error from '../common/Error'

import { InvestorsList } from './types/Types'

function Investors() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [investors, setInvestors] = useState<InvestorsList>([])

  const { baseUrl, investorsEndpoint } = useContext(AppContext)
  const investorsApi = `${baseUrl}${investorsEndpoint}`

  useEffect(() => {
    setLoading(true)
    axios
      .get<InvestorsList>(investorsApi)
      .then((response) => {
        setInvestors(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        setInvestors([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (error) {
    return <Error errorMessage={error} />
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : investors ? (
        Object.keys(investors).length > 0 ? (
          <InvestorDetails investors={investors} />
        ) : (
          <div>No investors found!</div>
        )
      ) : (
        <div>No investors found!</div>
      )}
    </div>
  )
}

export default Investors
