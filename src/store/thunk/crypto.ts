import {
  createAsyncThunk,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { setData, setLoading, setError } from "../slice/crypto";
import { RootState } from "..";
import { cryptoData } from "../../lib/types";
import { formatNumber } from "../../lib/formatNumber";
// import data from "../../../sample.json";

async function fetchData(
  url: string,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>
) {
  try {
    dispatch(setLoading(true));
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    const data = (await res.json()) as any[];
    const processedData = data.map<cryptoData>((item: any) => ({
      name: item.name as string,
      logo: item.image as string,
      _1h_percentage: item.price_change_percentage_1h_in_currency as number,
      _24h_percentage: item.price_change_percentage_24h as number,
      _7d_percentage: item.price_change_percentage_7d_in_currency as number,
      market_cap: item.market_cap as number,
      rank: item.market_cap_rank as number,
      price: item.current_price as number,
      symbol: item.symbol as string,
      volume_24h: item.total_volume as number,
      circulating_supply: item.circulating_supply as number,
      sparklineData: item.sparkline_in_7d.price as number[],
      max_supply: item.max_supply as number | null,
      coinVolume: formatNumber((item.total_volume / item.current_price), "en-US"),
    }));
    processedData.sort((a, b) => a.rank - b.rank);
    // console.log("processedData", JSON.stringify(processedData));
    dispatch(setData(processedData));
  } catch (error) {
    dispatch(setError(true));
    throw new Error("Failed to fetch data from API");
  }
  dispatch(setLoading(false));
}
const initiateWebSocket = createAsyncThunk(
  "crypto/initiateWebSocket",
  async (url: string, { dispatch, getState }) => {
    await fetchData(url, dispatch);
    console.log("WebSocket connected to", url);

    // Function to perform a single fetch cycle
    const performFetch = async () => {
      const { isLoading } = (getState() as RootState).crypto;
      if (isLoading) {
        return;
      }

      try {
        dispatch(setLoading(true));
        await fetchData(url, dispatch);
        dispatch(setLoading(false));
      } catch (error) {
        console.log("error", error);
        dispatch(setLoading(false));

        setTimeout(() => {
          performFetch();
        }, 20 * 1000);
        return;
      }

      scheduleFetch();
    };

    const scheduleFetch = () => {
      setTimeout(performFetch, 5000);
    };
    scheduleFetch();
    return true;
  }
);

export default initiateWebSocket;
