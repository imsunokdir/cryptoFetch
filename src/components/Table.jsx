import React from "react";
import Loading from "./Loading";
import Lists from "./Lists";
import { AnimatePresence } from "framer-motion";

const Table = ({ filteredData, loading, loadedImages }) => {
  let shimmerRows = new Array(7).fill(0);
  return (
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
              <Lists filteredData={filteredData} loadedImages={loadedImages} />
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
  );
};

export default Table;
