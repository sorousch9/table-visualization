import { VictoryChart, VictoryHistogram } from "victory";

const Histogram = () => {
  return (
    <div className="charts">
      <VictoryChart >
        <VictoryHistogram
          style={{
            data: { fill: "#c43a31" },
          }}
          data={[
            { x: Math.random() },
            { x: Math.random() },
            { x: Math.random()},
            { x: Math.random() },
            { x: Math.random()},
            { x: Math.random() },
            { x: Math.random() },
            { x: Math.random() },
            { x: Math.random() },
          ]}
        />
      </VictoryChart>
    </div>
  );
};
export default Histogram;
