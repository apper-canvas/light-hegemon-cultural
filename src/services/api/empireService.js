import empires from '../mockData/empires.json';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class EmpireService {
  constructor() {
    this.empires = [...empires];
  }

  async getAll() {
    await delay(250);
    return [...this.empires];
  }

  async getById(id) {
    await delay(200);
    const empire = this.empires.find(e => e.id === id);
    return empire ? { ...empire } : null;
  }

  async update(id, data) {
    await delay(200);
    const index = this.empires.findIndex(e => e.id === id);
    if (index !== -1) {
      this.empires[index] = { ...this.empires[index], ...data };
      return { ...this.empires[index] };
    }
    throw new Error('Empire not found');
  }

  async getPlayerEmpire() {
    await delay(200);
    return this.empires.find(e => e.isPlayer) || this.empires[0];
  }

  async spendCulturePoints(empireId, points) {
    await delay(200);
    const empire = this.empires.find(e => e.id === empireId);
    if (!empire) throw new Error('Empire not found');
    if (empire.culturePoints < points) throw new Error('Insufficient culture points');
    
    empire.culturePoints -= points;
    return { ...empire };
  }

  async addCulturePoints(empireId, points) {
    await delay(200);
    const empire = this.empires.find(e => e.id === empireId);
    if (!empire) throw new Error('Empire not found');
    
    empire.culturePoints += points;
    return { ...empire };
  }

  async updateDiplomacy(empireId, targetEmpireId, relation) {
    await delay(250);
    const empire = this.empires.find(e => e.id === empireId);
    if (!empire) throw new Error('Empire not found');
    
    empire.diplomacy[targetEmpireId] = relation;
    return { ...empire };
  }
}

export default new EmpireService();