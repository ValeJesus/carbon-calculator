/**
 * App - Main application logic
 */

window.App = {
  /**
   * Initializes the application
   */
  init: function() {
    // Populate cities datalist
    UI.populateCitiesList();

    // Setup distance autofill
    CONFIG.setupDistanceAutofill();

    // Setup form submission
    this.setupFormSubmission();

    console.log('Carbon Calculator initialized');
  },

  /**
   * Sets up form submission event listener
   */
  setupFormSubmission: function() {
    const form = document.getElementById('calculator-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleCalculation();
    });
  },

  /**
   * Handles the calculation when form is submitted
   */
  handleCalculation: function() {
    try {
      // Show loading
      Loading.show();

      // Get form values
      const origin = document.getElementById('origin').value.trim();
      const destination = document.getElementById('destination').value.trim();
      const distance = parseFloat(document.getElementById('distance').value);
      const transportMode = document.querySelector('input[name="transport"]:checked');

      // Validate inputs
      if (!origin || !destination) {
        throw new Error('Por favor, selecione origem e destino.');
      }

      if (isNaN(distance) || distance <= 0) {
        throw new Error('Por favor, insira uma distância válida.');
      }

      if (!transportMode) {
        throw new Error('Por favor, selecione um modo de transporte.');
      }

      const mode = transportMode.value;

      // Calculate emissions
      const emissions = Calculator.calculateEmissions(distance, mode);

      // Hide loading
      Loading.hide();

      // Hide previous results
      UI.hideResults();

      // Show results after a short delay for better UX
      setTimeout(() => {
        UI.showResults(distance, mode, emissions);
        UI.showComparison(distance);
        UI.showCarbonCredits(emissions);
      }, 300);

    } catch (error) {
      Loading.hide();
      UI.showError(error.message);
    }
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});