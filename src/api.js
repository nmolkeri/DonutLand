import axios from "axios";

const BASE_URL = "http://localhost:3100";

const endpoints = {
  donut: "/donut",
  topping: "/topping",
  orders: "/order",
  customer: "/customer",
};

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const getDonuts = () => {
  return apiClient.get(endpoints.donut);
};

export const postItem = (type, data) => {
  return apiClient.post(`/${type}`, data);
};

export const patchItem = (type, id, data) => {
  return apiClient.patch(`/${type}/${id}`, data);
};

export const deleteItem = (type, id) => {
  return apiClient.delete(`/${type}/${id}`);
};

export const getTopping = () => {
  return apiClient.get(endpoints.topping);
};

export const getOrder = () => {
  return apiClient.get(endpoints.orders);
};

export const getOrderItem = (id) => {
  return apiClient.get(`/order/${id}/item`);
};

export const deleteOrder = (id) => {
  return apiClient.delete(`/order/${id}`);
};

export const postOrder = (data) => {
  return apiClient.post(endpoints.orders, data);
};

export const postCustomer = (data) => {
  return apiClient.post(endpoints.customer, data);
};
export const postMultipltItemsOrder = (id, data) => {
  return apiClient.post(`/order/${id}/item/bulk`, data);
};
