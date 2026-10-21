const countries = [
  {
    country: 'Pakistan',
    flag: '🇵🇰',
    regular: 1.18,
    premium: 1.41,
    diesel: 1.09,
    updated: 'Today, 08:15',
    trend: [1.08, 1.1, 1.13, 1.14, 1.15, 1.17, 1.18],
  },
  {
    country: 'India',
    flag: '🇮🇳',
    regular: 95.44,
    premium: 121.3,
    diesel: 88.6,
    updated: 'Today, 08:00',
    trend: [86, 88, 90, 92, 93, 95, 95.44],
  },
  {
    country: 'USA',
    flag: '🇺🇸',
    regular: 1.35,
    premium: 1.62,
    diesel: 1.48,
    updated: 'Today, 09:15',
    trend: [1.25, 1.27, 1.3, 1.31, 1.33, 1.34, 1.35],
  },
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    regular: 2.05,
    premium: 2.42,
    diesel: 2.18,
    updated: 'Today, 10:00',
    trend: [1.92, 1.95, 1.99, 2.01, 2.04, 2.04, 2.05],
  },
  {
    country: 'France',
    flag: '🇫🇷',
    regular: 1.82,
    premium: 2.19,
    diesel: 1.74,
    updated: 'Today, 11:20',
    trend: [1.68, 1.71, 1.75, 1.78, 1.8, 1.81, 1.82],
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    regular: 1.48,
    premium: 1.76,
    diesel: 1.57,
    updated: 'Today, 09:30',
    trend: [1.34, 1.37, 1.39, 1.42, 1.44, 1.46, 1.48],
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    regular: 1.79,
    premium: 2.06,
    diesel: 1.72,
    updated: 'Today, 12:05',
    trend: [1.62, 1.66, 1.7, 1.73, 1.76, 1.78, 1.79],
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    regular: 1.76,
    premium: 2.08,
    diesel: 1.7,
    updated: 'Today, 11:45',
    trend: [1.55, 1.6, 1.64, 1.68, 1.72, 1.75, 1.76],
  },
  {
    country: 'Russia',
    flag: '🇷🇺',
    regular: 0.92,
    premium: 1.1,
    diesel: 0.98,
    updated: 'Today, 10:40',
    trend: [0.84, 0.86, 0.88, 0.9, 0.91, 0.91, 0.92],
  },
  {
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    regular: 0.64,
    premium: 0.82,
    diesel: 0.74,
    updated: 'Today, 08:35',
    trend: [0.58, 0.59, 0.6, 0.61, 0.62, 0.63, 0.64],
  },
  {
    country: 'UAE',
    flag: '🇦🇪',
    regular: 0.71,
    premium: 0.86,
    diesel: 0.76,
    updated: 'Today, 09:10',
    trend: [0.65, 0.67, 0.68, 0.69, 0.7, 0.71, 0.71],
  },
  {
    country: 'Japan',
    flag: '🇯🇵',
    regular: 1.72,
    premium: 2.04,
    diesel: 1.48,
    updated: 'Today, 13:00',
    trend: [1.58, 1.62, 1.65, 1.69, 1.7, 1.71, 1.72],
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    regular: 1.9,
    premium: 2.22,
    diesel: 1.86,
    updated: 'Today, 12:30',
    trend: [1.72, 1.77, 1.81, 1.85, 1.88, 1.89, 1.9],
  },
];

const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const countrySelect = document.getElementById('countrySelect');
const fuelSelect = document.getElementById('fuelSelect');
const refreshBtn = document.getElementById('refreshBtn');

const selectedPrice = document.getElementById('selectedPrice');
const selectedCountryBadge = document.getElementById('selectedCountryBadge');
const avgPrice = document.getElementById('avgPrice');
const highestPrice = document.getElementById('highestPrice');
const highestCountry = document.getElementById('highestCountry');
const lowestPrice = document.getElementById('lowestPrice');
const lowestCountry = document.getElementById('lowestCountry');
const comparisonTable = document.getElementById('comparisonTable');
const trendChart = document.getElementById('trendChart');
const chartCountryName = document.getElementById('chartCountryName');
const aiInsights = document.getElementById('aiInsights');

function populateCountryOptions() {
  countries.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.country;
    option.textContent = `${entry.flag} ${entry.country}`;
    countrySelect.appendChild(option);
  });

  countrySelect.value = 'Pakistan';
}

function getSelectedCountryData() {
  const selectedCountry = countrySelect.value;
  return countries.find((entry) => entry.country === selectedCountry);
}

function getFuelKey() {
  return fuelSelect.value;
}

function getPriceForCountry(countryData, fuelType) {
  if (fuelType === 'regular') return countryData.regular;
  if (fuelType === 'premium') return countryData.premium;
  return countryData.diesel;
}

function calculateAverage() {
  const allPrices = countries.map((country) => {
    const fuelType = getFuelKey();
    return getPriceForCountry(country, fuelType);
  });

  const sum = allPrices.reduce((acc, value) => acc + value, 0);
  return sum / allPrices.length;
}

function renderStats() {
  const selected = getSelectedCountryData();
  const fuelType = getFuelKey();
  const selectedValue = getPriceForCountry(selected, fuelType);

  selectedPrice.textContent = currencyFormat.format(selectedValue);
  selectedCountryBadge.textContent = `${selected.country}`;

  const avg = calculateAverage();
  avgPrice.textContent = currencyFormat.format(avg);

  const pricesByCountry = countries.map((country) => ({
    ...country,
    value: getPriceForCountry(country, fuelType),
  }));

  const maxCountry = pricesByCountry.reduce((high, current) =>
    current.value > high.value ? current : high
  );
  const minCountry = pricesByCountry.reduce((low, current) =>
    current.value < low.value ? current : low
  );

  highestPrice.textContent = currencyFormat.format(maxCountry.value);
  highestCountry.textContent = maxCountry.country;
  lowestPrice.textContent = currencyFormat.format(minCountry.value);
  lowestCountry.textContent = minCountry.country;
}

function renderTable() {
  const fuelType = getFuelKey();
  comparisonTable.innerHTML = countries
    .map((country) => {
      const regular = country.regular;
      const premium = country.premium;
      const diesel = country.diesel;
      const rowClass = country.country === countrySelect.value ? 'style="background: rgba(24, 194, 140, 0.08);"' : '';

      return `
        <tr ${rowClass}>
          <td>
            <span class="country-pill">
              <span class="country-flag">${country.flag}</span>
              ${country.country}
            </span>
          </td>
          <td>${currencyFormat.format(regular)}</td>
          <td>${currencyFormat.format(premium)}</td>
          <td>${currencyFormat.format(diesel)}</td>
          <td>${country.updated}</td>
        </tr>
      `;
    })
    .join('');

  const selected = getSelectedCountryData();
  const rows = comparisonTable.querySelectorAll('tr');
  rows.forEach((row) => {
    const firstCell = row.querySelector('td');
    if (!firstCell) return;
    const text = firstCell.textContent.trim();
    if (text.includes(selected.country)) {
      row.style.background = 'rgba(24, 194, 140, 0.08)';
    }
  });
}

function renderChart() {
  const selected = getSelectedCountryData();
  const chartValues = selected.trend;
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const width = 640;
  const height = 260;
  const padding = 30;
  const minValue = Math.min(...chartValues) * 0.92;
  const maxValue = Math.max(...chartValues) * 1.08;

  const xStep = (width - padding * 2) / (chartValues.length - 1);

  const points = chartValues
    .map((value, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((value - minValue) / (maxValue - minValue || 1)) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${points} ${width - padding},${height - padding} ${padding},${height - padding}`;

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const y = padding + (index * (height - padding * 2)) / 4;
    return `<line x1="${padding}" x2="${width - padding}" y1="${y}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />`;
  }).join('');

  const dots = chartValues
    .map((value, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((value - minValue) / (maxValue - minValue || 1)) * (height - padding * 2);
      return `
        <circle cx="${x}" cy="${y}" r="5" fill="#8ee8c4" stroke="#0a1820" stroke-width="2" />
        <text x="${x}" y="${height - 8}" text-anchor="middle" fill="rgba(255,255,255,0.56)" font-size="10">${labels[index]}</text>
      `;
    })
    .join('');

  trendChart.innerHTML = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="${selected.country} fuel trend chart">
      ${gridLines}
      <polygon points="${areaPoints}" fill="rgba(30, 210, 159, 0.18)"></polygon>
      <polyline points="${points}" fill="none" stroke="#64f3c5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${dots}
    </svg>
  `;

  chartCountryName.textContent = selected.country;
}

function renderInsights() {
  const selected = getSelectedCountryData();
  const fuelType = getFuelKey();
  const selectedValue = getPriceForCountry(selected, fuelType);
  const avg = calculateAverage();
  const difference = selectedValue - avg;
  const direction = difference > 0 ? 'above' : 'below';
  const levelText = difference > 0 ? 'higher' : 'lower';

  const topCountry = countries.reduce((win, item) => {
    const itemVal = getPriceForCountry(item, fuelType);
    return itemVal > getPriceForCountry(win, fuelType) ? item : win;
  }, countries[0]);

  const insightItems = [
    `${selected.country} is ${Math.abs(difference).toFixed(2)} ${currencyFormat.format(0).replace('$', '')} ${direction} the regional average for ${fuelType} fuel.`,
    `${topCountry.country} currently holds the highest market price for ${fuelType} at ${currencyFormat.format(getPriceForCountry(topCountry, fuelType))}.`,
    `This market remains ${levelText} than the current average, indicating a ${difference > 0 ? 'premium' : 'competitive'} pricing position.`,
  ];

  aiInsights.innerHTML = insightItems
    .map(
      (item) => `
        <div class="insight-item">
          <span class="insight-dot"></span>
          <p>${item}</p>
        </div>
      `
    )
    .join('');
}

function refreshDashboard() {
  renderStats();
  renderTable();
  renderChart();
  renderInsights();
}

countrySelect.addEventListener('change', refreshDashboard);
fuelSelect.addEventListener('change', refreshDashboard);
refreshBtn.addEventListener('click', () => {
  countries.forEach((country) => {
    const fuelType = getFuelKey();
    const randomShift = (Math.random() - 0.5) * 0.2;
    country[fuelType] = Number((country[fuelType] + randomShift).toFixed(2));
    country.updated = `Updated just now`;
  });
  refreshDashboard();
});

populateCountryOptions();
refreshDashboard();
