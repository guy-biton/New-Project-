// config/config.js
module.exports = {
  passwordPolicy: {
    minLength: 5,
    requireUppercase: false,
    requireLowercase: false,
    requireDigits: false,
    requireSpecialChars: false, // e.g., !@#$%^&*
    historyCheck: 0 // No history check
  },
  lockoutPolicy: {
    maxFailedAttempts: 3,
    lockoutDuration: 0, // 15 minutes in milliseconds
  },
  sessionSecret: process.env.SESSION_SECRET || 'super_secret_session_key_change_me'
};
