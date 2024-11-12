import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Alerts } from './components/Alerts'
import StrategyAlert from './components/StrategyAlert'

export const App = ({username , accounts}) => {
    
    return (
        <Routes>
            <Route path="/" element={<Alerts username={username} accounts={accounts} />} />
            <Route path="/strategy" element={<StrategyAlert />} />
        </Routes>
    )
}

