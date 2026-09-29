export class BaseApi {
  constructor(requestContext, baseUrl) {
    this.request = requestContext;
    this.baseUrl = baseUrl || process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
  }

  async get(endpoint, options = {}) {
    return this.request.get(`${this.baseUrl}${endpoint}`, options);
  }

  async post(endpoint, payload, options = {}) {
    return this.request.post(`${this.baseUrl}${endpoint}`, {
      data: payload,
      ...options,
    });
  }

  async put(endpoint, payload, options = {}) {
    return this.request.put(`${this.baseUrl}${endpoint}`, {
      data: payload,
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request.delete(`${this.baseUrl}${endpoint}`, options);
  }
}

export default BaseApi;
