/**
 * FeaturesData - Additional data for calculator features and tips
 */

window.FeaturesData = {
  // Eco tips for different transport modes
  ecoTips: {
    bicycle: [
      "Pedalar reduz emissões de CO2 em 100% comparado a veículos motorizados",
      "Melhora sua saúde cardiovascular",
      "Não contribui para congestionamentos urbanos"
    ],
    car: [
      "Considere caronas para reduzir emissões por passageiro",
      "Mantenha pneus calibrados para melhor eficiência",
      "Evite acelerações bruscas e frenagens"
    ],
    bus: [
      "Transporte público é mais eficiente que carros individuais",
      "Reduz congestionamento nas cidades",
      "Opção econômica para viagens longas"
    ],
    truck: [
      "Para cargas pesadas, considere consolidação de fretes",
      "Otimize rotas para reduzir quilometragem",
      "Considere veículos elétricos quando disponíveis"
    ]
  },

  // Environmental impact information
  impactInfo: {
    co2Equivalent: "1 tonelada de CO2 equivale a plantar cerca de 40 árvores por ano",
    globalWarming: "O transporte responde por cerca de 14% das emissões globais de gases de efeito estufa",
    brazilTransport: "No Brasil, o transporte é responsável por aproximadamente 30% das emissões de CO2"
  },

  // Random motivational messages
  getRandomTip: function(transportMode) {
    const tips = this.ecoTips[transportMode] || [];
    if (tips.length === 0) return "";
    return tips[Math.floor(Math.random() * tips.length)];
  }
};