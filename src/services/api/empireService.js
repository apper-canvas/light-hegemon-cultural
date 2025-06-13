import { toast } from 'react-toastify';

class EmpireService {
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
        Fields: ['Name', 'color', 'is_player', 'culture_points', 'completed_great_works', 'diplomacy', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.fetchRecords('empire', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching empires:", error);
      toast.error("Failed to load empires");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: ['Name', 'color', 'is_player', 'culture_points', 'completed_great_works', 'diplomacy', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      };
      
      const response = await this.apperClient.getRecordById('empire', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching empire with ID ${id}:`, error);
      toast.error("Failed to load empire");
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
      if (data.color !== undefined) updateableData.color = data.color;
      if (data.is_player !== undefined) updateableData.is_player = data.is_player;
      if (data.culture_points !== undefined) updateableData.culture_points = data.culture_points;
      if (data.completed_great_works !== undefined) updateableData.completed_great_works = data.completed_great_works;
      if (data.diplomacy !== undefined) updateableData.diplomacy = data.diplomacy;
      if (data.Tags !== undefined) updateableData.Tags = data.Tags;
      if (data.Owner !== undefined) updateableData.Owner = parseInt(data.Owner);
      
      const params = {
        records: [updateableData]
      };
      
      const response = await this.apperClient.updateRecord('empire', params);
      
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
      console.error("Error updating empire:", error);
      throw error;
    }
  }

  async getPlayerEmpire() {
    try {
      const params = {
        Fields: ['Name', 'color', 'is_player', 'culture_points', 'completed_great_works', 'diplomacy'],
        where: [
          {
            FieldName: "is_player",
            Operator: "ExactMatch",
            Values: ["true"]
          }
        ]
      };
      
      const response = await this.apperClient.fetchRecords('empire', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data?.[0] || null;
    } catch (error) {
      console.error("Error fetching player empire:", error);
      return null;
    }
  }

  async spendCulturePoints(empireId, points) {
    try {
      const empire = await this.getById(empireId);
      if (!empire) throw new Error('Empire not found');
      if (empire.culture_points < points) throw new Error('Insufficient culture points');
      
      const newPoints = empire.culture_points - points;
      return await this.update(empireId, { culture_points: newPoints });
    } catch (error) {
      console.error("Error spending culture points:", error);
      throw error;
    }
  }

  async addCulturePoints(empireId, points) {
    try {
      const empire = await this.getById(empireId);
      if (!empire) throw new Error('Empire not found');
      
      const newPoints = empire.culture_points + points;
      return await this.update(empireId, { culture_points: newPoints });
    } catch (error) {
      console.error("Error adding culture points:", error);
      throw error;
    }
  }

  async updateDiplomacy(empireId, targetEmpireId, relation) {
    try {
      const empire = await this.getById(empireId);
      if (!empire) throw new Error('Empire not found');
      
      const updatedDiplomacy = { ...empire.diplomacy, [targetEmpireId]: relation };
      return await this.update(empireId, { diplomacy: updatedDiplomacy });
    } catch (error) {
      console.error("Error updating diplomacy:", error);
      throw error;
    }
  }
}

export default new EmpireService();