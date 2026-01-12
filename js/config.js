/**
 * CONFIG - Global configuration object for the Carbon Calculator
 *
 * Contains emission factors, transport mode metadata, carbon credit settings,
 * and utility functions for distance autofill functionality.
 */

window.CONFIG = {
  // Emission factors in kg CO2 per km for different transport modes
  EMISSION_FACTORS: {
    bicycle: 0,
    car: 0.12,
    bus: 0.089,
    truck: 0.27
  },

  // Transport mode metadata with Portuguese labels, icons, and colors
  TRANSPORT_MODES: {
    bicycle: {
      label: "Bicicleta",
      icon: "🚲",
      color: "#10b981" // primary green
    },
    car: {
      label: "Carro",
      icon: "🚗",
      color: "#3b82f6" // info blue
    },
    bus: {
      label: "Ônibus",
      icon: "🚌",
      color: "#f59e0b" // warning orange
    },
    truck: {
      label: "Caminhão",
      icon: "🚚",
      color: "#ef4444" // danger red
    }
  },

  // Carbon credit configuration
  CARBON_CREDIT: {
    KG_PER_CREDIT: 1000,
    PRICE_MIN_BRL: 50,
    PRICE_MAX_BRL: 150
  },

  /**
   * Sets up automatic distance filling based on origin and destination selection
   * Adds event listeners to handle route lookup and manual distance input toggle
   */
  setupDistanceAutofill: function() {
    // Get DOM elements
    const originInput = document.getElementById('origin');
    const destinationInput = document.getElementById('destination');
    const distanceInput = document.getElementById('distance');
    const manualCheckbox = document.getElementById('manual-distance');
    const helperText = document.querySelector('.calculator-form__helper');

    // Function to handle route lookup
    const handleRouteLookup = () => {
      const origin = originInput.value.trim();
      const destination = destinationInput.value.trim();

      if (origin && destination) {
        const distance = RoutesDB.findDistance(origin, destination);

        if (distance !== null) {
          // Route found - fill distance and make readonly
          distanceInput.value = distance;
          distanceInput.readOnly = true;
          helperText.textContent = "Distância encontrada automaticamente";
          helperText.style.color = "var(--primary)"; // Green success color
          manualCheckbox.checked = false;
        } else {
          // Route not found - clear distance and suggest manual input
          distanceInput.value = '';
          distanceInput.readOnly = true;
          helperText.textContent = "Rota não encontrada. Marque para inserir manualmente.";
          helperText.style.color = "var(--warning)"; // Warning color
          manualCheckbox.checked = false;
        }
      }
    };

    // Function to handle manual distance toggle
    const handleManualToggle = () => {
      if (manualCheckbox.checked) {
        // Allow manual input
        distanceInput.readOnly = false;
        distanceInput.focus();
        helperText.textContent = "Insira a distância manualmente em km";
        helperText.style.color = "var(--text-light)";
      } else {
        // Try to find route again
        handleRouteLookup();
      }
    };

    // Add event listeners
    originInput.addEventListener('change', handleRouteLookup);
    destinationInput.addEventListener('change', handleRouteLookup);
    manualCheckbox.addEventListener('change', handleManualToggle);

    // Initial setup
    distanceInput.readOnly = true;
  }
};