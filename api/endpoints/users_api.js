import BaseApi from '../base_api.js';

export class UsersApi extends BaseApi {
  async getUsers() {
    return this.get('/users');
  }

  async getUser(userId) {
    return this.get(`/users/${userId}`);
  }

  async createUser(payload) {
    return this.post('/users', payload);
  }
}

export default UsersApi;
