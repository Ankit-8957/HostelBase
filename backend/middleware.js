export const isStudent = (req, res, next)=>{
  if (req.isAuthenticated() && req.user.role === "Student") return next();
  res.status(401).json({ message: "Unauthorized" });
}

export const isOwner = (req, res, next)=>{
  if (req.isAuthenticated() && req.user.role === "Owner") return next();
  res.status(401).json({ message: "Unauthorized" });
}

export const isLoggedIn = (req, res, next)=>{
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }

  next();
}

export const checkUser = (req, res, next)=>{
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

