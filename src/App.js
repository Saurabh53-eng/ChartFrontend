import React  from 'react';
import BarChart from './components/BarChart'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  /* eslint-disable */

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<BarChart />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
