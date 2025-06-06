require('dotenv').config();

const server = {
    port: process.env.SERVER_PORT || 8080,
    host: process.env.SERVER_HOST || 'localhost',
}

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}

const jwt = {
    secretKey: process.env.JWT_SECRET
}

const mailer = {
    user: process.env.EMAIL,
    pass: process.env.PASS,
}

const mono = {
    monoPEM: process.env.MONO_PEM,
    monoXsign: process.env.MONO_XSIGN,
    monoUrl: process.env.MONO_URL,
    monoWebhook: process.env.MONO_WEBHOOK,
}

module.exports = {server, db, jwt, mailer, mono}
