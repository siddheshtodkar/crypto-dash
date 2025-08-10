import Coin from "../components/coin";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import { Link } from "react-router";
import Spinner from "../components/Spinner";
const HomePage = ({ coins, filter, setFilter, limit, setLimit, sortBy, setSortBy, loading, error }) => {
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
      {loading && <Spinner color="#fff" />}
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
                  <Link to={`/coin/${coin.id}`} key={coin.id}>
                    <Coin coin={coin} />
                  </Link>
                )) :
                <p>No Matching Coins Found</p>
            }
          </main>
        </>
      }
    </div>
  );
}

export default HomePage;