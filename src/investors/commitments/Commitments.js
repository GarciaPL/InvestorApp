import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

import CommitmentDetails from './CommitmentDetails'

function Commitments() {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [commitments, setCommitments] = useState([])

    useEffect(() => {

    }, []);

    if (error) {
        return <Error error={error} />
    }

    return (
        <div>
            Commitments
        </div>
    );
}

export default Commitments;