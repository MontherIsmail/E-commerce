import axios from "axios";

const createClient = (
  userToken: string,
  baseURL = "http://localhost:5000/api/v1/"
): any => {
  const api = axios.create({
    baseURL,
    timeout: 1000,
    headers: { authorization: userToken },
    withCredentials: true,
  });

  const get = async (query: string) => {
    try {
      const response = await api.get(query);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const post = async (query: string, data: any) => {
    try {
      const response = await api.post(query, data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const dele = async (query: string) => {
    try {
      const response = await api.delete(query);
      return response?.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    getProducts: async (): Promise<any> => await get("products"),

    getProduct: async (productId: string): Promise<any> =>
      await get(`products/${productId}`),

    addToCart: async (i: any): Promise<any> =>
      await post("cart/add-to-cart", { ...i }),

    getCart: async (userId: string): Promise<any> =>
      await get(`cart/${userId}`),

    getOrders: async (userId: any): Promise<any> =>
      await get(`orders/${userId}`),

    deleteCartItem: async (itemId: any): Promise<any> =>
      await dele(`cart/${itemId}`),

    resetCart: async (userId: any): Promise<any> =>
      await dele(`cart/reset/${userId}`),

    login: async (i: any): Promise<any> => await post("auth/login", { ...i }),

    register: async (i: any): Promise<any> =>
      await post("auth/signup", { ...i }),

    logout: async (): Promise<any> => await post("auth/logout", {}),
  };
};

export default createClient;
