const axios = require("axios")
const { Integration } = require("../models")

class ApiService {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  async fetch(url, params = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}${url}`, {
        params: { ...params, app_id: this.apiKey },
      })
      return response.data
    } catch (error) {
      console.error("API request failed:", error.message)
      throw error
    }
  }

  static async getIntegrationByName(name) {
    try {
      return await Integration.findOne({ where: { name } })
    } catch (error) {
      console.error("Failed to get integration:", error.message)
      throw error
    }
  }
}

module.exports = ApiService
