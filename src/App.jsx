import { useEffect, useState } from "react";
import Coin from "./components/coin";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";
import SortSelector from "./components/SortSelector";
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

  const filteredCoins = coins
    .filter(coin => coin.name.toLowerCase().includes(filter) || coin.symbol.toLowerCase().includes(filter))
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap
        case 'market_cap_asc':
          return a.market_cap - b.market_cap
        case 'price_desc':
          return b.current_price - a.current_price
        case 'price_asc':
          return a.current_price - b.current_price
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h
      }
    })

  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {!loading && !error &&
        <>
          <div className="top-controls">
            <FilterInput filter={filter} changeFilter={setFilter} />
            <LimitSelector limit={limit} changeLimit={setLimit} />
            <SortSelector sortBy={sortBy} changeSort={setSortBy} />
          </div>
          <main className="grid">
            {
              filteredCoins.length > 0 ?
                filteredCoins.map(coin => (
                  <Coin coin={coin} key={coin.id} />
                )) :
                <p>No Matching Coins Found</p>
            }
          </main>
        </>
      }
    </div>
  );
}

export default App;