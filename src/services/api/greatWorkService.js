import { toast } from 'react-toastify';

class GreatWorkService {
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
        Fields: ['Name', 'description', 'cost', 'progress', 'culture', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.fetchRecords('great_work', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching great works:", error);
      toast.error("Failed to load great works");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: ['Name', 'description', 'cost', 'progress', 'culture', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.getRecordById('great_work', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching great work with ID ${id}:`, error);
      toast.error("Failed to load great work");
      return null;
    }
  }

  async create(workData) {
    try {
      // Only include updateable fields
      const createData = {
        progress: 0 // Default progress
      };
      
      if (workData.Name !== undefined) createData.Name = workData.Name;
      if (workData.description !== undefined) createData.description = workData.description;
      if (workData.cost !== undefined) createData.cost = workData.cost;
      if (workData.culture !== undefined) createData.culture = parseInt(workData.culture);
      if (workData.Tags !== undefined) createData.Tags = workData.Tags;
      if (workData.Owner !== undefined) createData.Owner = parseInt(workData.Owner);
      
      const params = {
        records: [createData]
      };
      
      const response = await this.apperClient.createRecord('great_work', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error creating great work:", error);
      throw error;
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
      if (data.cost !== undefined) updateableData.cost = data.cost;
      if (data.progress !== undefined) updateableData.progress = data.progress;
      if (data.culture !== undefined) updateableData.culture = parseInt(data.culture);
      if (data.Tags !== undefined) updateableData.Tags = data.Tags;
      if (data.Owner !== undefined) updateableData.Owner = parseInt(data.Owner);
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.updateRecord('great_work', params);
      
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
      console.error("Error updating great work:", error);
      throw error;
    }
  }

  async addProgress(id, progressPoints) {
    try {
      const work = await this.getById(id);
      if (!work) throw new Error('Great Work not found');
      
      const newProgress = Math.min(100, work.progress + progressPoints);
      return await this.update(id, { progress: newProgress });
    } catch (error) {
      console.error("Error adding progress:", error);
      throw error;
    }
  }

  async getByCulture(cultureId) {
    try {
      const params = {
        Fields: ['Name', 'description', 'cost', 'progress', 'culture'],
        where: [
          {
            FieldName: "culture",
            Operator: "ExactMatch",
            Values: [cultureId.toString()]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('great_work', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching great works by culture:", error);
      return [];
    }
  }

  async getCompleted() {
    try {
      const params = {
        Fields: ['Name', 'description', 'cost', 'progress', 'culture'],
        where: [
          {
            FieldName: "progress",
            Operator: "GreaterThanOrEqualTo",
            Values: ["100"]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('great_work', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching completed great works:", error);
      return [];
    }
  }
}

export default new GreatWorkService();