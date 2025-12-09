const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (token === process.env.ADMIN_TOKEN) {
        next();
    } else {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyAdmin;
