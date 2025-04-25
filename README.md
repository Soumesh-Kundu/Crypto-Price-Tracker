# Crypto Price Tracker

#### installing dependencies
```bash
npm install | pnpm install | yarn install
```

#### Running the app
```bash
npm run dev | pnpm dev | yarn dev
```
#### Building the app
```bash
npm run build | pnpm build | yarn build
```

## Tech Stack
- React
- Vite
- Tailwind CSS
- TypeScript
- Redux Toolkit
- Shadcn/ui

#### API url

```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,xrp,binancecoin,solana&sparkline=true&price_change_percentage=1h,24h,7d
```

This api is used for long polling to simulate the real-time data fetching. The data is fetched every 5 seconds. The data is stored in the redux store and used in the app. The data is also used to update the chart data. The chart data is updated every 5 seconds. The chart data is used to display the sparkline chart. The chart data is also used to display the price change percentage for 1h, 24h, and 7d.