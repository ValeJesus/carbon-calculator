/**
 * UI - User interface management functions
 */

window.UI = {
  /**
   * Populates the cities datalist with available cities
   */
  populateCitiesList: function() {
    const datalist = document.getElementById('cities-list');
    if (!datalist) return;

    const cities = RoutesDB.getAllCities();
    datalist.innerHTML = '';

    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      datalist.appendChild(option);
    });
  },

  /**
   * Shows the results section with emission calculations
   */
  showResults: function(distance, transportMode, emissions) {
    const resultsSection = document.getElementById('results');
    const resultsContent = document.getElementById('results-content');

    if (!resultsSection || !resultsContent) return;

    const modeData = CONFIG.TRANSPORT_MODES[transportMode];
    const formattedEmissions = Calculator.formatNumber(emissions, 2);
    const tip = FeaturesData.getRandomTip(transportMode);

    resultsContent.innerHTML = `
      <div class="result-card">
        <h3>Resultado da Calculadora</h3>
        <div class="result-details">
          <p><strong>Distância:</strong> ${Calculator.formatNumber(distance, 0)} km</p>
          <p><strong>Modo de transporte:</strong> ${modeData.icon} ${modeData.label}</p>
          <p><strong>Emissões de CO2:</strong> ${formattedEmissions} kg</p>
          <div class="emission-bar" style="background: linear-gradient(90deg, ${modeData.color} ${Math.min(emissions / 10, 100)}%, #e5e7eb 0%)">
            <span class="emission-value">${formattedEmissions} kg CO2</span>
          </div>
        </div>
        ${tip ? `<div class="eco-tip"><strong>Dica ecológica:</strong> ${tip}</div>` : ''}
      </div>
    `;

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  },

  /**
   * Shows the comparison section with emissions for all transport modes
   */
  showComparison: function(distance) {
    const comparisonSection = document.getElementById('comparison');
    const comparisonContent = document.getElementById('comparison-content');

    if (!comparisonSection || !comparisonContent) return;

    const allEmissions = Calculator.calculateAllEmissions(distance);
    const ecoMode = Calculator.getEcoFriendlyMode(distance);

    let comparisonHTML = `
      <div class="comparison-card">
        <h3>Comparação de Emissões</h3>
        <p>Veja quanto CO2 cada modo de transporte emite para ${Calculator.formatNumber(distance, 0)} km:</p>
        <div class="comparison-grid">
    `;

    Object.entries(allEmissions).forEach(([mode, emissions]) => {
      const modeData = CONFIG.TRANSPORT_MODES[mode];
      const isEco = mode === ecoMode;
      const percentage = emissions > 0 ? Math.min((emissions / Math.max(...Object.values(allEmissions))) * 100, 100) : 0;

      comparisonHTML += `
        <div class="comparison-item ${isEco ? 'eco-friendly' : ''}">
          <div class="mode-header">
            <span class="mode-icon">${modeData.icon}</span>
            <span class="mode-label">${modeData.label}</span>
            ${isEco ? '<span class="eco-badge">Mais Ecológico</span>' : ''}
          </div>
          <div class="emission-display">
            <span class="emission-number">${Calculator.formatNumber(emissions, 2)} kg</span>
            <div class="emission-bar" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    });

    comparisonHTML += `
        </div>
        <p class="comparison-note">* Comparação baseada em fatores de emissão padrão</p>
      </div>
    `;

    comparisonContent.innerHTML = comparisonHTML;
    comparisonSection.classList.remove('hidden');
  },

  /**
   * Shows the carbon credits section
   */
  showCarbonCredits: function(emissions) {
    const creditsSection = document.getElementById('carbon-credits');
    const creditsContent = document.getElementById('carbon-credits-content');

    if (!creditsSection || !creditsContent) return;

    const creditsNeeded = Calculator.getCarbonCreditsNeeded(emissions);
    const cost = Calculator.calculateCreditCost(creditsNeeded);
    const formattedCost = Calculator.formatCurrency(cost);

    creditsContent.innerHTML = `
      <div class="credits-card">
        <h3>Compensação de Carbono</h3>
        <div class="credits-info">
          <p>Para compensar ${Calculator.formatNumber(emissions, 2)} kg de CO2, você precisaria de:</p>
          <div class="credits-summary">
            <div class="credit-amount">
              <span class="number">${creditsNeeded}</span>
              <span class="label">créditos de carbono</span>
            </div>
            <div class="credit-cost">
              <span class="cost">${formattedCost}</span>
              <span class="cost-note">(estimativa)</span>
            </div>
          </div>
          <div class="impact-info">
            <p><strong>Fato interessante:</strong> ${FeaturesData.impactInfo.co2Equivalent}</p>
          </div>
        </div>
      </div>
    `;

    creditsSection.classList.remove('hidden');
  },

  /**
   * Hides all result sections
   */
  hideResults: function() {
    const sections = ['results', 'comparison', 'carbon-credits'];
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        section.classList.add('hidden');
      }
    });
  },

  /**
   * Shows an error message
   */
  showError: function(message) {
    // Simple alert for now - could be enhanced with a proper error UI
    alert(`Erro: ${message}`);
  }
};