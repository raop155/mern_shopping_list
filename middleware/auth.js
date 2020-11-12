const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'No token, Auth denied',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: 'Token invalid',
    });
  }
}

module.exports = auth;
