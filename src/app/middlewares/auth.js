import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userUid = decoded.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token Invalido.' });
  }
};
