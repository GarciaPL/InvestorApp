import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select'
import axios from 'axios'

import AppContext from '../../context/AppContext'

import CommitmentDetails from './CommitmentDetails'
import CommitmentPieChart from './charts/CommitmentPieChart'
import CommitmentByCurrencyBarChart from './charts/CommitmentByCurrencyBarChart'

import Error from '../../common/Error'
import Loading from '../../common/Loading'

import { CommitmentList } from '../types/Types'

function Commitments() {
  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [commitments, setCommitments] = useState<CommitmentList>([])
  const [selectedOption, setSelectedOption] = useState(null)

  const { baseUrl, commitmentsEndpoint, assetClasses } = useContext(AppContext)
  const commitmentApi = `${baseUrl}${commitmentsEndpoint}`

  useEffect(() => {
    if (selectedOption) {
      setLoading(true)
      // @ts-ignore
      const assetClass = selectedOption.value
      const investorId = id
      const COMMITMENTS_API = `${commitmentApi}/${assetClass}/${investorId}`

      axios
        .get(COMMITMENTS_API)
        .then((response) => {
          setCommitments(response.data)
        })
        .catch((error) => {
          console.error(error)
          setError(error)
          setCommitments([])
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [selectedOption])

  // @ts-ignore
  const handleSelectChange = (option) => {
    setSelectedOption(option)
  }

  if (error) {
    return <Error errorMessage={error} />
  }

  return (
    <div data-testid='asset-class-test-id'>
      <Select
        id='assetClassSelect'
        name='assetClassSelect'
        inputId='assetClassSelect'
        value={selectedOption}
        onChange={handleSelectChange}
        options={assetClasses}
        placeholder='Select asset class'
      />
      {loading ? (
        <Loading />
      ) : selectedOption ? (
        commitments ? (
          Object.keys(commitments).length > 0 ? (
            <div>
              <CommitmentDetails commitments={commitments} />
              <br />
              <CommitmentPieChart commitments={commitments} />
              <br />
              <CommitmentByCurrencyBarChart commitments={commitments} />
            </div>
          ) : (
            <div>No commitments found!</div>
          )
        ) : (
          <div>No commitments found for {selectedOption}!</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Commitments
