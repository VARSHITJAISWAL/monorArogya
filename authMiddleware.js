const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Check for Authorization header format: "Bearer <token>"
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Access denied (No token provided)" });

  try {
    // jwt.verify returns the payload if verification succeeds
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // The login route sets the payload to { id: user._id }, so we use req.user.id
    req.user = verified;
    next();
  } catch (err) {
    // This catches expired, malformed, or invalid signature tokens
    res.status(403).json({ message: "Invalid token" }); // Changed 400 to 403 Forbidden/Invalid
  }
};