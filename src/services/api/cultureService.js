import { toast } from 'react-toastify';

class CultureService {
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
        Fields: ['Name', 'description', 'happiness', 'innovation', 'traditions', 'empire_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.fetchRecords('culture', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching cultures:", error);
      toast.error("Failed to load cultures");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: ['Name', 'description', 'happiness', 'innovation', 'traditions', 'empire_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.getRecordById('culture', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching culture with ID ${id}:`, error);
      toast.error("Failed to load culture");
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
      if (data.description !== undefined) updateableData.description = data.description;
      if (data.happiness !== undefined) updateableData.happiness = data.happiness;
      if (data.innovation !== undefined) updateableData.innovation = data.innovation;
      if (data.traditions !== undefined) updateableData.traditions = data.traditions;
      if (data.empire_id !== undefined) updateableData.empire_id = parseInt(data.empire_id);
      if (data.Tags !== undefined) updateableData.Tags = data.Tags;
      if (data.Owner !== undefined) updateableData.Owner = parseInt(data.Owner);
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.updateRecord('culture', params);
      
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
      console.error("Error updating culture:", error);
      throw error;
    }
  }

  async getByEmpire(empireId) {
    try {
      const params = {
        Fields: ['Name', 'description', 'happiness', 'innovation', 'traditions', 'empire_id'],
        where: [
          {
            FieldName: "empire_id",
            Operator: "ExactMatch",
            Values: [empireId.toString()]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('culture', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching cultures by empire:", error);
      return [];
    }
  }

  async adjustHappiness(cultureId, change) {
    try {
      const culture = await this.getById(cultureId);
      if (!culture) throw new Error('Culture not found');
      
      const newHappiness = Math.max(0, Math.min(100, culture.happiness + change));
      return await this.update(cultureId, { happiness: newHappiness });
    } catch (error) {
      console.error("Error adjusting happiness:", error);
      throw error;
    }
  }

  async innovate(cultureId) {
    try {
      const culture = await this.getById(cultureId);
      if (!culture) throw new Error('Culture not found');
      
      const newInnovation = Math.min(100, culture.innovation + 5 + Math.random() * 10);
      return await this.update(cultureId, { innovation: newInnovation });
    } catch (error) {
      console.error("Error innovating culture:", error);
      throw error;
    }
  }
}

export default new CultureService();