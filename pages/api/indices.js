// NSE India Data Fetcher - Server-side proxy
// This runs on Vercel server, bypassing browser CORS restrictions

const NSE_BASE_URL = 'https://www.nseindia.com/api';

// NSE requires these headers to respond
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Referer': 'https://www.nseindia.com/market-data/live-equity-market',
  'Connection': 'keep-alive',
};

// Cookie store (NSE requires cookies from initial request)
let cookies = '';

async function getNSECookies() {
  try {
    const response = await fetch('https://www.nseindia.com', {
      headers: {
        'User-Agent': headers['User-Agent'],
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      cookies = setCookie.split(',').map(c => c.split(';')[0]).join('; ');
    }
    return true;
  } catch (error) {
    console.error('Failed to get NSE cookies:', error);
    return false;
  }
}

async function fetchNSEData(endpoint) {
  // Get fresh cookies if needed
  if (!cookies) {
    await getNSECookies();
  }

  try {
    const response = await fetch(`${NSE_BASE_URL}${endpoint}`, {
      headers: {
        ...headers,
        'Cookie': cookies,
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Cookies expired, refresh and retry
      await getNSECookies();
      const retryResponse = await fetch(`${NSE_BASE_URL}${endpoint}`, {
        headers: {
          ...headers,
          'Cookie': cookies,
        },
      });
      return retryResponse.json();
    }

    return response.json();
  } catch (error) {
    console.error('NSE fetch error:', error);
    throw error;
  }
}

// Transform NSE data to our format
function transformIndexData(nseData, category) {
  if (!nseData || !nseData.data) return [];

  return nseData.data.map(item => ({
    symbol: item.index || item.symbol,
    value: parseFloat(item.last) || parseFloat(item.lastPrice) || 0,
    change: parseFloat(item.percChange) || parseFloat(item.pChange) || 0,
    open: parseFloat(item.open) || 0,
    high: parseFloat(item.high) || 0,
    low: parseFloat(item.low) || 0,
    previousClose: parseFloat(item.previousClose) || 0,
    category: category,
  }));
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');

  const { category } = req.query;

  try {
    let data = {};
    const timestamp = new Date().toISOString();

    if (!category || category === 'all') {
      // Fetch all categories
      const [broadMarket, sectoral] = await Promise.all([
        fetchNSEData('/allIndices').catch(() => null),
        fetchNSEData('/equity-stockIndices?index=SECURITIES%20IN%20F%26O').catch(() => null),
      ]);

      // Group indices by type
      if (broadMarket && broadMarket.data) {
        const allIndices = broadMarket.data;

        data.broadMarket = allIndices
          .filter(i => i.index && (
            i.index.includes('NIFTY 50') ||
            i.index.includes('NIFTY NEXT') ||
            i.index.includes('NIFTY 100') ||
            i.index.includes('NIFTY 200') ||
            i.index.includes('NIFTY 500') ||
            i.index.includes('NIFTY MIDCAP') ||
            i.index.includes('NIFTY SMLCAP') ||
            i.index.includes('NIFTY LARGEMID')
          ))
          .map(i => ({
            symbol: i.index,
            value: parseFloat(i.last) || 0,
            change: parseFloat(i.percChange) || 0,
            open: parseFloat(i.open) || 0,
            high: parseFloat(i.high) || 0,
            low: parseFloat(i.low) || 0,
          }));

        data.sectoral = allIndices
          .filter(i => i.index && (
            i.index.includes('BANK') ||
            i.index.includes('IT') ||
            i.index.includes('PHARMA') ||
            i.index.includes('AUTO') ||
            i.index.includes('METAL') ||
            i.index.includes('REALTY') ||
            i.index.includes('FMCG') ||
            i.index.includes('ENERGY') ||
            i.index.includes('INFRA') ||
            i.index.includes('PSU') ||
            i.index.includes('MEDIA') ||
            i.index.includes('FIN')
          ))
          .map(i => ({
            symbol: i.index,
            value: parseFloat(i.last) || 0,
            change: parseFloat(i.percChange) || 0,
            open: parseFloat(i.open) || 0,
            high: parseFloat(i.high) || 0,
            low: parseFloat(i.low) || 0,
          }));

        data.thematic = allIndices
          .filter(i => i.index && (
            i.index.includes('COMMODITIES') ||
            i.index.includes('CONSUMPTION') ||
            i.index.includes('CPSE') ||
            i.index.includes('MNC') ||
            i.index.includes('PSE') ||
            i.index.includes('SERVICE') ||
            i.index.includes('GROWTH') ||
            i.index.includes('VALUE') ||
            i.index.includes('DIVIDEND')
          ))
          .map(i => ({
            symbol: i.index,
            value: parseFloat(i.last) || 0,
            change: parseFloat(i.percChange) || 0,
            open: parseFloat(i.open) || 0,
            high: parseFloat(i.high) || 0,
            low: parseFloat(i.low) || 0,
          }));

        data.strategy = allIndices
          .filter(i => i.index && (
            i.index.includes('ALPHA') ||
            i.index.includes('QUALITY') ||
            i.index.includes('LOWVOL') ||
            i.index.includes('MOMENTUM') ||
            i.index.includes('EQL') ||
            i.index.includes('VALUE')
          ))
          .map(i => ({
            symbol: i.index,
            value: parseFloat(i.last) || 0,
            change: parseFloat(i.percChange) || 0,
            open: parseFloat(i.open) || 0,
            high: parseFloat(i.high) || 0,
            low: parseFloat(i.low) || 0,
          }));
      }
    }

    res.status(200).json({
      success: true,
      timestamp,
      data,
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NSE data',
      message: error.message,
    });
  }
}
