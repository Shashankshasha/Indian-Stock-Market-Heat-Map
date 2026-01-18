// Indian Stock Market Data - Indices with Open/High/Low
// Counts: Broad Market (19), Sectoral (21), Thematic (37), Strategy (36)

export const indicesData = {
  broadMarket: [
    { symbol: 'NIFTY 50', value: 25694.35, change: 0.11, open: 25650.20, high: 25750.45, low: 25580.10 },
    { symbol: 'NIFTY NEXT 50', value: 68857.90, change: 0.10, open: 68750.00, high: 69100.25, low: 68500.50 },
    { symbol: 'NIFTY MIDCAP 50', value: 17146.20, change: 0.54, open: 17050.00, high: 17200.00, low: 17000.00 },
    { symbol: 'NIFTY MIDCAP 100', value: 59867.80, change: 0.16, open: 59700.00, high: 60000.00, low: 59500.00 },
    { symbol: 'NIFTY MIDCAP 150', value: 21975.10, change: 0.04, open: 21950.00, high: 22050.00, low: 21900.00 },
    { symbol: 'NIFTY SMLCAP 50', value: 8505.35, change: -0.17, open: 8530.00, high: 8560.00, low: 8480.00 },
    { symbol: 'NIFTY SMLCAP 100', value: 17362.30, change: -0.28, open: 17420.00, high: 17450.00, low: 17300.00 },
    { symbol: 'NIFTY SMLCAP 250', value: 16207.30, change: -0.47, open: 16300.00, high: 16350.00, low: 16150.00 },
    { symbol: 'NIFTY MIDSML 400', value: 19839.15, change: -0.13, open: 19880.00, high: 19950.00, low: 19780.00 },
    { symbol: 'NIFTY 100', value: 26285.30, change: 0.11, open: 26250.00, high: 26350.00, low: 26200.00 },
    { symbol: 'NIFTY 200', value: 14326.60, change: 0.12, open: 14300.00, high: 14380.00, low: 14270.00 },
    { symbol: 'NIFTY500 MULTICAP', value: 16186.55, change: -0.05, open: 16200.00, high: 16250.00, low: 16150.00 },
    { symbol: 'NIFTY LARGEMID 250', value: 16613.20, change: 0.08, open: 16590.00, high: 16680.00, low: 16560.00 },
    { symbol: 'NIFTY MID SELECT', value: 13697.85, change: -0.06, open: 13710.00, high: 13750.00, low: 13650.00 },
    { symbol: 'NIFTY TOTAL MKT', value: 13166.30, change: 0.02, open: 13160.00, high: 13200.00, low: 13130.00 },
    { symbol: 'NIFTY MICROCAP 250', value: 21684.80, change: -0.39, open: 21780.00, high: 21850.00, low: 21600.00 },
    { symbol: 'NIFTY 500', value: 23485.30, change: 0.04, open: 23470.00, high: 23550.00, low: 23420.00 },
    { symbol: 'NIFTY FPI 150', value: 1598.70, change: 0.19, open: 1595.00, high: 1605.00, low: 1590.00 },
    { symbol: 'NIFTY500 LMS EQ', value: 17741.60, change: -0.10, open: 17760.00, high: 17800.00, low: 17700.00 },
  ],
  sectoral: [
    { symbol: 'NIFTY AUTO', value: 27596.25, change: -0.45, open: 27720.00, high: 27800.00, low: 27500.00 },
    { symbol: 'NIFTY BANK', value: 60095.15, change: 0.86, open: 59600.00, high: 60200.00, low: 59500.00 },
    { symbol: 'NIFTY FIN SERVICES', value: 27523.15, change: 0.08, open: 27500.00, high: 27600.00, low: 27400.00 },
    { symbol: 'NIFTY FINSRV 25/50', value: 30217.30, change: 0.03, open: 30200.00, high: 30300.00, low: 30100.00 },
    { symbol: 'NIFTY FMCG', value: 52142.50, change: -0.22, open: 52260.00, high: 52400.00, low: 52000.00 },
    { symbol: 'NIFTY IT', value: 39086.65, change: 3.34, open: 37820.00, high: 39150.00, low: 37800.00 },
    { symbol: 'NIFTY MEDIA', value: 1410.55, change: -0.35, open: 1415.00, high: 1425.00, low: 1405.00 },
    { symbol: 'NIFTY METAL', value: 11600.05, change: -0.53, open: 11665.00, high: 11700.00, low: 11550.00 },
    { symbol: 'NIFTY PHARMA', value: 22217.05, change: -1.28, open: 22500.00, high: 22550.00, low: 22150.00 },
    { symbol: 'NIFTY PSU BANK', value: 9014.25, change: 1.16, open: 8910.00, high: 9050.00, low: 8900.00 },
    { symbol: 'NIFTY REALTY', value: 853.00, change: 0.35, open: 850.00, high: 858.00, low: 848.00 },
    { symbol: 'NIFTY PVT BANK', value: 28689.55, change: 0.45, open: 28560.00, high: 28750.00, low: 28500.00 },
    { symbol: 'NIFTY HEALTHCARE', value: 14388.75, change: -1.15, open: 14560.00, high: 14600.00, low: 14350.00 },
    { symbol: 'NIFTY CONSR DURBL', value: 36550.85, change: -1.11, open: 36960.00, high: 37000.00, low: 36450.00 },
    { symbol: 'NIFTY OIL AND GAS', value: 11748.50, change: 0.28, open: 11715.00, high: 11800.00, low: 11680.00 },
    { symbol: 'NIFTY MIDSML HLTH', value: 43420.90, change: -1.04, open: 43880.00, high: 43950.00, low: 43300.00 },
    { symbol: 'NIFTY CHEMICALS', value: 28725.05, change: -0.12, open: 28760.00, high: 28850.00, low: 28650.00 },
    { symbol: 'NIFTY500 HEALTH', value: 18373.20, change: -1.15, open: 18590.00, high: 18620.00, low: 18320.00 },
    { symbol: 'NIFTY FINSEREX BNK', value: 31813.35, change: 0.31, open: 31720.00, high: 31900.00, low: 31680.00 },
    { symbol: 'NIFTY MS FIN SERV', value: 21217.70, change: 1.45, open: 20920.00, high: 21280.00, low: 20900.00 },
    { symbol: 'NIFTY MS IT TELECOM', value: 10232.20, change: 1.06, open: 10125.00, high: 10260.00, low: 10100.00 },
  ],
  thematic: [
    { symbol: 'NIFTY COMMODITIES', value: 9620.60, change: -0.78, open: 9700.00, high: 9720.00, low: 9600.00 },
    { symbol: 'NIFTY CONSUMPTION', value: 11906.65, change: -0.69, open: 11990.00, high: 12020.00, low: 11880.00 },
    { symbol: 'NIFTY ENERGY', value: 34346.35, change: -0.80, open: 34620.00, high: 34700.00, low: 34250.00 },
    { symbol: 'NIFTY CPSE', value: 6522.25, change: -0.88, open: 6580.00, high: 6600.00, low: 6500.00 },
    { symbol: 'NIFTY INFRA', value: 9252.40, change: -0.06, open: 9260.00, high: 9300.00, low: 9230.00 },
    { symbol: 'NIFTY MNC', value: 30436.20, change: -0.13, open: 30480.00, high: 30550.00, low: 30380.00 },
    { symbol: 'NIFTY PSE', value: 9909.45, change: -0.26, open: 9935.00, high: 9970.00, low: 9880.00 },
    { symbol: 'NIFTY SERV SECTOR', value: 33573.00, change: 0.49, open: 33410.00, high: 33650.00, low: 33380.00 },
    { symbol: 'NIFTY100 LIQ 15', value: 7390.70, change: -0.33, open: 7415.00, high: 7430.00, low: 7370.00 },
    { symbol: 'NIFTY MID LIQ 15', value: 15912.30, change: 0.11, open: 15895.00, high: 15980.00, low: 15860.00 },
    { symbol: 'NIFTY IND DIGITAL', value: 9390.90, change: 1.03, open: 9295.00, high: 9420.00, low: 9280.00 },
    { symbol: 'NIFTY100 ESG', value: 5173.50, change: 0.26, open: 5160.00, high: 5185.00, low: 5150.00 },
    { symbol: 'NIFTY INDIA MFG', value: 15190.25, change: -0.67, open: 15290.00, high: 15320.00, low: 15140.00 },
    { symbol: 'NIFTY TATA 25', value: 15240.15, change: -0.06, open: 15250.00, high: 15300.00, low: 15200.00 },
    { symbol: 'NIFTY MULTI MFG', value: 15580.60, change: -0.71, open: 15690.00, high: 15720.00, low: 15530.00 },
    { symbol: 'NIFTY MULTI INFRA', value: 13914.10, change: -0.28, open: 13955.00, high: 13990.00, low: 13880.00 },
    { symbol: 'NIFTY INTERNET', value: 1367.00, change: -0.46, open: 1373.00, high: 1380.00, low: 1362.00 },
    { symbol: 'NIFTY WAVES', value: 2027.85, change: -0.61, open: 2040.00, high: 2050.00, low: 2020.00 },
    { symbol: 'NIFTY IND DEFENCE', value: 7790.50, change: -0.53, open: 7830.00, high: 7860.00, low: 7760.00 },
    { symbol: 'NIFTY IND TOURISM', value: 8047.05, change: -0.74, open: 8110.00, high: 8140.00, low: 8020.00 },
    { symbol: 'NIFTY CAPITAL MKT', value: 4802.30, change: 1.29, open: 4740.00, high: 4820.00, low: 4730.00 },
    { symbol: 'NIFTY EV', value: 3055.50, change: -0.53, open: 3070.00, high: 3085.00, low: 3045.00 },
    { symbol: 'NIFTY NEW CONSUM', value: 11531.80, change: -0.48, open: 11590.00, high: 11620.00, low: 11500.00 },
    { symbol: 'NIFTY MOBILITY', value: 22508.15, change: -0.61, open: 22650.00, high: 22700.00, low: 22450.00 },
    { symbol: 'NIFTY HOUSING', value: 11715.55, change: -0.13, open: 11730.00, high: 11780.00, low: 11680.00 },
    { symbol: 'NIFTY IPO', value: 1994.95, change: 0.28, open: 1989.00, high: 2005.00, low: 1982.00 },
    { symbol: 'NIFTY INFRALOG', value: 11022.50, change: -0.50, open: 11080.00, high: 11100.00, low: 11000.00 },
    { symbol: 'NIFTY CORP MAATR', value: 38385.25, change: 0.08, open: 38355.00, high: 38500.00, low: 38300.00 },
    { symbol: 'NIFTY MS IND CON', value: 18331.85, change: -0.75, open: 18470.00, high: 18500.00, low: 18280.00 },
    { symbol: 'NIFTY NONCYC CON', value: 15497.90, change: -0.74, open: 15615.00, high: 15650.00, low: 15450.00 },
    { symbol: 'NIFTY RURAL', value: 15905.40, change: -0.07, open: 15920.00, high: 15980.00, low: 15870.00 },
    { symbol: 'NIFTY SHARIAH 25', value: 8401.25, change: 0.44, open: 8365.00, high: 8430.00, low: 8350.00 },
    { symbol: 'NIFTY TRANS LOGI', value: 25281.20, change: -0.82, open: 25490.00, high: 25530.00, low: 25200.00 },
    { symbol: 'NIFTY50 SHARIA', value: 4868.90, change: 1.27, open: 4808.00, high: 4880.00, low: 4800.00 },
    { symbol: 'NIFTY500 SHARIA', value: 7104.80, change: 0.37, open: 7080.00, high: 7130.00, low: 7060.00 },
    { symbol: 'NIFTY100 ENH ESG', value: 5217.05, change: 0.25, open: 5205.00, high: 5235.00, low: 5195.00 },
    { symbol: 'NIFTY COREHOUS', value: 15445.15, change: -0.26, open: 15490.00, high: 15530.00, low: 15410.00 },
  ],
  strategy: [
    { symbol: 'NIFTY DIV OPPS 50', value: 6409.65, change: 0.98, open: 6345.00, high: 6425.00, low: 6340.00 },
    { symbol: 'NIFTY50 VALUE 20', value: 13323.05, change: 0.54, open: 13250.00, high: 13360.00, low: 13230.00 },
    { symbol: 'NIFTY100 QUALITY', value: 5852.95, change: 0.06, open: 5850.00, high: 5870.00, low: 5840.00 },
    { symbol: 'NIFTY50 EQL WGT', value: 33115.90, change: -0.10, open: 33150.00, high: 33250.00, low: 33050.00 },
    { symbol: 'NIFTY100 EQL WGT', value: 33648.80, change: -0.07, open: 33675.00, high: 33750.00, low: 33580.00 },
    { symbol: 'NIFTY100 LOWVOL', value: 20920.90, change: -0.09, open: 20940.00, high: 21000.00, low: 20880.00 },
    { symbol: 'NIFTY ALPHA 50', value: 49829.20, change: 0.08, open: 49790.00, high: 50000.00, low: 49650.00 },
    { symbol: 'NIFTY200 QUALITY', value: 21291.55, change: 0.25, open: 21240.00, high: 21350.00, low: 21200.00 },
    { symbol: 'NIFTY ALPHALOW', value: 26912.65, change: 0.12, open: 26880.00, high: 26980.00, low: 26850.00 },
    { symbol: 'NIFTY200MOMENTUM', value: 31065.40, change: 0.30, open: 30970.00, high: 31120.00, low: 30940.00 },
    { symbol: 'NIFTY M150 QLT50', value: 23682.80, change: 0.17, open: 23640.00, high: 23740.00, low: 23600.00 },
    { symbol: 'NIFTY200 ALPHA', value: 24908.00, change: 0.23, open: 24850.00, high: 24960.00, low: 24820.00 },
    { symbol: 'NIFTYM150MOMNT50', value: 61348.55, change: 0.55, open: 61010.00, high: 61500.00, low: 60950.00 },
    { symbol: 'NIFTY500 QLTY50', value: 18671.30, change: -0.09, open: 18690.00, high: 18750.00, low: 18630.00 },
    { symbol: 'NIFTY500 LOWVOL', value: 22868.80, change: 0.02, open: 22865.00, high: 22930.00, low: 22820.00 },
    { symbol: 'NIFTY500 MQVLV', value: 31510.25, change: 0.11, open: 31475.00, high: 31580.00, low: 31440.00 },
    { symbol: 'NIFTY500 FLEXI', value: 10589.85, change: 0.78, open: 10510.00, high: 10610.00, low: 10500.00 },
    { symbol: 'NIFTY TMMQ 50', value: 41383.60, change: -0.38, open: 41540.00, high: 41600.00, low: 41300.00 },
    { symbol: 'NIFTY500MOMENTUM', value: 52078.80, change: 0.09, open: 51979.20, high: 52529.35, low: 51942.80 },
    { symbol: 'NIFTYMS400 MQ', value: 47114.30, change: 0.23, open: 47010.00, high: 47200.00, low: 46950.00 },
    { symbol: 'NIFTYSML250MQ', value: 42997.20, change: -0.29, open: 43120.00, high: 43200.00, low: 42900.00 },
    { symbol: 'NIFTY TOP 10 EW', value: 9694.20, change: 0.30, open: 9665.00, high: 9720.00, low: 9650.00 },
    { symbol: 'NIFTY AQL 30', value: 22550.30, change: -0.37, open: 22635.00, high: 22680.00, low: 22500.00 },
    { symbol: 'NIFTY AQLV 30', value: 21130.90, change: 0.30, open: 21070.00, high: 21180.00, low: 21050.00 },
    { symbol: 'NIFTY HIGHBETA', value: 3914.50, change: -0.23, open: 3925.00, high: 3940.00, low: 3900.00 },
    { symbol: 'NIFTY LOW VOL 50', value: 25450.90, change: 0.03, open: 25445.00, high: 25520.00, low: 25400.00 },
    { symbol: 'NIFTY QLTY LV 30', value: 17406.50, change: -0.17, open: 17440.00, high: 17480.00, low: 17370.00 },
    { symbol: 'NIFTY SML250 Q50', value: 24949.50, change: 0.21, open: 24900.00, high: 25020.00, low: 24870.00 },
    { symbol: 'NIFTY TOP 15 EW', value: 10780.50, change: 0.24, open: 10755.00, high: 10810.00, low: 10740.00 },
    { symbol: 'NIFTY100 ALPHA', value: 17857.70, change: -0.21, open: 17895.00, high: 17940.00, low: 17820.00 },
    { symbol: 'NIFTY200 VALUE', value: 15081.40, change: 0.62, open: 14990.00, high: 15110.00, low: 14970.00 },
    { symbol: 'NIFTY500 EW', value: 13899.10, change: -0.36, open: 13950.00, high: 13980.00, low: 13860.00 },
    { symbol: 'NIFTY MULTI MQ', value: 41034.70, change: -0.12, open: 41085.00, high: 41150.00, low: 40980.00 },
    { symbol: 'NIFTY500 VALUE', value: 15854.75, change: 0.20, open: 15825.00, high: 15890.00, low: 15800.00 },
    { symbol: 'NIFTY TOP 20 EW', value: 9530.10, change: -0.01, open: 9532.00, high: 9565.00, low: 9510.00 },
    { symbol: 'NIFTY GROWSECT', value: 12478.95, change: 0.55, open: 12410.00, high: 12510.00, low: 12395.00 },
  ],
};

// Commodity prices (Gold, Silver, Platinum in INR)
export const commodityPrices = {
  gold: { symbol: 'GOLD', price: 78450, change: 0.45, unit: '10g' },
  silver: { symbol: 'SILVER', price: 92500, change: 0.82, unit: 'kg' },
  platinum: { symbol: 'PLATINUM', price: 31200, change: -0.15, unit: '10g' },
};

// Get color based on percentage change (NSE style)
export function getChangeColor(change) {
  if (change >= 3) return '#2e7d32';
  if (change >= 1) return '#4caf50';
  if (change >= 0) return '#81c784';
  if (change >= -1) return '#ef9a9a';
  if (change >= -3) return '#e57373';
  return '#c62828';
}

// Get background color for tiles
export function getTileColor(change) {
  if (change >= 3) return '#1b5e20';
  if (change >= 1) return '#2e7d32';
  if (change >= 0.01) return '#4caf50';
  if (change >= -0.01) return '#81c784';
  if (change >= -1) return '#ef5350';
  if (change >= -3) return '#d32f2f';
  return '#b71c1c';
}

// Format number with Indian locale
export function formatNumber(num) {
  return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Format percentage
export function formatPercent(num) {
  return `${num.toFixed(2)}%`;
}

// Format currency for commodities
export function formatCurrency(num) {
  return '₹' + num.toLocaleString('en-IN');
}
