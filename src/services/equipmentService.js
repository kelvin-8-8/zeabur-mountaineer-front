import { API_BASE_URL, api } from "../config/api";


// 取得所有裝備
export const getAllEquipment = async () => {
  try {
    const response = await api.get('/equip');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addEquipment = async (addItem) => {
  try {
    const response = await api.post('/equip/add', addItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 修改
export const changeEquipment = async (updatedItem) => {
  try {
    const response = await api.post('/equip/change', updatedItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 刪除
export const deleteEquipment = async (deleteItem) => {
  try {
    const response = await api.post('/equip/delete', deleteItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}