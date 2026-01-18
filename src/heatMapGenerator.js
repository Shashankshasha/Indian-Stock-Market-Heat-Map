/**
 * Indian Stock Market Heat Map Generator
 * This module processes stock data and generates heat map visualizations
 */

// Sample stock data for Indian markets
const stockData = {
  nifty50: [
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
  ]
};

// Color scheme definitions - threshold to color mappings
const COLOR_SCHEMES = {
  default: [
    { threshold: 5, color: '#006400' },
    { threshold: 3, color: '#228B22' },
    { threshold: 2, color: '#32CD32' },
    { threshold: 1, color: '#7CFC00' },
    { threshold: 0.5, color: '#90EE90' },
    { threshold: 0, color: '#98FB98' },
    { threshold: -0.5, color: '#FFB6C1' },
    { threshold: -1, color: '#FF6B6B' },
    { threshold: -2, color: '#FF4500' },
    { threshold: -3, color: '#DC143C' },
    { threshold: -5, color: '#B22222' },
    { threshold: -Infinity, color: '#8B0000' }
  ],
  blue: [
    { threshold: 5, color: '#000080' },
    { threshold: 3, color: '#0000CD' },
    { threshold: 2, color: '#0000FF' },
    { threshold: 1, color: '#4169E1' },
    { threshold: 0.5, color: '#6495ED' },
    { threshold: 0, color: '#87CEEB' },
    { threshold: -0.5, color: '#FFDAB9' },
    { threshold: -1, color: '#FFA07A' },
    { threshold: -2, color: '#FF7F50' },
    { threshold: -3, color: '#FF6347' },
    { threshold: -5, color: '#FF4500' },
    { threshold: -Infinity, color: '#DC143C' }
  ],
  grayscale: [
    { threshold: 5, color: '#000000' },
    { threshold: 3, color: '#1a1a1a' },
    { threshold: 2, color: '#333333' },
    { threshold: 1, color: '#4d4d4d' },
    { threshold: 0.5, color: '#666666' },
    { threshold: 0, color: '#808080' },
    { threshold: -0.5, color: '#999999' },
    { threshold: -1, color: '#b3b3b3' },
    { threshold: -2, color: '#cccccc' },
    { threshold: -3, color: '#e6e6e6' },
    { threshold: -5, color: '#f2f2f2' },
    { threshold: -Infinity, color: '#ffffff' }
  ]
};

const DEFAULT_COLOR = '#808080';

/**
 * Validates input data and returns error object if invalid
 */
function validateData(data) {
  if (data === null || data === undefined) {
    return { error: 'No data provided', code: 'ERR_NO_DATA' };
  }

  if (typeof data !== 'object') {
    return { error: 'Invalid data format', code: 'ERR_INVALID_FORMAT' };
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { error: 'Empty data array', code: 'ERR_EMPTY_DATA' };
    }
    return null;
  }

  if (!data.nifty50 && !data.sensex && !data.custom) {
    return { error: 'Missing stock data', code: 'ERR_MISSING_STOCKS' };
  }

  return null;
}

/**
 * Extracts stocks array from various input formats
 */
function extractStocks(data) {
  if (Array.isArray(data)) return data;
  return data.nifty50 || data.sensex || data.custom || [];
}

/**
 * Filters stocks based on sector and market cap criteria
 */
function filterStocks(stocks, { sector, minMarketCap, maxMarketCap }) {
  return stocks.filter(stock => {
    if (sector && stock.sector !== sector) return false;
    if (stock.marketCap < minMarketCap) return false;
    if (stock.marketCap > maxMarketCap) return false;
    if (!stock.price || stock.price <= 0) return false;
    return true;
  });
}

/**
 * Generic sort function for stocks
 */
function sortStocks(stocks, sortBy, sortOrder) {
  const multiplier = sortOrder === 'asc' ? 1 : -1;

  return [...stocks].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal < bVal) return -1 * multiplier;
    if (aVal > bVal) return 1 * multiplier;
    return 0;
  });
}

/**
 * Gets color for a given change percentage based on color scheme
 */
function getColorForChange(change, schemeName) {
  const scheme = COLOR_SCHEMES[schemeName];
  if (!scheme) return DEFAULT_COLOR;

  for (const { threshold, color } of scheme) {
    if (change >= threshold) return color;
  }

  return DEFAULT_COLOR;
}

/**
 * Adds color property to each stock based on change percentage
 */
function addColorsToStocks(stocks, colorScheme) {
  return stocks.map(stock => ({
    ...stock,
    color: getColorForChange(stock.change, colorScheme)
  }));
}

/**
 * Groups stocks by sector
 */
function groupBySector(stocks, shouldGroup) {
  if (!shouldGroup) {
    return { All: stocks };
  }

  return stocks.reduce((groups, stock) => {
    const sector = stock.sector;
    if (!groups[sector]) {
      groups[sector] = [];
    }
    groups[sector].push(stock);
    return groups;
  }, {});
}

/**
 * Calculates statistics for each sector
 */
function calculateSectorStats(sectorGroups) {
  const stats = {};

  for (const [sectorName, sectorStocks] of Object.entries(sectorGroups)) {
    const totals = sectorStocks.reduce(
      (acc, stock) => ({
        marketCap: acc.marketCap + stock.marketCap,
        change: acc.change + stock.change,
        volume: acc.volume + stock.volume
      }),
      { marketCap: 0, change: 0, volume: 0 }
    );

    stats[sectorName] = {
      stockCount: sectorStocks.length,
      totalMarketCap: totals.marketCap,
      averageChange: totals.change / sectorStocks.length,
      totalVolume: totals.volume
    };
  }

  return stats;
}

/**
 * Generates treemap layout cells
 */
function generateTreemapLayout(stocks, width, height, totalMarketCap) {
  const cells = [];
  let currentX = 0;
  let currentY = 0;
  let rowHeight = 0;

  for (const stock of stocks) {
    const proportion = stock.marketCap / totalMarketCap;
    const cellWidth = Math.sqrt(proportion) * width;
    const cellHeight = Math.sqrt(proportion) * height;

    if (currentX + cellWidth > width) {
      currentX = 0;
      currentY += rowHeight;
      rowHeight = 0;
    }

    rowHeight = Math.max(rowHeight, cellHeight);

    cells.push({
      stock,
      x: currentX,
      y: currentY,
      width: cellWidth,
      height: cellHeight
    });

    currentX += cellWidth;
  }

  return cells;
}

/**
 * Generates grid layout cells
 */
function generateGridLayout(stocks, width, height) {
  const cols = Math.ceil(Math.sqrt(stocks.length));
  const rows = Math.ceil(stocks.length / cols);
  const cellWidth = width / cols;
  const cellHeight = height / rows;

  return stocks.map((stock, i) => ({
    stock,
    x: (i % cols) * cellWidth,
    y: Math.floor(i / cols) * cellHeight,
    width: cellWidth,
    height: cellHeight
  }));
}

/**
 * Generates layout cells based on layout type
 */
function generateLayoutCells(stocks, layout, width, height, totalMarketCap) {
  if (layout === 'grid') {
    return generateGridLayout(stocks, width, height);
  }
  return generateTreemapLayout(stocks, width, height, totalMarketCap);
}

/**
 * Calculates summary statistics for stocks
 */
function calculateSummary(stocks, totalMarketCap) {
  const summary = {
    totalStocks: stocks.length,
    totalMarketCap,
    gainers: 0,
    losers: 0,
    unchanged: 0,
    topGainer: null,
    topLoser: null,
    averageChange: 0
  };

  let totalChange = 0;

  for (const stock of stocks) {
    totalChange += stock.change;

    if (stock.change > 0) {
      summary.gainers++;
      if (!summary.topGainer || stock.change > summary.topGainer.change) {
        summary.topGainer = stock;
      }
    } else if (stock.change < 0) {
      summary.losers++;
      if (!summary.topLoser || stock.change < summary.topLoser.change) {
        summary.topLoser = stock;
      }
    } else {
      summary.unchanged++;
    }
  }

  summary.averageChange = totalChange / stocks.length;
  return summary;
}

/**
 * Main heat map generation function
 */
function generateHeatMap(data, options = {}) {
  // Validate input data
  const validationError = validateData(data);
  if (validationError) return validationError;

  // Extract options with defaults
  const {
    sortBy = 'marketCap',
    sortOrder = 'desc',
    sector: filterSector = null,
    minMarketCap = 0,
    maxMarketCap = Infinity,
    colorScheme = 'default',
    groupBySector: shouldGroup = true,
    layout = 'treemap',
    width = 1200,
    height = 800
  } = options;

  // Process stocks through pipeline
  const rawStocks = extractStocks(data);
  const filteredStocks = filterStocks(rawStocks, { sector: filterSector, minMarketCap, maxMarketCap });
  const sortedStocks = sortStocks(filteredStocks, sortBy, sortOrder);
  const stocksWithColors = addColorsToStocks(sortedStocks, colorScheme);

  // Calculate totals and groupings
  const totalMarketCap = stocksWithColors.reduce((sum, s) => sum + s.marketCap, 0);
  const sectorGroups = groupBySector(stocksWithColors, shouldGroup);
  const sectorStats = calculateSectorStats(sectorGroups);

  // Generate layout and summary
  const cells = generateLayoutCells(stocksWithColors, layout, width, height, totalMarketCap);
  const summary = calculateSummary(stocksWithColors, totalMarketCap);

  return {
    success: true,
    timestamp: new Date().toISOString(),
    options: {
      sortBy,
      sortOrder,
      filterSector,
      colorScheme,
      layout,
      dimensions: { width, height }
    },
    summary,
    sectorStats,
    cells,
    stockCount: stocksWithColors.length
  };
}

module.exports = {
  generateHeatMap,
  stockData
};
