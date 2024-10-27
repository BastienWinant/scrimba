import React from 'react'
import { useState } from 'react'

import tripsData from '../assets/data/trips.json'

const TripsContext = React.createContext();

const TripsProvider = ({children}) => {
  const [trips, setTripsList] = useState(tripsData)
  
  return (
    <TripsContext.Provider value={{trips}}>
      {children}
    </TripsContext.Provider>
  )
}

export const useTripsListContext = () => React.useContext(TripsContext)
export default TripsProvider