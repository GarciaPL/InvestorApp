import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import AppContext from '../../context/AppContext'

import CommitmentDetails from './CommitmentDetails'
import Error from '../../common/Error'
import Loading from '../../common/Loading'

function Commitments() {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [commitments, setCommitments] = useState([])

    const { baseUrl, commitmentsEndpoint } = useContext(AppContext)
    const commitmentApi = `${baseUrl}${commitmentsEndpoint}`

    useEffect(() => {
        setLoading(true)
        axios.get(commitmentApi + "/pe" + "/" + "2670")
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
    }, []);

    if (error) {
        return <Error error={error} />
    }

    return (
        <div>
            {loading ? <Loading /> : <CommitmentDetails commitments={commitments} />}
        </div>
    );
}

export default Commitments;