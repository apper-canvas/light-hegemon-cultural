import territories from '../mockData/territories.json';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class TerritoryService {
  constructor() {
    this.territories = [...territories];
  }

  async getAll() {
    await delay(300);
    return [...this.territories];
  }

  async getById(id) {
    await delay(200);
    const territory = this.territories.find(t => t.id === id);
    return territory ? { ...territory } : null;
  }

  async update(id, data) {
    await delay(250);
    const index = this.territories.findIndex(t => t.id === id);
    if (index !== -1) {
      this.territories[index] = { ...this.territories[index], ...data };
      return { ...this.territories[index] };
    }
    throw new Error('Territory not found');
  }

  async getByEmpire(empireId) {
    await delay(200);
    return this.territories.filter(t => t.controllingEmpire === empireId);
  }

  async influenceTerritory(territoryId, cultureId, influence) {
    await delay(300);
    const territory = this.territories.find(t => t.id === territoryId);
    if (!territory) throw new Error('Territory not found');

    const cultureInfluence = territory.cultures.find(c => c.cultureId === cultureId);
    if (cultureInfluence) {
      cultureInfluence.influence = Math.min(100, cultureInfluence.influence + influence);
    } else {
      territory.cultures.push({ cultureId, influence: Math.min(100, influence) });
    }

    return { ...territory };
  }
}

export default new TerritoryService();