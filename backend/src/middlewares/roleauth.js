const roleAuth = (permissions) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole) {
      return res.status(400).json("Role not provided");
    }

    if (Array.isArray(permissions) && permissions.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You do not have permissions");
    }
  };
};

module.exports = roleAuth;
