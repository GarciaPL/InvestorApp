import React, { useState, useEffect } from "react";
import axios from "axios";

import InvestorDetails from "./InvestorDetails";

function Investors() {
  const [loading, setLoading] = useState(false)
  const [investors, setInvestors] = useState([]);

  const investorsApi = "http://127.0.0.1:8000/api/investors";

  useEffect(() => {
    setLoading(true)
    axios
      .get(investorsApi)
      .then((response) => {
        setInvestors(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return (
  <div>
    {
      loading ? <div>Loading</div> : <InvestorDetails investors={investors} />
    } 
  </div>
  );
}

export default Investors;
