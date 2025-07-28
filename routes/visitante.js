const express = require('express');
const { verificarToken, soloRol } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/panel', verificarToken, soloRol('visitante'), (req, res) => {
  res.json({ mensaje: `Bienvenido visitante: ${req.user.id}` });
});

module.exports = router;
