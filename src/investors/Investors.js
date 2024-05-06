import React, { useState, useEffect } from "react";
import axios from "axios";

import InvestorDetails from "./InvestorDetails";

function Investors() {
  const [investors, setInvestors] = useState([]);

  const investorsApi = "http://127.0.0.1:8000/api/investors";

  useEffect(() => {
    axios
      .get(investorsApi)
      .then((response) => {
        setInvestors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (<div>
    <InvestorDetails investors={investors} />
  </div>);
}

export default Investors;
