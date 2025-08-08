import { useEffect, useState } from "react";
import Coin from "./components/coin";
import LimitSelector from "./components/LimitSelector";
const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        let url = `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        const res = await fetch(url)
        if (!res.ok)
          throw new Error('fetch coins failed')
        const data = await res.json()
        console.table(data)
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
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {!loading && !error &&
        <>
          <LimitSelector limit={limit} changeLimit={setLimit} />
          <main className="grid">
            {coins.map(coin => (
              <Coin coin={coin} key={coin.id} />
            ))}
          </main>
        </>
      }
    </div>
  );
}

export default App;