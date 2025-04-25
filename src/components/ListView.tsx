import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Sparkline } from "./ui/sparkline";
import { Triangle } from "lucide-react";

export default function ListView() {
  const state = useSelector((state: RootState) => state.crypto);
  return (
    <>
      <div className="w-[98%] mx-auto mt-5 flex flex-col md:hidden gap-4 p-2">
        {state.cryptoList.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-4">
                <img src={item.logo} alt="" className="w-8" />
                <span className=" font-[500]">{item.name}</span>
                <span className=" text-gray-500 uppercase">{item.symbol}</span>
              </div>
              <div
                className={`font-semibold flex items-center gap-3 ${
                  item._24h_percentage < 0
                    ? "text-red-600"
                    : item._24h_percentage > 0
                    ? "text-green-600"
                    : "text-black"
                }`}
              >
                ${item.price.toLocaleString()}
                <div className="flex items-center gap-1 ml-2">
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
              </div>
            </div>
            <Sparkline data={item.sparklineData} className="w-[100px] h-12" />
          </div>
        ))}
      </div>
    </>
  );
}
