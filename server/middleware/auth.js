import jwt from 'jsonwebtoken';

// Protects routes by authenticating the user
export const protect = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      // Here session is not express session,(it stores user data)
      const session = jwt.verify(token, process.env.JWT_SECRET);
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      req.session = session;
      next();
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

// Protect route for admin
export const protectAdmin = (req, res, next) => {
    if (req?.session?.role !== "ADMIN") {
        return res.status(403).json({ error: "Admin access required" });
  }
  next();
}