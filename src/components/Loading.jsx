import React from "react";
import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <tr className="shimmer-data-rows">
      <td className="logo">
        <Skeleton variant="circular" width={40} height={40} />
      </td>

      <td>
        <Skeleton variant="rectangular" width={60} height={10} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={60} height={10} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={60} height={10} />
      </td>
      <td>
        <Skeleton variant="rectangular" width={60} height={10} />
      </td>

      <td>
        <Skeleton variant="rectangular" width={60} height={10} />
      </td>
    </tr>
  );
};

export default Loading;
