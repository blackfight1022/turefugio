const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const anfitrionRoutes = require('./routes/anfitrion');
const visitanteRoutes = require('./routes/visitante');

const app = express(); // << ESTA LÍNEA ES CLAVE

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/anfitrion', anfitrionRoutes);
app.use('/api/visitante', visitanteRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
