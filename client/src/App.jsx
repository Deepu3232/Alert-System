import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Alerts } from './components/Alerts'
// import StrategyAlert from './components/StrategyAlert'
// import StrategyAlert1 from './components/StrategyAlert1'
// import BidStrategyAlert2 from './components/BidStrategyAlert2'
// import AskStrategyAlert2 from './components/AskStrategyAlert2'
// import LSClient from './components/LSClient'
// import LSClient1 from './components/LSClient1'
import StrategyAlertBidAndAsk from './components/StrategyAlertBidAndAsk'

export const App = ({username , accounts}) => {
    
    return (
        <Routes>
            <Route path="/" element={<Alerts username={username} accounts={accounts} />} />
            {/* <Route path="/strategy" element={<StrategyAlert />} /> */}
            <Route path="/strategy" element={<StrategyAlertBidAndAsk username={username} />} />
            {/* <Route path="/strategy1" element={<StrategyAlert1 />} />
            <Route path="/bidStrategy2" element={<BidStrategyAlert2 username={username} />} />
            <Route path="/askStrategy2" element={<AskStrategyAlert2 username={username}  />} />
            <Route path="/client" element={<LSClient username={username} />} />
            <Route path="/client1" element={<LSClient1 username={username} />} /> */}
            {/* <Route path="/st" element={<LSClient1 username={username} />} /> */}
        </Routes>
    )
}

