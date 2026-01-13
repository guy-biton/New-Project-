-- =============================================
-- VULNERABLE APP COMMANDS (Port 3002)
-- =============================================

-- 1. Switch to the Vulnerable Database
USE com_vuln;

-- 2. View all registered users
SELECT * FROM users;

-- 3. View all clients/posts
SELECT * FROM clients;

-- =============================================
-- SECURE APP COMMANDS (Port 3001)
-- =============================================

-- 1. Switch to the Secure Database
USE com_secure;

-- 2. View all registered users
SELECT * FROM users;

-- 3. View all clients/posts
SELECT * FROM clients;

-- =============================================
-- RESET COMMAND (WARNING: DELETES ALL USERS)
-- =============================================
-- Uncomment the lines below to run them

-- DELETE FROM users;
