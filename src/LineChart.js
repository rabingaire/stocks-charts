import React from "react";
import { VictoryChart, VictoryLine } from "victory";

function LineChart({ data }) {
  return (
    <VictoryChart width={900}>
      <VictoryLine data={data} />
    </VictoryChart>
  );
}

export default LineChart;
