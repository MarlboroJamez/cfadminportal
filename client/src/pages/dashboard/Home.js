import React, { useEffect, useState } from 'react'
import axios from 'axios';

//COMPONENTS
import Header from '../../components/header/header';
import ActionBar from '../../components/dashboard/cards/actionBar';
import VerificationsTable from '../../components/dashboard/tables/verifications';

function Home() {
    const [view, setView] = useState("verifications");
    const [cipcs, setCipcs] = useState([]);
    const [verifications, setVerifications] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const fetchCipc = async () => {
        setLoading(true)
        await axios.get('/cipcs')
        .then(response => {
          setCipcs(response.data.result);
          setVerifications(response.data.verifications)
          console.log(response.data.verifications)
        })
        setLoading(false)
      }

      

      fetchCipc()
    },[])

    console.log('CIPCs',cipcs)
  return (
    <div>
        <Header/>

        <div className="p-6">
            <ActionBar
            view={view}
            setView={setView}/>

            {verifications?.verifications.length > 0 ? (
              <div className="transition duration-500 cursor-pointer mt-10 w-full rounded h-120 bg-white border hover:border-emerald-700 border-neutral-200 shadow-md hover:shadow-lg">
                {view === "verifications" && <VerificationsTable data={verifications} cipcs={cipcs}/> }
              </div>
            ):(
              <p className="mt-6 dont-bold">Just a minute, busy loading data...</p>
            )}
        </div>
    </div>
  )
}

export default Home