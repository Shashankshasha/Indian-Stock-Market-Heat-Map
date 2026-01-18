// Indian Stock Market Data - Nifty 50 stocks
export const nifty50Stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', sector: 'Energy', price: 2450.50, change: 2.5, volume: 15000000, marketCap: 1650000 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', price: 3520.75, change: -1.2, volume: 8000000, marketCap: 1280000 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', sector: 'Banking', price: 1650.25, change: 0.8, volume: 12000000, marketCap: 920000 },
  { symbol: 'INFY', name: 'Infosys', sector: 'IT', price: 1480.00, change: -0.5, volume: 9500000, marketCap: 620000 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', sector: 'Banking', price: 980.50, change: 1.5, volume: 11000000, marketCap: 680000 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', sector: 'FMCG', price: 2580.00, change: -0.3, volume: 3500000, marketCap: 605000 },
  { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', price: 620.75, change: 2.1, volume: 25000000, marketCap: 554000 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', sector: 'Telecom', price: 890.25, change: 1.8, volume: 7500000, marketCap: 530000 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Banking', price: 1780.50, change: -0.7, volume: 4500000, marketCap: 354000 },
  { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG', price: 445.25, change: 0.4, volume: 18000000, marketCap: 555000 },
  { symbol: 'LT', name: 'Larsen & Toubro', sector: 'Infrastructure', price: 2850.00, change: 3.2, volume: 5500000, marketCap: 390000 },
  { symbol: 'AXISBANK', name: 'Axis Bank', sector: 'Banking', price: 1050.75, change: 1.1, volume: 13500000, marketCap: 323000 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', sector: 'Consumer Goods', price: 3150.50, change: -1.5, volume: 2800000, marketCap: 302000 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', sector: 'Automobile', price: 10250.00, change: 2.8, volume: 1200000, marketCap: 310000 },
  { symbol: 'TITAN', name: 'Titan Company', sector: 'Consumer Goods', price: 3280.25, change: 0.9, volume: 2100000, marketCap: 291000 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', sector: 'Financial Services', price: 6850.50, change: -2.1, volume: 3200000, marketCap: 424000 },
  { symbol: 'WIPRO', name: 'Wipro', sector: 'IT', price: 480.75, change: -0.8, volume: 6500000, marketCap: 264000 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', sector: 'IT', price: 1320.00, change: 0.2, volume: 4800000, marketCap: 358000 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical', sector: 'Pharma', price: 1150.25, change: 1.4, volume: 5200000, marketCap: 276000 },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', sector: 'Energy', price: 245.50, change: 0.6, volume: 9800000, marketCap: 171000 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', sector: 'Automobile', price: 780.25, change: 3.5, volume: 14000000, marketCap: 285000 },
  { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', sector: 'Energy', price: 195.75, change: 1.2, volume: 16000000, marketCap: 246000 },
  { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Energy', price: 285.50, change: 0.9, volume: 12500000, marketCap: 277000 },
  { symbol: 'COALINDIA', name: 'Coal India', sector: 'Energy', price: 385.00, change: -0.4, volume: 8500000, marketCap: 237000 },
];

// Get color based on percentage change
export function getStockColor(change) {
  if (change >= 3) return '#006400';
  if (change >= 2) return '#228B22';
  if (change >= 1) return '#32CD32';
  if (change >= 0.5) return '#7CFC00';
  if (change >= 0) return '#90EE90';
  if (change >= -0.5) return '#FFB6C1';
  if (change >= -1) return '#FF6B6B';
  if (change >= -2) return '#FF4500';
  if (change >= -3) return '#DC143C';
  return '#8B0000';
}

// Get text color based on background
export function getTextColor(change) {
  return Math.abs(change) >= 2 ? '#FFFFFF' : '#000000';
}

// Group stocks by sector
export function groupBySector(stocks) {
  return stocks.reduce((acc, stock) => {
    if (!acc[stock.sector]) acc[stock.sector] = [];
    acc[stock.sector].push(stock);
    return acc;
  }, {});
}

// Calculate sector performance
export function getSectorStats(stocks) {
  const sectors = groupBySector(stocks);
  return Object.entries(sectors).map(([name, sectorStocks]) => {
    const totalMarketCap = sectorStocks.reduce((sum, s) => sum + s.marketCap, 0);
    const avgChange = sectorStocks.reduce((sum, s) => sum + s.change, 0) / sectorStocks.length;
    return { name, stocks: sectorStocks, totalMarketCap, avgChange, stockCount: sectorStocks.length };
  }).sort((a, b) => b.totalMarketCap - a.totalMarketCap);
}
