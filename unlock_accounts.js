const db = require('./VulnerableApp/config/db');

async function unlockAll() {
    try {
        console.log('Unlocking all accounts in VulnerableApp...');
        const [result] = await db.query('UPDATE users SET is_locked = FALSE, failed_attempts = 0, lock_until = NULL');
        console.log(`Success! ${result.affectedRows} users unlocked.`);
        process.exit(0);
    } catch (err) {
        console.error('Error unlocking accounts:', err);
        process.exit(1);
    }
}

unlockAll();
