// config/config.js
module.exports = {
  passwordPolicy: {
    minLength: 10,
    requireUppercase: true,
    requireLowercase: true,
    requireDigits: true,
    requireSpecialChars: true, // e.g., !@#$%^&*
    historyCheck: 3 // Cannot reuse last 3 passwords
  },
  lockoutPolicy: {
    maxFailedAttempts: 3,
    lockoutDuration: 15 * 60 * 1000 // 15 minutes in milliseconds
  },
  sessionSecret: process.env.SESSION_SECRET || 'super_secret_session_key_change_me'
};
