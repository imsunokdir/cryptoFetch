import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@mui/material";

const Lists = ({ filteredData, loadedImages }) => {
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  return filteredData.map((crypto, index) => (
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
          <img src={crypto.image} className="crypto-logo" alt={crypto.name} />
        ) : (
          <div className="image-error">Failed to load</div>
        )}
        {crypto.name}
      </td>

      <td>{crypto.symbol}</td>
      <td className="price-wrapper">
        <span className="currency">$</span>
        <span className="amount">{crypto.current_price.toLocaleString()}</span>
      </td>
      <td>$ {crypto.total_volume.toLocaleString()}</td>
      <td>$ {crypto.market_cap.toLocaleString()}</td>

      <td>{crypto.price_change_percentage_24h.toFixed(2)}</td>
    </motion.tr>
  ));
};

export default Lists;

// 1;
