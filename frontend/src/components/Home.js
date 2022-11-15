import '../App.css';

import '../App.css';
import Place from './Place';
import LoadingPlace from './LoadingPlace';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function Home() {

  const [business, setBusiness] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchHome = useCallback(() => {
    setLoading(true)
    axios.get('/business/')
      .then(response => {
        setBusiness(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  })


  useEffect(() => {
    fetchHome()
  }, [])


  if (loading) {
    return <div className="feed"><LoadingPlace /><LoadingPlace /></div>
  } else if (business == null || business.length === 0) {
    return <div className="feed"><h1> Sorry! Looks like there are no results. </h1></div>
  }

  return (
    <div className="feed">
      <div style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
        {business.map(business => <Place business={business} />)}
      </div>
    </div>
  )

}
