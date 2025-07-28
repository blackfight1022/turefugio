const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL,
    rol TEXT CHECK(rol IN ('admin', 'anfitrion', 'visitante')) NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS alojamientos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    ubicacion TEXT,
    imagen TEXT,
    id_anfitrion INTEGER,
    FOREIGN KEY (id_anfitrion) REFERENCES usuarios(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_alojamiento INTEGER,
    fecha_entrada TEXT,
    fecha_salida TEXT,
    estado TEXT DEFAULT 'pendiente',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reseñas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_alojamiento INTEGER,
    calificacion INTEGER,
    comentario TEXT,
    fecha TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_alojamiento) REFERENCES alojamientos(id)
  )`);
});

module.exports = db;
