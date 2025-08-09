const crypto = require('crypto');

exports.verifyTelegramInitData = (initData, botToken) => {
    // This is a basic implementation. It's highly recommended to use a more robust
    // library or a detailed, production-ready implementation for this.
    try {
        const urlParams = new URLSearchParams(initData);
        const hash = urlParams.get('hash');
        urlParams.delete('hash');
        urlParams.sort();

        const dataCheckString = Array.from(urlParams.entries())
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');

        const secretKey = crypto.createHmac('sha256', 'WebAppData')
            .update(botToken)
            .digest();

        const hmac = crypto.createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');

        return hmac === hash;
    } catch (err) {
        console.error("Verification error:", err);
        return false;
    }
};