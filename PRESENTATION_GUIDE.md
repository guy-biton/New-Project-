# Presentation Guide: Comunication_LTD

This guide explains how to present the project requirements, specifically the Security vs Vulnerability demonstrations.

---

## 1. Setup & Architecture
*   **SecureApp** (Port 3001): Requires strong passwords, protects against attacks.
*   **VulnerableApp** (Port 3002): Intentionally weak to demonstrate "hacks".
*   **Database**: Two separate databases (`comunication_secure` and `comunication_vuln`).

### How to Run Both
1.  **Terminal 1**: `cd SecureApp` -> `node server.js`
2.  **Terminal 2**: `cd VulnerableApp` -> `node server.js`

---

## 2. Part A: Secure Principles (Present in SecureApp)
*   **Registration**: Show complexity requirements (try a weak password like "123456" - it should fail due to Dictionary Check/Complexity).
*   **Login**: Show "Invalid credentials" generic error. show Account Lockout after 3 fails.
*   **Inspector**: Show `http://localhost:3001/inspector` to prove passwords are **Hashed (SHA-512 + Salt)**.

---

## 3. Part B: Vulnerability Demos (Present in VulnerableApp)

### Demo 1: SQL Injection on Register
*   **Where**: `http://localhost:3002/auth/register`
*   **Action**: Enter Username: `hacker'`
*   **Result**: Crash / SQL Syntax Error (Proves injection possible).
*   **Action 2**: Enter Username: `hacker', 'hacked@email.com', 'fake', 'fake'); -- `
*   **Result**: Registration Success (Bypassed the query).

### Demo 2: SQL Injection on Login
*   **Where**: `http://localhost:3002/auth/login`
*   **Action**: Username: `') OR '1'='1' -- -`
*   **Result**: Login Success (Logged in as the first user, usually admin).

### Demo 3: Stored XSS
*   **Where**: `http://localhost:3002/clients`
*   **Action**: Add Client: `<script>alert('Hacked')</script>`
*   **Result**: Alert popup appears.

### Demo 4: Secure Solutions
*   **Where**: `http://localhost:3001` (SecureApp)
*   **Action**: Try the same attacks.
    *   **SQLi**: `hacker'` -> treated as a name "hacker'".
    *   **XSS**: `<script>...` -> rendered as text `&lt;script&gt;...`.

---

## 4. Part C: Clients Section (Secure)

### Feature: Secure Client Management
*   **Where**: `http://localhost:3001/clients`
*   **Action 1 (SQL Injection Test)**:
    *   Search for: `' OR '1'='1`
    *   **Result**: No crash, no data dump. The system searches for a client literally named `' OR '1'='1`.
    *   **Why**: We use **Parameterized Queries** (`WHERE name LIKE ?`).

*   **Action 2 (Stored XSS Test)**:
    *   Add a new client with name: `<script>alert('XSS')</script>`
    *   **Result**: The name appears in the list as text, but **NO popup** appears.
    *   **Why**: We use **Output Encoding** (EJS `<%= %>`) which converts `<` to `&lt;`, neutralizing the script.
