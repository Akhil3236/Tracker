import jwt from "jsonwebtoken"


/*--------------------------
    jwt verifier/middleware
----------------------------*/

export const  authMiddleware=(req, res, next)=> {

    const token1=req.cookies.token;

    if (!token1) return res.status(401).json({ message: "Unauthorized" });
    try {
      const decoded = jwt.verify(token1, process.env.JWT_TOKEN);
      req.user = decoded; 
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
  }
  