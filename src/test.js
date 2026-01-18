/**
 * Test file for heatMapGenerator
 * Ensures behavior is maintained after refactoring
 */

const { generateHeatMap, stockData } = require('./heatMapGenerator');

function assertEqual(actual, expected, testName) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr === expectedStr) {
    console.log(`  PASS: ${testName}`);
    return true;
  } else {
    console.log(`  FAIL: ${testName}`);
    console.log(`    Expected: ${expectedStr}`);
    console.log(`    Actual: ${actualStr}`);
    return false;
  }
}

function assertExists(value, testName) {
  if (value !== null && value !== undefined) {
    console.log(`  PASS: ${testName}`);
    return true;
  } else {
    console.log(`  FAIL: ${testName} - value is null/undefined`);
    return false;
  }
}

let passed = 0;
let failed = 0;

console.log('\n=== Heat Map Generator Tests ===\n');

// Test 1: Basic functionality
console.log('Test 1: Basic functionality with default options');
const result1 = generateHeatMap(stockData);
if (assertEqual(result1.success, true, 'Should return success')) passed++; else failed++;
if (assertEqual(result1.stockCount, 20, 'Should have 20 stocks')) passed++; else failed++;
if (assertExists(result1.summary, 'Should have summary')) passed++; else failed++;
if (assertExists(result1.cells, 'Should have cells')) passed++; else failed++;
if (assertExists(result1.sectorStats, 'Should have sectorStats')) passed++; else failed++;

// Test 2: Error handling - null data
console.log('\nTest 2: Error handling - null data');
const result2 = generateHeatMap(null);
if (assertEqual(result2.error, 'No data provided', 'Should return error for null data')) passed++; else failed++;
if (assertEqual(result2.code, 'ERR_NO_DATA', 'Should return correct error code')) passed++; else failed++;

// Test 3: Error handling - empty array
console.log('\nTest 3: Error handling - empty array');
const result3 = generateHeatMap([]);
if (assertEqual(result3.error, 'Empty data array', 'Should return error for empty array')) passed++; else failed++;

// Test 4: Error handling - invalid format
console.log('\nTest 4: Error handling - invalid format');
const result4 = generateHeatMap('invalid');
if (assertEqual(result4.error, 'Invalid data format', 'Should return error for string input')) passed++; else failed++;

// Test 5: Sector filtering
console.log('\nTest 5: Sector filtering');
const result5 = generateHeatMap(stockData, { sector: 'IT' });
if (assertEqual(result5.success, true, 'Should succeed with sector filter')) passed++; else failed++;
if (assertEqual(result5.stockCount, 4, 'Should have 4 IT stocks')) passed++; else failed++;

// Test 6: Sorting by change descending
console.log('\nTest 6: Sorting by change descending');
const result6 = generateHeatMap(stockData, { sortBy: 'change', sortOrder: 'desc' });
const changes = result6.cells.map(c => c.stock.change);
const isSortedDesc = changes.every((v, i, a) => !i || a[i-1] >= v);
if (assertEqual(isSortedDesc, true, 'Should be sorted by change descending')) passed++; else failed++;

// Test 7: Sorting by price ascending
console.log('\nTest 7: Sorting by price ascending');
const result7 = generateHeatMap(stockData, { sortBy: 'price', sortOrder: 'asc' });
const prices = result7.cells.map(c => c.stock.price);
const isSortedAsc = prices.every((v, i, a) => !i || a[i-1] <= v);
if (assertEqual(isSortedAsc, true, 'Should be sorted by price ascending')) passed++; else failed++;

// Test 8: Market cap filtering
console.log('\nTest 8: Market cap filtering');
const result8 = generateHeatMap(stockData, { minMarketCap: 500000, maxMarketCap: 1000000 });
const allInRange = result8.cells.every(c => c.stock.marketCap >= 500000 && c.stock.marketCap <= 1000000);
if (assertEqual(allInRange, true, 'All stocks should be within market cap range')) passed++; else failed++;
if (assertEqual(result8.stockCount, 7, 'Should have 7 stocks in range')) passed++; else failed++;

// Test 9: Color scheme - default (green/red)
console.log('\nTest 9: Color scheme - default');
const result9 = generateHeatMap(stockData, { colorScheme: 'default' });
const hasColors = result9.cells.every(c => c.stock.color && c.stock.color.startsWith('#'));
if (assertEqual(hasColors, true, 'All stocks should have color')) passed++; else failed++;

// Test 10: Color for positive change
console.log('\nTest 10: Color for positive change (green)');
const positiveStock = result9.cells.find(c => c.stock.change > 3);
const isGreenish = positiveStock && (positiveStock.stock.color === '#228B22' || positiveStock.stock.color === '#006400');
if (assertEqual(isGreenish, true, 'High positive change should be dark green')) passed++; else failed++;

// Test 11: Color for negative change
console.log('\nTest 11: Color for negative change (red)');
const negativeStock = result9.cells.find(c => c.stock.change < -1.5);
const isReddish = negativeStock && ['#FF4500', '#DC143C', '#B22222', '#8B0000'].includes(negativeStock.stock.color);
if (assertEqual(isReddish, true, 'Negative change should be red')) passed++; else failed++;

// Test 12: Grid layout
console.log('\nTest 12: Grid layout');
const result12 = generateHeatMap(stockData, { layout: 'grid', width: 1000, height: 800 });
const allHavePositions = result12.cells.every(c => c.x !== undefined && c.y !== undefined);
if (assertEqual(allHavePositions, true, 'All cells should have x,y positions')) passed++; else failed++;

// Test 13: Summary statistics
console.log('\nTest 13: Summary statistics');
const result13 = generateHeatMap(stockData);
if (assertEqual(result13.summary.totalStocks, 20, 'Summary should have correct total')) passed++; else failed++;
if (assertExists(result13.summary.topGainer, 'Should have top gainer')) passed++; else failed++;
if (assertExists(result13.summary.topLoser, 'Should have top loser')) passed++; else failed++;
if (assertEqual(result13.summary.gainers + result13.summary.losers + result13.summary.unchanged, 20, 'Gainers + losers + unchanged should equal total')) passed++; else failed++;

// Test 14: Sector grouping
console.log('\nTest 14: Sector grouping');
const result14 = generateHeatMap(stockData, { groupBySector: true });
const sectors = Object.keys(result14.sectorStats);
if (assertEqual(sectors.length > 1, true, 'Should have multiple sectors')) passed++; else failed++;
if (assertExists(result14.sectorStats['Banking'], 'Should have Banking sector')) passed++; else failed++;
if (assertExists(result14.sectorStats['IT'], 'Should have IT sector')) passed++; else failed++;

// Test 15: Direct array input
console.log('\nTest 15: Direct array input');
const directData = stockData.nifty50.slice(0, 5);
const result15 = generateHeatMap(directData);
if (assertEqual(result15.success, true, 'Should succeed with direct array')) passed++; else failed++;
if (assertEqual(result15.stockCount, 5, 'Should have 5 stocks from direct array')) passed++; else failed++;

// Test 16: Blue color scheme
console.log('\nTest 16: Blue color scheme');
const result16 = generateHeatMap(stockData, { colorScheme: 'blue' });
const blueStock = result16.cells.find(c => c.stock.change > 3);
const isBlue = blueStock && ['#000080', '#0000CD'].includes(blueStock.stock.color);
if (assertEqual(isBlue, true, 'High positive change should be dark blue')) passed++; else failed++;

// Test 17: Grayscale color scheme
console.log('\nTest 17: Grayscale color scheme');
const result17 = generateHeatMap(stockData, { colorScheme: 'grayscale' });
const gsStock = result17.cells.find(c => c.stock.change > 3);
const isGray = gsStock && ['#000000', '#1a1a1a'].includes(gsStock.stock.color);
if (assertEqual(isGray, true, 'High positive change should be dark in grayscale')) passed++; else failed++;

// Test 18: Sorting by symbol
console.log('\nTest 18: Sorting by symbol');
const result18 = generateHeatMap(stockData, { sortBy: 'symbol', sortOrder: 'asc' });
const symbols = result18.cells.map(c => c.stock.symbol);
const isAlphabetical = symbols.every((v, i, a) => !i || a[i-1] <= v);
if (assertEqual(isAlphabetical, true, 'Should be sorted alphabetically')) passed++; else failed++;

// Test 19: Sorting by volume
console.log('\nTest 19: Sorting by volume');
const result19 = generateHeatMap(stockData, { sortBy: 'volume', sortOrder: 'desc' });
const volumes = result19.cells.map(c => c.stock.volume);
const volumeSorted = volumes.every((v, i, a) => !i || a[i-1] >= v);
if (assertEqual(volumeSorted, true, 'Should be sorted by volume desc')) passed++; else failed++;

// Test 20: Sector stats accuracy
console.log('\nTest 20: Sector stats accuracy');
const bankingStocks = stockData.nifty50.filter(s => s.sector === 'Banking');
const expectedBankingCount = bankingStocks.length;
const actualBankingCount = result14.sectorStats['Banking'].stockCount;
if (assertEqual(actualBankingCount, expectedBankingCount, 'Banking sector stock count should be accurate')) passed++; else failed++;

console.log('\n=== Test Results ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nAll tests passed!\n');
  process.exit(0);
}
