export const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).json({
    message: "Não autenticado. Faça login."
  });
};

export const optionalAuth = (_, _, next) => {
  next();
};