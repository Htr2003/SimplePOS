import { api } from "../../services/api";

export const createOrderApi = async totalAmount => {
  const res = await api.post("/Order", { totalAmount });
  return res.data;
};

export const fetchOrdersApi = async () => {
  const res = await api.get("/Order");
  return res.data;
};