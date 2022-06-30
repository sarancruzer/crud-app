import customAxios from "./http.common";

class UserService {
  endpoint = "";
  constructor() {
    this.endpoint = "users";
  }
  getAllUsers() {
    return customAxios.get(`${this.endpoint}/all`).then((res) => res.data);
  }

  getUserById(id: string | undefined) {
    return customAxios
      .get(`${this.endpoint}/one/${id}`)
      .then((res) => res.data);
  }

  createUser(data: any) {
    return customAxios.post(`${this.endpoint}/create`, data);
  }

  updateUser(id: any, data: any) {
    return customAxios.put(`${this.endpoint}/${id}`, data);
  }

  deleteUser(id: any) {
    return customAxios.delete(`${this.endpoint}/${id}`);
  }
}

export default new UserService();
