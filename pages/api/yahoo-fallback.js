// Yahoo Finance API Fallback - Free 15-min delayed data
// Used when NSE API is unavailable (outside trading hours, holidays, etc.)

const YAHOO_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Yahoo Finance symbols for Indian indices
const YAHOO_SYMBOLS = {
  broadMarket: [
    { yahoo: '^NSEI', name: 'NIFTY 50' },
    { yahoo: '^NSEBANK', name: 'NIFTY BANK' },
    { yahoo: 'NIFTY_NEXT50.NS', name: 'NIFTY NEXT 50' },
    { yahoo: '^CNX100', name: 'NIFTY 100' },
    { yahoo: '^CNX200', name: 'NIFTY 200' },
    { yahoo: '^CNX500', name: 'NIFTY 500' },
    { yahoo: '^CNXMDCP', name: 'NIFTY MIDCAP 50' },
    { yahoo: '^CNXSC', name: 'NIFTY SMLCAP 100' },
  ],
  sectoral: [
    { yahoo: '^CNXIT', name: 'NIFTY IT' },
    { yahoo: '^CNXPHARMA', name: 'NIFTY PHARMA' },
    { yahoo: '^CNXAUTO', name: 'NIFTY AUTO' },
    { yahoo: '^CNXMETAL', name: 'NIFTY METAL' },
    { yahoo: '^CNXREALTY', name: 'NIFTY REALTY' },
    { yahoo: '^CNXFMCG', name: 'NIFTY FMCG' },
    { yahoo: '^CNXENERGY', name: 'NIFTY ENERGY' },
    { yahoo: '^CNXINFRA', name: 'NIFTY INFRA' },
    { yahoo: '^CNXPSUBANK', name: 'NIFTY PSU BANK' },
    { yahoo: '^CNXMEDIA', name: 'NIFTY MEDIA' },
    { yahoo: '^CNXFIN', name: 'NIFTY FIN SERVICE' },
  ],
  commodities: [
    { yahoo: 'GC=F', name: 'Gold' },
    { yahoo: 'SI=F', name: 'Silver' },
    { yahoo: 'PL=F', name: 'Platinum' },
  ],
};

async function fetchYahooQuote(symbol) {
  try {
    const response = await fetch(`${YAHOO_BASE_URL}/${symbol}?interval=1d&range=1d`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const quote = data.chart?.result?.[0];

    if (!quote) return null;

    const meta = quote.meta;
    const price = meta.regularMarketPrice || 0;
    const prevClose = meta.previousClose || meta.chartPreviousClose || price;
    const change = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;

    return {
      price,
      previousClose: prevClose,
      change: parseFloat(change.toFixed(2)),
      open: quote.indicators?.quote?.[0]?.open?.[0] || price,
      high: quote.indicators?.quote?.[0]?.high?.[0] || price,
      low: quote.indicators?.quote?.[0]?.low?.[0] || price,
    };
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error.message);
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  const { type = 'all' } = req.query;

  try {
    const results = {
      success: true,
      source: 'yahoo',
      timestamp: new Date().toISOString(),
      data: {},
    };

    // Fetch commodities
    if (type === 'all' || type === 'commodities') {
      const commodityPromises = YAHOO_SYMBOLS.commodities.map(async (item) => {
        const quote = await fetchYahooQuote(item.yahoo);
        return quote ? { name: item.name, ...quote } : null;
      });

      const commodityResults = await Promise.all(commodityPromises);
      const commodities = {};

      commodityResults.forEach((result, idx) => {
        if (result) {
          const key = YAHOO_SYMBOLS.commodities[idx].name.toLowerCase();
          commodities[key] = {
            price: result.price,
            change: result.change,
            unit: key === 'gold' || key === 'platinum' ? '10g' : 'kg',
          };
        }
      });

      results.data.commodities = commodities;
    }

    // Fetch broad market indices
    if (type === 'all' || type === 'indices') {
      const broadMarketPromises = YAHOO_SYMBOLS.broadMarket.map(async (item) => {
        const quote = await fetchYahooQuote(item.yahoo);
        return quote ? {
          symbol: item.name,
          value: quote.price,
          change: quote.change,
          open: quote.open,
          high: quote.high,
          low: quote.low,
        } : null;
      });

      const sectoralPromises = YAHOO_SYMBOLS.sectoral.map(async (item) => {
        const quote = await fetchYahooQuote(item.yahoo);
        return quote ? {
          symbol: item.name,
          value: quote.price,
          change: quote.change,
          open: quote.open,
          high: quote.high,
          low: quote.low,
        } : null;
      });

      const [broadMarketResults, sectoralResults] = await Promise.all([
        Promise.all(broadMarketPromises),
        Promise.all(sectoralPromises),
      ]);

      results.data.broadMarket = broadMarketResults.filter(Boolean);
      results.data.sectoral = sectoralResults.filter(Boolean);
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Yahoo API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Yahoo data',
      message: error.message,
    });
  }
}
