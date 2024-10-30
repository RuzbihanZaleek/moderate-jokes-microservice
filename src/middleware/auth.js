const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const [type, credentials] = authHeader.split(" ");

  if (type !== "Basic" || !credentials) return res.sendStatus(401);

  const [email, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next();
  }

  return res.sendStatus(403);
};

module.exports = auth;
