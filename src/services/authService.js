// services/authService.js
import { API_BASE_URL, api } from "../config/api";

/**
 * 
 * @returns {Promise<Object>} 包含登入狀態的 API 回應
 */
// 確認是否登入
export const isLogin = async () => {
  try {
    const response = await api.get('/auth/checkLogin');
    console.log("確認登入");
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const checkRole = async () => {
  try {
    const response = await api.get('/auth/checkRole');
    console.log("確認身份");
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 登入
export const login = async (username, password) => {
  // 以後端 return ResponseEntity.status(403).body(ApiResponse.error(403, "登入失敗")); 為例
  // error.response.status = 403
  // error.response.data = { status: 403, message: "登入失敗", data: null}
  try {
    const response = await api.post(`/auth/login`,
      { username, password });
    return response.data;
  }
  catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    console.log(error);
    throw (error);
  }
}

// 登出
export const logout = async () => {
  try {
    const response = await api.get('/auth/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// 註冊
export const register = async (username, trueName, email, password) => {
  try {
    const response = await api.post(`/auth/register`, 
      { username, trueName, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// 修改
export const changeProfile = async (username, trueName, email, password, newPassword) => {
  try {
      const response = await api.post("/auth/change", {
          username,
          password,
          trueName,
          email,
          newPassword,
      });
      return response.data;
  } catch (error) {
    // （?.）鏈結運算符
    // 伺服器有回應使用 error.response.data ; 沒有回應使用 error.message(axios提供)
      console.error("Error in changeProfile:", error.response?.data || error.message);
      throw error;
  }
};