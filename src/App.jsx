import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let url = `${API_URL}&order='market_cap_desc'&per_page=${limit}&page=1&sparkline=false`
        const res = await fetch(url)
        if (!res.ok)
          throw new Error('fetch coins failed')
        const data = await res.json()
        setCoins(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCoins()
  }, [limit])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage coins={coins} filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy}
          limit={limit} setLimit={setLimit} loading={loading} error={error} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;