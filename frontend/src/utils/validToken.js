export const isTokenValid = (token) => {
    try {
        const [, payloadBase64] = token.split(".");
        const payload = JSON.parse(atob(payloadBase64));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch (err) {
        return false; // Invalid token format
    }
};
