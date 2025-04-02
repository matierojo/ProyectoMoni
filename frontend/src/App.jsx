import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import LoanList from './pages/LoanList'
import MainScreen from './pages/MainScreen'
import RequestLoan from './pages/RequestLoan'
import SimulateLoan from './pages/SimulateLoan'
// import SimulateLoan from './pages/SimulateLoan'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loans" element={<LoanList />} />
        <Route path="/simulate" element={<SimulateLoan />} />
        <Route path="/loan" element={<RequestLoan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
