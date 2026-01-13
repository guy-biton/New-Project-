# MySQL Cheat Sheet for Project

Use these commands in MySQL Workbench to switch between databases and inspect data.

## 💀 Vulnerable App (Port 3002)
**Database Name**: `com_vuln`

### Switch to Vulnerable DB
```sql
USE com_vuln;
```

### View All Users (Vulnerable)
```sql
SELECT * FROM users;
```

### View All Clients/Posts (Vulnerable)
```sql
SELECT * FROM clients;
```

---

## 🔒 Secure App (Port 3001)
**Database Name**: `com_secure`

### Switch to Secure DB
```sql
USE com_secure;
```

### View All Users (Secure)
```sql
SELECT * FROM users;
```
*Note: Passwords here will be long hash strings, not readable text.*

### View All Clients/Posts (Secure)
```sql
SELECT * FROM clients;
```

---

## 🛠️ Helpful Extras

### Clear All Users (Reset DB)
**Warning**: This deletes all registered users!
```sql
-- For Vulnerable App
USE com_vuln;
DELETE FROM users;

-- For Secure App
USE com_secure;
DELETE FROM users;
```

### Check Password History (Secure App Only)
```sql
USE com_secure;
SELECT * FROM password_history;
```
