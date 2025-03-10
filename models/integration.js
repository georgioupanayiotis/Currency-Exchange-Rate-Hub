/* global process */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");
const { Buffer } = require("buffer");

const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // Ensure key is 32 bytes
const algorithm = "aes-256-cbc";

function encrypt(text) {
  const iv = crypto.randomBytes(16); // Generate IV dynamically
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted; // Store IV with encrypted text
}

function decrypt(text) {
  const iv = Buffer.from(text.substring(0, 32), "hex"); // Extract IV
  const encryptedText = text.substring(32);
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

const Integration = sequelize.define("Integration", {
  name: { type: DataTypes.STRING, allowNull: false },
  apiKey: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("apiKey", encrypt(value)); // Encrypt API key before saving
    },
    get() {
      const encryptedKey = this.getDataValue("apiKey");
      return encryptedKey ? decrypt(encryptedKey) : null; // Decrypt when retrieving
    },
  },
  baseUrl: { type: DataTypes.STRING, allowNull: false },
  rateLimit: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Integration;
