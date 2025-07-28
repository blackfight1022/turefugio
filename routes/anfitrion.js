const express = require('express');
const { verificarToken, soloRol } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/panel', verificarToken, soloRol('anfitrion'), (req, res) => {
  res.json({ mensaje: `Bienvenido al panel del anfitrión: ${req.user.id}` });
});

module.exports = router;
