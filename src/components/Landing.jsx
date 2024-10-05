import React, { useEffect, useState } from "react";
import Error from "./Error";
import SearchAndSort from "./SearchAndSort";
import Table from "./Table";

const Landing = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setError] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "market_cap",
    direction: "desc",
  });

  //fetch data from api

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

  //preload images

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

  //function to load images and resolve

  const loadImages = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject;
      img.src = src;
    });
  };

  // search and sort data

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

  if (isError) return <Error />;

  return (
    <div className="main">
      <SearchAndSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSortConfig={setSortConfig}
      />
      <Table
        filteredData={filteredData}
        loading={loading}
        loadedImages={loadedImages}
      />
      ;
    </div>
  );
};

export default Landing;
