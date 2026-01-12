/**
 * RoutesDB - Database of Brazilian routes and distances
 *
 * This global object contains route data for popular Brazilian cities and provides
 * utility methods for accessing city lists and finding distances between cities.
 *
 * Structure:
 * - routes: Array of route objects with properties:
 *   - origin: String (city name with state, e.g., "São Paulo, SP")
 *   - destination: String (city name with state)
 *   - distanceKm: Number (distance in kilometers)
 *
 * Methods:
 * - getAllCities(): Returns sorted array of unique city names
 * - findDistance(origin, destination): Returns distance between cities or null
 */

// Global RoutesDB object
window.RoutesDB = {
  // Array of route objects containing Brazilian city connections
  routes: [
    // Capital to capital connections
    { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
    { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
    { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
    { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
    { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
    { origin: "Brasília, DF", destination: "Belo Horizonte, MG", distanceKm: 716 },
    { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
    { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1649 },
    { origin: "Brasília, DF", destination: "Salvador, BA", distanceKm: 1446 },
    { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2653 },
    { origin: "Rio de Janeiro, RJ", destination: "Recife, PE", distanceKm: 2340 },
    { origin: "Brasília, DF", destination: "Recife, PE", distanceKm: 2205 },
    { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1109 },
    { origin: "Rio de Janeiro, RJ", destination: "Porto Alegre, RS", distanceKm: 1554 },
    { origin: "Brasília, DF", destination: "Porto Alegre, RS", distanceKm: 2027 },
    { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
    { origin: "Rio de Janeiro, RJ", destination: "Curitiba, PR", distanceKm: 852 },
    { origin: "Brasília, DF", destination: "Curitiba, PR", distanceKm: 1368 },
    { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3120 },
    { origin: "Rio de Janeiro, RJ", destination: "Fortaleza, CE", distanceKm: 2807 },
    { origin: "Brasília, DF", destination: "Fortaleza, CE", distanceKm: 2200 },
    { origin: "São Paulo, SP", destination: "Manaus, AM", distanceKm: 3939 },
    { origin: "Rio de Janeiro, RJ", destination: "Manaus, AM", distanceKm: 3626 },
    { origin: "Brasília, DF", destination: "Manaus, AM", distanceKm: 2933 },

    // Major regional routes
    { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
    { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
    { origin: "Belo Horizonte, MG", destination: "Ouro Preto, MG", distanceKm: 100 },
    { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
    { origin: "Rio de Janeiro, RJ", destination: "Angra dos Reis, RJ", distanceKm: 156 },
    { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
    { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
    { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 522 },
    { origin: "Belo Horizonte, MG", destination: "Juiz de Fora, MG", distanceKm: 260 },
    { origin: "Porto Alegre, RS", destination: "Gramado, RS", distanceKm: 115 },
    { origin: "Curitiba, PR", destination: "Foz do Iguaçu, PR", distanceKm: 630 },
    { origin: "Salvador, BA", destination: "Feira de Santana, BA", distanceKm: 108 },
    { origin: "Recife, PE", destination: "Olinda, PE", distanceKm: 7 },
    { origin: "Fortaleza, CE", destination: "Caucaia, CE", distanceKm: 20 },
    { origin: "Manaus, AM", destination: "Manacapuru, AM", distanceKm: 68 }
  ],

  /**
   * Returns a sorted array of unique city names from all routes
   * Extracts cities from both origin and destination fields
   * @returns {string[]} Sorted array of unique city names
   */
  getAllCities: function() {
    const cities = new Set();

    this.routes.forEach(route => {
      cities.add(route.origin);
      cities.add(route.destination);
    });

    return Array.from(cities).sort();
  },

  /**
   * Finds the distance between two cities
   * Searches in both directions (origin-destination and destination-origin)
   * Normalizes input by trimming whitespace and converting to lowercase
   * @param {string} origin - Origin city name
   * @param {string} destination - Destination city name
   * @returns {number|null} Distance in km if found, null otherwise
   */
  findDistance: function(origin, destination) {
    // Normalize input
    const normalizedOrigin = origin.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();

    // Search for direct route
    const directRoute = this.routes.find(route =>
      route.origin.toLowerCase() === normalizedOrigin &&
      route.destination.toLowerCase() === normalizedDestination
    );

    if (directRoute) {
      return directRoute.distanceKm;
    }

    // Search for reverse route
    const reverseRoute = this.routes.find(route =>
      route.origin.toLowerCase() === normalizedDestination &&
      route.destination.toLowerCase() === normalizedOrigin
    );

    if (reverseRoute) {
      return reverseRoute.distanceKm;
    }

    // Route not found
    return null;
  }
};