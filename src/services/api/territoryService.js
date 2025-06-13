import { toast } from 'react-toastify';

class TerritoryService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const params = {
        Fields: ['Name', 'controlling_empire', 'happiness', 'development', 'cultures', 'neighbors', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.fetchRecords('territory', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching territories:", error);
      toast.error("Failed to load territories");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: ['Name', 'controlling_empire', 'happiness', 'development', 'cultures', 'neighbors', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.getRecordById('territory', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching territory with ID ${id}:`, error);
      toast.error("Failed to load territory");
      return null;
    }
  }

  async update(id, data) {
    try {
      // Only include updateable fields
      const updateableData = {
        Id: id
      };
      
      if (data.Name !== undefined) updateableData.Name = data.Name;
      if (data.controlling_empire !== undefined) updateableData.controlling_empire = parseInt(data.controlling_empire);
      if (data.happiness !== undefined) updateableData.happiness = data.happiness;
      if (data.development !== undefined) updateableData.development = data.development;
      if (data.cultures !== undefined) updateableData.cultures = data.cultures;
      if (data.neighbors !== undefined) updateableData.neighbors = data.neighbors;
      if (data.Tags !== undefined) updateableData.Tags = data.Tags;
      if (data.Owner !== undefined) updateableData.Owner = parseInt(data.Owner);
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.updateRecord('territory', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      console.error("Error updating territory:", error);
      throw error;
    }
  }

  async getByEmpire(empireId) {
    try {
      const params = {
        Fields: ['Name', 'controlling_empire', 'happiness', 'development', 'cultures', 'neighbors'],
        where: [
          {
            FieldName: "controlling_empire",
            Operator: "ExactMatch",
            Values: [empireId.toString()]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('territory', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching territories by empire:", error);
      return [];
    }
  }

  async influenceTerritory(territoryId, cultureId, influence) {
    try {
      const territory = await this.getById(territoryId);
      if (!territory) throw new Error('Territory not found');

      let cultures = territory.cultures || [];
      
      // Parse cultures if it's a string
      if (typeof cultures === 'string') {
        try {
          cultures = JSON.parse(cultures);
        } catch (e) {
          cultures = [];
        }
      }

      const cultureInfluence = cultures.find(c => c.cultureId === cultureId);
      if (cultureInfluence) {
        cultureInfluence.influence = Math.min(100, cultureInfluence.influence + influence);
      } else {
        cultures.push({ cultureId, influence: Math.min(100, influence) });
      }

      return await this.update(territoryId, { cultures: JSON.stringify(cultures) });
    } catch (error) {
      console.error("Error influencing territory:", error);
      throw error;
    }
  }
}

export default new TerritoryService();