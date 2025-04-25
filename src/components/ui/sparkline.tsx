import { Line, LineChart, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "./chart";
import { useMemo } from "react";

const chartConfig = {
  // desktop:{
  //   width: 200,
  //   height: 50,
  // }
} satisfies ChartConfig;

export function Sparkline({
  data,
  color = "oklch(72.3% 0.219 149.579)", // Default green color
  className = "w-full h-12 max-w-[180px]",
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const chartData = useMemo(() => {
    return data.map((item) => {
      return { value: item };
    });
  }, [data]);
  const minValue = useMemo(() => {
    const min = Math.min(...data);
    const buffer = (Math.max(...data) - min) * 0.05;
    return min - buffer;
  }, [data]);

  const maxValue = useMemo(() => {
    const max = Math.max(...data);
    const buffer = (max - Math.min(...data)) * 0.05;
    return max + buffer;
  }, [data]);

  return (
    <ChartContainer config={chartConfig} className={className}>
      <LineChart
        accessibilityLayer
        data={chartData}
        width={200}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <YAxis domain={[minValue, maxValue]} hide={true} />
        <Line
          dataKey="value"
          type="monotone"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
