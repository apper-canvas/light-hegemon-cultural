import greatWorks from '../mockData/greatWorks.json';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class GreatWorkService {
  constructor() {
    this.greatWorks = [...greatWorks];
  }

  async getAll() {
    await delay(200);
    return [...this.greatWorks];
  }

  async getById(id) {
    await delay(150);
    const work = this.greatWorks.find(w => w.id === id);
    return work ? { ...work } : null;
  }

  async create(workData) {
    await delay(300);
    const newWork = {
      ...workData,
      id: Date.now().toString(),
      progress: 0
    };
    this.greatWorks.push(newWork);
    return { ...newWork };
  }

  async update(id, data) {
    await delay(200);
    const index = this.greatWorks.findIndex(w => w.id === id);
    if (index !== -1) {
      this.greatWorks[index] = { ...this.greatWorks[index], ...data };
      return { ...this.greatWorks[index] };
    }
    throw new Error('Great Work not found');
  }

  async addProgress(id, progressPoints) {
    await delay(250);
    const work = this.greatWorks.find(w => w.id === id);
    if (!work) throw new Error('Great Work not found');
    
    work.progress = Math.min(100, work.progress + progressPoints);
    return { ...work };
  }

  async getByCulture(cultureId) {
    await delay(200);
    return this.greatWorks.filter(w => w.culture === cultureId);
  }

  async getCompleted() {
    await delay(200);
    return this.greatWorks.filter(w => w.progress >= 100);
  }
}

export default new GreatWorkService();