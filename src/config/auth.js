import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;

  // Log what we got (temporary, remove later)
  console.log("Authorization header:", header);

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token must start with Bearer" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // matches jwt.sign({ id: ... })
    return next();
  } catch (err) {
    console.log("JWT verify error:", err.name, err.message);
    return res
      .status(401)
      .json({ message: "Invalid token", error: err.message });
  }
};
