import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Error from "./Error";
import Loading from "./Loading";

import { Skeleton } from "@mui/material";

const Landing = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap",
    direction: "desc",
  });

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        preLoadImages(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  const preLoadImages = (cryptoData) => {
    cryptoData.forEach((crypto) => {
      loadImages(crypto.image)
        .then(() => {
          setLoadedImages((prev) => ({ ...prev, [crypto.id]: true }));
        })
        .catch((err) => {
          console.log("failed to load image: ", err);
          setLoadedImages((prev) => ({ ...prev, [crypto.id]: false }));
        });
    });
  };

  const loadImages = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => reject;
    });
  };

  useEffect(() => {
    let result = data;

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    if (searchTerm) {
      result = result.filter((crypto) => {
        return (
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    setFilteredData(result);
  }, [data, sortConfig, searchTerm]);

  const handleSort = (e) => {
    const [key, direction] = e.target.value.split(":");
    setSortConfig({ key, direction });
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  let shimmerRows = new Array(7).fill(0);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (isError) return <Error />;

  return (
    <div className="main">
      <div className="inputs">
        <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="sorts">
          <label htmlFor="sort-by">Sort by</label>
          <select
            onChange={handleSort}
            defaultValue="market_cap:desc"
            id="sort-by"
          >
            <option value="market_cap:desc">Market Cap: High to Low</option>
            <option value="market_cap:asc">Market Cap: Low to High</option>
            <option value="price_change_percentage_24h:desc">
              % Change: High to Low
            </option>
            <option value="price_change_percentage_24h:asc">
              % Change: Low to High
            </option>
          </select>
        </div>
      </div>

      <div className="lists">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Total Volume</th>
              <th>Market Cap</th>
              <th>% Change (24h)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              shimmerRows.map((_, i) => {
                return <Loading key={i} />;
              })
            ) : filteredData.length > 0 ? (
              <AnimatePresence>
                {filteredData.map((crypto, index) => (
                  <motion.tr
                    key={crypto.id}
                    className="data-rows"
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.1, delay: index * 0.05 }}
                  >
                    <td className="logo">
                      {loadedImages[crypto.id] === undefined ? (
                        <Skeleton variant="circular" width={40} height={40} />
                      ) : loadedImages[crypto.id] ? (
                        <img
                          src={crypto.image}
                          className="crypto-logo"
                          alt={crypto.name}
                        />
                      ) : (
                        <div className="image-error">Failed to load</div>
                      )}
                      {crypto.name}
                    </td>

                    <td>{crypto.symbol}</td>
                    <td className="price-wrapper">
                      <span className="currency">$</span>
                      <span className="amount">
                        {crypto.current_price.toLocaleString()}
                      </span>
                    </td>
                    <td>$ {crypto.total_volume.toLocaleString()}</td>
                    <td>$ {crypto.market_cap.toLocaleString()}</td>

                    <td>{crypto.price_change_percentage_24h.toFixed(2)}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  no data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Landing;
