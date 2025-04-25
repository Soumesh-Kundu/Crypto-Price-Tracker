import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Table,
  } from "./ui/table";
  import { Triangle } from "lucide-react";
  import { formatNumber } from "./../lib/formatNumber";
  import { Sparkline } from "./ui/sparkline";

export default function TableView() {
  const state = useSelector((state: RootState) => state.crypto);
  return (
    <Table className="w-[98%] mx-auto mt-5 hidden md:table">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right hidden lg:table-cell">1h %</TableHead>
          <TableHead className="text-right">24h %</TableHead>
          <TableHead className="text-right hidden lg:table-cell">7d %</TableHead>
          <TableHead className="text-right">Market Cap</TableHead>
          <TableHead className="text-right hidden lg:table-cell">Volume (24h)</TableHead>
          <TableHead className="text-right">Circulating Supply</TableHead>
          <TableHead className="text-right">Last 7 Days</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {state.cryptoList.map((item, index) => (
          <TableRow className="h-[80px] " key={index+ " " + item.rank}>
            <TableCell key={item.rank}>{index + 1}</TableCell>
            <TableCell key={item.name} className=" w-[200px] !text-base">
              <div className=" flex items-center gap-4">
                <img src={item.logo} alt="" className="w-8" />
                <span className="text-sm font-[500]">{item.name}</span>
                <span className="text-sm text-gray-500 uppercase">
                  {item.symbol}
                </span>
              </div>
            </TableCell>
            <TableCell
              key={item.price}
              className={`text-right font-[500] ${
                item._24h_percentage < 0
                  ? "text-red-600"
                  : item._24h_percentage > 0
                  ? "text-green-600"
                  : "text-black"
              }`}
            >
              ${item.price.toLocaleString()}
            </TableCell>
            <TableCell
              key={item._1h_percentage}
              className={`text-right font-[500] hidden lg:table-cell ${
                item._1h_percentage < 0
                  ? "text-red-500"
                  : item._1h_percentage > 0
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center justify-end gap-2">
                <Triangle
                  stroke="currentColor"
                  fill="currentColor"
                  size={8}
                  className={`${
                    item._1h_percentage < 0
                      ? "rotate-180"
                      : item._1h_percentage > 0
                      ? "rotate-0"
                      : "hidden"
                  } `}
                />{" "}
                {Math.abs(item._1h_percentage).toFixed(2)}%
              </div>
            </TableCell>
            <TableCell
              key={item._24h_percentage}
              className={`text-right font-[500]  ${
                item._24h_percentage < 0
                  ? "text-red-500"
                  : item._24h_percentage > 0
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center  justify-end gap-2">
                <Triangle
                  stroke="currentColor"
                  fill="currentColor"
                  size={8}
                  className={`${
                    item._24h_percentage < 0
                      ? "rotate-180"
                      : item._24h_percentage > 0
                      ? "rotate-0"
                      : "hidden"
                  } `}
                />{" "}
                {Math.abs(item._24h_percentage).toFixed(2)}%
              </div>
            </TableCell>
            <TableCell
              key={item._7d_percentage}
              className={`text-right font-[500] hidden lg:table-cell ${
                item._7d_percentage < 0
                  ? "text-red-500"
                  : item._7d_percentage > 0
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center justify-end gap-2">
                <Triangle
                  stroke="currentColor"
                  fill="currentColor"
                  size={8}
                  className={`${
                    item._7d_percentage < 0
                      ? "rotate-180"
                      : item._7d_percentage > 0
                      ? "rotate-0"
                      : "hidden"
                  } `}
                />{" "}
                {Math.abs(item._7d_percentage).toFixed(2)}%
              </div>
            </TableCell>
            <TableCell key={item.market_cap} className="text-right font-[500]">
              ${item.market_cap.toLocaleString()}
            </TableCell>
            <TableCell key={item.volume_24h} className="text-right font-[500] hidden lg:table-cell">
              <div className="flex flex-col items-end">
                ${item.volume_24h.toLocaleString()}
                <span className="text-sm text-gray-500 uppercase">
                  {item.coinVolume} {item.symbol}
                </span>
              </div>
            </TableCell>
            <TableCell
              key={item.circulating_supply}
              className="text-right  font-[500] uppercase"
            >
              <div className="flex flex-col items-end gap-2">
                {formatNumber(item.circulating_supply)} {item.symbol}
                {item.max_supply && (
                  <div className="h-1 w-[90%] overflow-hidden rounded-full bg-gray-200 relative">
                    <div
                      className="absolute top-0  left-0 h-full bg-gray-400 rounded-l-full"
                      style={{
                        width: `${
                          (item.circulating_supply / item.max_supply) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell key={item.symbol} className="text-right font-[500]">
              <div className="flex items-center justify-end">
                <Sparkline data={item.sparklineData} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
