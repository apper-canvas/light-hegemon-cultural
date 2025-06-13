import cultures from '../mockData/cultures.json';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class CultureService {
  constructor() {
    this.cultures = [...cultures];
  }

  async getAll() {
    await delay(200);
    return [...this.cultures];
  }

  async getById(id) {
    await delay(150);
    const culture = this.cultures.find(c => c.id === id);
    return culture ? { ...culture } : null;
  }

  async update(id, data) {
    await delay(200);
    const index = this.cultures.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cultures[index] = { ...this.cultures[index], ...data };
      return { ...this.cultures[index] };
    }
    throw new Error('Culture not found');
  }

  async getByEmpire(empireId) {
    await delay(200);
    // Filter cultures that exist in territories controlled by the empire
    return this.cultures.filter(c => c.empireId === empireId);
  }

  async adjustHappiness(cultureId, change) {
    await delay(200);
    const culture = this.cultures.find(c => c.id === cultureId);
    if (!culture) throw new Error('Culture not found');
    
    culture.happiness = Math.max(0, Math.min(100, culture.happiness + change));
    return { ...culture };
  }

  async innovate(cultureId) {
    await delay(250);
    const culture = this.cultures.find(c => c.id === cultureId);
    if (!culture) throw new Error('Culture not found');
    
    culture.innovation = Math.min(100, culture.innovation + 5 + Math.random() * 10);
    return { ...culture };
  }
}

export default new CultureService();