import { api } from "../../services/api";

export const fetchProductsApi = async () => {
  const res = await api.get("/Product");
  return res.data;
};
