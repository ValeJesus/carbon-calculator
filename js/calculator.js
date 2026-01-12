/**
 * Calculator - Core calculation logic for CO2 emissions and carbon credits
 *
 * Provides functions to calculate emissions, carbon credits needed, and costs.
 */

window.Calculator = {
  /**
   * Calculates total CO2 emissions for a trip
   * @param {number} distanceKm - Distance in kilometers
   * @param {string} transportMode - Transport mode (bicycle, car, bus, truck)
   * @returns {number} Total CO2 emissions in kg
   */
  calculateEmissions: function(distanceKm, transportMode) {
    const factor = CONFIG.EMISSION_FACTORS[transportMode];
    if (!factor) {
      throw new Error(`Unknown transport mode: ${transportMode}`);
    }
    return distanceKm * factor;
  },

  /**
   * Calculates the number of carbon credits needed to offset emissions
   * @param {number} emissionsKg - CO2 emissions in kg
   * @returns {number} Number of carbon credits needed (rounded up)
   */
  getCarbonCreditsNeeded: function(emissionsKg) {
    const kgPerCredit = CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
    return Math.ceil(emissionsKg / kgPerCredit);
  },

  /**
   * Calculates the cost of carbon credits
   * Returns a random price between min and max per credit
   * @param {number} numCredits - Number of credits
   * @returns {number} Total cost in BRL
   */
  calculateCreditCost: function(numCredits) {
    const minPrice = CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
    const maxPrice = CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
    const pricePerCredit = Math.random() * (maxPrice - minPrice) + minPrice;
    return Math.round(numCredits * pricePerCredit * 100) / 100; // Round to 2 decimal places
  },

  /**
   * Calculates emissions for all transport modes for comparison
   * @param {number} distanceKm - Distance in kilometers
   * @returns {object} Object with transport modes as keys and emissions as values
   */
  calculateAllEmissions: function(distanceKm) {
    const emissions = {};
    Object.keys(CONFIG.EMISSION_FACTORS).forEach(mode => {
      emissions[mode] = this.calculateEmissions(distanceKm, mode);
    });
    return emissions;
  },

  /**
   * Formats a number as Brazilian currency (BRL)
   * @param {number} value - Value to format
   * @returns {string} Formatted currency string
   */
  formatCurrency: function(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  },

  /**
   * Formats a number with thousand separators for Brazilian locale
   * @param {number} value - Number to format
   * @param {number} decimals - Number of decimal places (default: 2)
   * @returns {string} Formatted number string
   */
  formatNumber: function(value, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },

  /**
   * Gets the most eco-friendly transport mode for a given distance
   * @param {number} distanceKm - Distance in kilometers
   * @returns {string} The transport mode with lowest emissions
   */
  getEcoFriendlyMode: function(distanceKm) {
    const emissions = this.calculateAllEmissions(distanceKm);
    let minEmissions = Infinity;
    let bestMode = null;

    Object.entries(emissions).forEach(([mode, emission]) => {
      if (emission < minEmissions) {
        minEmissions = emission;
        bestMode = mode;
      }
    });

    return bestMode;
  }
};