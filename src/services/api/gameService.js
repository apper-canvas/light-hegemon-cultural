const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class GameService {
  constructor() {
    this.gameState = {
      currentTurn: 1,
      selectedTerritory: null,
      gamePhase: 'playing', // playing, victory, defeat
      victoryCondition: null,
      lastTurnEvents: []
    };
  }

  async getGameState() {
    await delay(200);
    return { ...this.gameState };
  }

  async nextTurn() {
    await delay(400);
    this.gameState.currentTurn++;
    this.gameState.lastTurnEvents = this.generateTurnEvents();
    return { ...this.gameState };
  }

  async selectTerritory(territoryId) {
    await delay(100);
    this.gameState.selectedTerritory = territoryId;
    return { ...this.gameState };
  }

  async checkVictoryConditions(playerEmpire, territories, cultures) {
    await delay(300);
    
    // Cultural Dominance Victory
    const playerTerritories = territories.filter(t => t.controllingEmpire === playerEmpire.id);
    const totalTerritories = territories.length;
    const culturalDominance = (playerTerritories.length / totalTerritories) * 100;
    
    if (culturalDominance >= 60) {
      this.gameState.gamePhase = 'victory';
      this.gameState.victoryCondition = 'cultural-dominance';
      return { victory: true, condition: 'cultural-dominance', score: culturalDominance };
    }

    // Great Works Victory (simplified)
    if (playerEmpire.completedGreatWorks >= 3) {
      this.gameState.gamePhase = 'victory';
      this.gameState.victoryCondition = 'great-works';
      return { victory: true, condition: 'great-works', score: playerEmpire.completedGreatWorks };
    }

    return { victory: false, culturalDominance, greatWorks: playerEmpire.completedGreatWorks || 0 };
  }

  generateTurnEvents() {
    const events = [
      "Cultural drift observed between neighboring territories",
      "Innovation breakthrough in one of your cultures",
      "Diplomatic tensions rising with rival empire",
      "Cultural happiness fluctuations reported",
      "New trade routes established, boosting cultural exchange"
    ];
    
    return [events[Math.floor(Math.random() * events.length)]];
  }

  async saveGame() {
    await delay(500);
    // In a real implementation, this would save to localStorage or server
    return true;
  }

  async loadGame() {
    await delay(500);
    // In a real implementation, this would load from localStorage or server
    return { ...this.gameState };
  }
}

export default new GameService();