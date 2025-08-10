
SET NAMES utf8mb4;


-- USUARIOS
CREATE TABLE usuarios (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    numero_telefono VARCHAR(20) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL
);

-- TIPO DE MASCOTA (PERRO, GATO, CONEJO, ETC)
CREATE TABLE tipo_mascota (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

-- MASCOTAS
CREATE TABLE mascotas (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(100) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
	estado BOOLEAN DEFAULT TRUE,
        imagen VARCHAR(255),
    id_usuario BINARY(16),
	id_tipo_mascota INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
	FOREIGN KEY (id_tipo_mascota) REFERENCES tipo_mascota(id)
);
-- CATEGORÍAS DE SERVICIO
CREATE TABLE categorias_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) unique 
);

-- SERVICIOS
CREATE TABLE servicios (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    id_categoria INT,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    duracion INT,
    precio DECIMAL(10,2),
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES categorias_servicio(id)
);

-- Especialidad del veterinario
CREATE TABLE tipo_especialidad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE
);


-- TIPO DE ESPECIALIDAD DE VETERINARIO QUE PUEDE CUBRIR QUE CATEGORIA
CREATE TABLE especialidad_categorias (
  id_especialidad INT,
  id_categoria INT,
  PRIMARY KEY (id_especialidad, id_categoria),
  FOREIGN KEY (id_especialidad) REFERENCES tipo_especialidad(id),
  FOREIGN KEY (id_categoria) REFERENCES categorias_servicio(id)
);

-- veterinario
CREATE TABLE veterinario (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    numero_telefono VARCHAR(20),
    dni VARCHAR(20) UNIQUE,
    estado BOOLEAN DEFAULT TRUE,
    id_especialidad INT,
    FOREIGN KEY (id_especialidad) REFERENCES tipo_especialidad(id)
);


-- asistente
CREATE TABLE asistente (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    numero_telefono VARCHAR(20),
    dni VARCHAR(20) UNIQUE,
    password_hash TEXT,
	imagen VARCHAR(255)
);

-- ORDENES
CREATE TABLE ordenes (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    fecha DATE,
    hora_inicio TIME DEFAULT (CURRENT_TIME),
    hora_fin time,
	estado BOOLEAN DEFAULT TRUE,
    id_mascota BINARY(16),
    id_veterinario BINARY(16),
    id_asistente BINARY(16),
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id),
    FOREIGN KEY (id_veterinario) REFERENCES veterinario(id),
    FOREIGN KEY (id_asistente) REFERENCES asistente(id)
);



-- DETALLE DE ORDEN (servicios aplicados)
CREATE TABLE detalle_orden (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    id_orden BINARY(16),
    id_servicio BINARY(16),
    FOREIGN KEY (id_orden) REFERENCES ordenes(id),
    FOREIGN KEY (id_servicio) REFERENCES servicios(id)
);

-- REGISTRO / AUDITORÍA
CREATE TABLE registro (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    accion ENUM('INSERT', 'UPDATE', 'DELETE'),
    tabla_afectada VARCHAR(100),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    id_asistente BINARY(16),
    FOREIGN KEY (id_asistente) REFERENCES asistente(id)
);


INSERT INTO tipo_mascota (nombre) VALUES 
('Perro'),
('Gato'),
('Conejo'),
('Tortuga'),
('Ave');

INSERT INTO usuarios (id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni) VALUES
(UUID_TO_BIN(UUID()), 'María', 'Pérez', 'Lopez', 'maria@example.com', '987654321', '12345678'),
(UUID_TO_BIN(UUID()), 'Juan', 'García', 'Santos', 'juan@example.com', '987654322', '23456789'),
(UUID_TO_BIN(UUID()), 'Lucía', 'Torres', 'Fernández', 'lucia@example.com', '987654323', '34567890'),
(UUID_TO_BIN(UUID()), 'Pedro', 'Ramírez', 'Castillo', 'pedro@example.com', '987654324', '45678901'),
(UUID_TO_BIN(UUID()), 'Elena', 'Díaz', 'Núñez', 'elena@example.com', '987654325', '56789012');

INSERT INTO mascotas (id, nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota) VALUES
(UUID_TO_BIN(UUID()), 'Firulais', 'Labrador', 4, 'M', TRUE, 'img/firulais.jpg', 
 (SELECT id FROM usuarios WHERE correo = 'maria@example.com'), 1),
(UUID_TO_BIN(UUID()), 'Michi', 'Persa', 2, 'F', TRUE, 'img/michi.jpg', 
 (SELECT id FROM usuarios WHERE correo = 'juan@example.com'), 2),
(UUID_TO_BIN(UUID()), 'Bunny', 'Enano', 1, 'F', TRUE, 'img/bunny.jpg', 
 (SELECT id FROM usuarios WHERE correo = 'lucia@example.com'), 3),
(UUID_TO_BIN(UUID()), 'Leonardo', 'Mediterránea', 10, 'M', TRUE, 'img/leonardo.jpg', 
 (SELECT id FROM usuarios WHERE correo = 'pedro@example.com'), 4),
(UUID_TO_BIN(UUID()), 'Piolín', 'Canario', 3, 'M', TRUE, 'img/piolin.jpg', 
 (SELECT id FROM usuarios WHERE correo = 'elena@example.com'), 5);

 
INSERT INTO categorias_servicio (nombre) VALUES 
('Baño y Corte'),
('Vacunación'),
('Desparasitación'),
('Consulta General'),
('Cirugía');

INSERT INTO servicios (id, id_categoria, nombre, descripcion, duracion, precio, estado) VALUES
(UUID_TO_BIN(UUID()), 1, 'Baño Básico', 'Incluye lavado y cepillado', 60, 25.00, TRUE),
(UUID_TO_BIN(UUID()), 1, 'Corte de Pelo', 'Corte estilizado según raza', 60, 30.00, TRUE),
(UUID_TO_BIN(UUID()), 2, 'Vacuna Rabia', 'Vacunación contra la rabia', 55, 15.00, TRUE),
(UUID_TO_BIN(UUID()), 2, 'Vacuna Triple', 'Vacuna triple canina', 55, 20.00, TRUE),
(UUID_TO_BIN(UUID()), 3, 'Desparasitación Interna', 'Via oral', 55, 10.00, TRUE),
(UUID_TO_BIN(UUID()), 3, 'Desparasitación Externa', 'Pulgas y garrapatas', 55, 12.00, TRUE),
(UUID_TO_BIN(UUID()), 4, 'Consulta Inicial', 'Evaluación general', 60, 30.00, TRUE),
(UUID_TO_BIN(UUID()), 4, 'Consulta de Seguimiento', 'Revisión post tratamiento', 55, 20.00, TRUE),
(UUID_TO_BIN(UUID()), 5, 'Cirugía General', 'Procedimientos menores', 60, 150.00, TRUE),
(UUID_TO_BIN(UUID()), 5, 'Esterilización', 'Control de natalidad', 60, 100.00, TRUE);

INSERT INTO tipo_especialidad (nombre) VALUES 
('Dermatología'),
('Cirugía'),
('Medicina General'),
('Odontología Veterinaria'),
('Parasitología');


INSERT INTO especialidad_categorias (id_especialidad, id_categoria) VALUES 
(1, 1), -- Dermatología → Baño y Corte
(1, 3), -- Dermatología → Desparasitación
(2, 5), -- Cirugía → Cirugía
(3, 2), -- Medicina General → Vacunación
(3, 4), -- Medicina General → Consulta General
(4, 4), -- Odontología → Consulta
(5, 3); -- Parasitología → Desparasitación

INSERT INTO veterinario (id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, estado, id_especialidad) VALUES
(UUID_TO_BIN(UUID()), 'Carlos', 'López', 'Ramírez', 'carlos@vet.com', '987654331', '12345670', TRUE, 1),
(UUID_TO_BIN(UUID()), 'Ana', 'Martínez', 'Sánchez', 'ana@vet.com', '987654332', '22345671', TRUE, 2),
(UUID_TO_BIN(UUID()), 'Luis', 'Gómez', 'Torres', 'luis@vet.com', '987654333', '32345672', TRUE, 3),
(UUID_TO_BIN(UUID()), 'Paola', 'Díaz', 'Fernández', 'paola@vet.com', '987654334', '42345673', TRUE, 4),
(UUID_TO_BIN(UUID()), 'Jorge', 'Salas', 'Morales', 'jorge@vet.com', '987654335', '52345674', TRUE, 5);

INSERT INTO veterinario (id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, estado, id_especialidad) VALUES
(UUID_TO_BIN(UUID()), 'Andrea', 'Rivera', 'Campos', 'andrea@vet.com', '987654336', '62345675', TRUE, 1),
(UUID_TO_BIN(UUID()), 'Sergio', 'Cárdenas', 'Ortiz', 'sergio@vet.com', '987654337', '72345676', TRUE, 1),
(UUID_TO_BIN(UUID()), 'Valeria', 'Reyes', 'Gonzales', 'valeria@vet.com', '987654338', '82345677', TRUE, 2),
(UUID_TO_BIN(UUID()), 'Héctor', 'Luna', 'Medina', 'hector@vet.com', '987654339', '92345678', TRUE, 2),
(UUID_TO_BIN(UUID()), 'Renata', 'Mendoza', 'Delgado', 'renata@vet.com', '987654340', '13345679', TRUE, 3),
(UUID_TO_BIN(UUID()), 'Esteban', 'Flores', 'Navarro', 'esteban@vet.com', '987654341', '14345680', TRUE, 3),
(UUID_TO_BIN(UUID()), 'Camila', 'Silva', 'Rojas', 'camila@vet.com', '987654342', '15345681', TRUE, 4),
(UUID_TO_BIN(UUID()), 'Matías', 'Vargas', 'Quispe', 'matias@vet.com', '987654343', '16345682', TRUE, 4),
(UUID_TO_BIN(UUID()), 'Fernanda', 'Herrera', 'Espinoza', 'fernanda@vet.com', '987654344', '17345683', TRUE, 5),
(UUID_TO_BIN(UUID()), 'Iván', 'Chávez', 'Paredes', 'ivan@vet.com', '987654345', '18345684', TRUE, 5);



INSERT INTO asistente (id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password_hash, imagen)
VALUES (
  UUID_TO_BIN(UUID()),
  'Esteban', 'Castro', 'Huamán',
  'a@a.com',
  '987654300',
  '99999999',
  'papita',
  'img/asistente.jpg'
);


--  MASCOTAS + USUARIOS  --------------
-- ====================================

CREATE VIEW vista_usuarios AS
SELECT 
  BIN_TO_UUID(id) AS id,
  nombre,
  apellido_paterno,
  apellido_materno,
  correo,
  numero_telefono,
  dni
FROM usuarios;

CREATE VIEW vista_mascotas AS
SELECT 
  BIN_TO_UUID(id) AS id,
  nombre,
  raza,
  edad,
  sexo,
  estado,
  imagen
FROM mascotas;

create VIEW vista_mascota_usuario AS
SELECT 
  BIN_TO_UUID(m.id) AS id_mascota,
  m.nombre AS nombre_mascota,
  m.raza,
  m.edad,
  m.sexo,
  m.estado,
  m.imagen,
  tm.nombre AS tipo_mascota, 
  BIN_TO_UUID(u.id) AS id_usuario,
  u.nombre AS nombre_usuario,
  u.apellido_paterno,
  u.apellido_materno,
  u.correo,
  u.dni,
  u.numero_telefono
FROM mascotas m
JOIN usuarios u ON m.id_usuario = u.id
JOIN tipo_mascota tm ON m.id_tipo_mascota = tm.id;

--  SERVICIOS + CATEGORIA_SERVICIOS  --------------
-- ================================================

CREATE VIEW vista_servicios_categorias AS
SELECT 
  BIN_TO_UUID(s.id) AS id_servicio,
  s.nombre,
  s.descripcion,
  s.duracion,
  s.precio,
  s.estado,
  s.id_categoria,
  c.nombre AS categoria
FROM servicios s
JOIN categorias_servicio c ON s.id_categoria = c.id;



--  VETERINARIOS + TIPO_ESPECIALIDAD  --------------
-- =================================================

CREATE VIEW vista_veterinarios_especialidad AS
SELECT 
  BIN_TO_UUID(v.id) AS id_veterinario,
  v.nombre,
  v.apellido_paterno,
  v.apellido_materno,
  v.correo,
  v.numero_telefono,
  v.dni,
  v.estado,
  v.id_especialidad,
  te.nombre AS especialidad
FROM veterinario v
JOIN tipo_especialidad te ON v.id_especialidad = te.id;



--  ORDENES Y DETALLE_ORDEN   ----------------------
-- =================================================
CREATE OR REPLACE VIEW vista_ordenes_resumen AS
SELECT 
  BIN_TO_UUID(o.id) AS id_orden,
  BIN_TO_UUID(o.id_mascota) AS id_mascota, 
  BIN_TO_UUID(o.id_asistente) AS id_asistente, 
  BIN_TO_UUID(o.id_veterinario) AS id_veterinario, -- ✅ esta línea es clave
  s.id_categoria,
  CONCAT(u.nombre, ' ', u.apellido_paterno) AS usuario,
  m.nombre AS nombre_mascota,
  CONCAT(v.nombre, ' ', v.apellido_paterno) AS veterinario,
  s.nombre AS servicio,
  s.precio,
  o.fecha,
  TIME_FORMAT(o.hora_inicio, '%H:%i:%s') AS hora_inicio,
  TIME_FORMAT(o.hora_fin, '%H:%i:%s') AS hora_fin,
  o.estado
FROM ordenes o
JOIN mascotas m ON o.id_mascota = m.id
JOIN usuarios u ON m.id_usuario = u.id
JOIN veterinario v ON o.id_veterinario = v.id
JOIN detalle_orden d ON o.id = d.id_orden
JOIN servicios s ON d.id_servicio = s.id;








--  CATEGORIA_SERVICIOS + TIPO_ESPECIALIDAD  --------------
-- ================================================
CREATE OR REPLACE VIEW vista_especialidad_categoria AS
SELECT 
  ec.id_especialidad,
  te.nombre AS nombre_especialidad,
  ec.id_categoria,
  cs.nombre AS nombre_categoria
FROM especialidad_categorias ec
JOIN tipo_especialidad te ON ec.id_especialidad = te.id
JOIN categorias_servicio cs ON ec.id_categoria = cs.id;





CREATE OR REPLACE VIEW vista_ingresos_por_categoria AS
SELECT 
  c.nombre AS categoria,
  SUM(s.precio) AS ingresos
FROM detalle_orden d
JOIN servicios s ON d.id_servicio = s.id
JOIN categorias_servicio c ON s.id_categoria = c.id
JOIN ordenes o ON d.id_orden = o.id
WHERE o.estado = TRUE
GROUP BY c.nombre;

CREATE OR REPLACE VIEW vista_ingresos_mensuales AS
SELECT
  DATE_FORMAT(o.fecha, '%Y-%m') AS mes,
  SUM(s.precio) AS ingresos
FROM ordenes o
JOIN detalle_orden d ON o.id = d.id_orden
JOIN servicios s ON d.id_servicio = s.id
WHERE o.estado = TRUE
GROUP BY DATE_FORMAT(o.fecha, '%Y-%m')
ORDER BY DATE_FORMAT(o.fecha, '%Y-%m');



CREATE OR REPLACE VIEW vista_ordenes_por_tipo_mascota AS
SELECT
  DATE_FORMAT(o.fecha, '%Y-%m') AS mes,
  tm.nombre AS tipo_mascota,
  COUNT(*) AS total_ordenes
FROM ordenes o
JOIN mascotas m ON o.id_mascota = m.id
JOIN tipo_mascota tm ON m.id_tipo_mascota = tm.id
WHERE o.estado = TRUE
GROUP BY DATE_FORMAT(o.fecha, '%Y-%m'), tm.nombre
ORDER BY DATE_FORMAT(o.fecha, '%Y-%m'), tm.nombre;



--  MASCOTAS + USUARIOS  --------------
-- ====================================
--  1. Crear PROCEDIMIENTO ALMACENADO para insertar mascotas
DELIMITER $$

CREATE PROCEDURE sp_insertar_mascota (
    IN p_nombre VARCHAR(100),
    IN p_raza VARCHAR(100),
    IN p_edad INT,
    IN p_sexo ENUM('M', 'F'),
    IN p_estado BOOLEAN,
    IN p_imagen VARCHAR(255),
    IN p_id_usuario BINARY(16),
    IN p_id_tipo_mascota INT
)
BEGIN
    DECLARE v_id BINARY(16);
    SET v_id = UUID_TO_BIN(UUID());

    INSERT INTO mascotas (id, nombre, raza, edad, sexo, estado, imagen, id_usuario, id_tipo_mascota)
    VALUES (v_id, p_nombre, p_raza, p_edad, p_sexo, p_estado, p_imagen, p_id_usuario, p_id_tipo_mascota);

    INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
    VALUES ('INSERT', 'mascotas', CONCAT('Insert mascota ', BIN_TO_UUID(v_id)), NULL);
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_actualizar_mascota (
  IN p_id BINARY(16),
  IN p_nombre VARCHAR(100),
  IN p_raza VARCHAR(100),
  IN p_edad INT,
  IN p_sexo ENUM('M', 'F'),
  IN p_estado BOOLEAN,
  IN p_imagen VARCHAR(255),
  IN p_id_usuario BINARY(16),
  IN p_id_tipo_mascota INT
)
BEGIN
  UPDATE mascotas
  SET
    nombre = p_nombre,
    raza = p_raza,
    edad = p_edad,
    sexo = p_sexo,
    estado = p_estado,
    imagen = p_imagen,
    id_usuario = p_id_usuario,
    id_tipo_mascota = p_id_tipo_mascota
  WHERE id = p_id;
END $$

DELIMITER ;



DELIMITER $$
CREATE PROCEDURE sp_eliminar_mascota(IN p_id BINARY(16))
BEGIN
    DELETE FROM mascotas WHERE id = p_id;
    -- el trigger tr_delete_mascota se ejecutará automáticamente
END$$
DELIMITER ;


-- =======================================
DELIMITER $$

create PROCEDURE sp_insertar_usuario (
  IN p_nombre VARCHAR(100),
  IN p_apellido_paterno VARCHAR(100),
  IN p_apellido_materno VARCHAR(100),
  IN p_correo VARCHAR(255),
  IN p_numero_telefono VARCHAR(20),
  IN p_dni VARCHAR(10)
)
BEGIN
  DECLARE v_id BINARY(16);
  SET v_id = UUID_TO_BIN(UUID());

  INSERT INTO usuarios (
    id,
    nombre,
    apellido_paterno,
    apellido_materno,
    correo,
    numero_telefono,
    dni
  ) VALUES (
    v_id,
    p_nombre,
    p_apellido_paterno,
    p_apellido_materno,
    p_correo,
    p_numero_telefono,
    p_dni
  );

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('INSERT', 'usuarios', CONCAT('Insert usuario ', BIN_TO_UUID(v_id)), NULL);
END$$

DELIMITER ;







DELIMITER $$

CREATE PROCEDURE sp_actualizar_usuario (
  IN p_id BINARY(16),
  IN p_nombre VARCHAR(100),
  IN p_apellido_paterno VARCHAR(100),
  IN p_apellido_materno VARCHAR(100),
  IN p_correo VARCHAR(255),
  IN p_numero_telefono VARCHAR(20),
  IN p_dni VARCHAR(10)
)
BEGIN
  UPDATE usuarios
  SET
    nombre = p_nombre,
    apellido_paterno = p_apellido_paterno,
    apellido_materno = p_apellido_materno,
    correo = p_correo,
    numero_telefono = p_numero_telefono,
    dni = p_dni
  WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('UPDATE', 'usuarios', CONCAT('Update usuario ', BIN_TO_UUID(p_id)), NULL);
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_eliminar_usuario (
  IN p_id BINARY(16)
)
BEGIN
  DELETE FROM usuarios WHERE id = p_id;
END$$

DELIMITER ;

DELIMITER $$



--  SERVICIOS + CATEGORIA_SERVICIOS  --------------
-- ================================================
DELIMITER $$

CREATE PROCEDURE sp_insertar_servicio (
  IN p_nombre VARCHAR(100),
  IN p_descripcion TEXT,
  IN p_duracion INT,
  IN p_precio DECIMAL(10,2),
  IN p_estado BOOLEAN,
IN p_id_categoria INT
)
BEGIN
  DECLARE v_id BINARY(16);
  SET v_id = UUID_TO_BIN(UUID());

  INSERT INTO servicios (
    id, id_categoria, nombre, descripcion, duracion, precio, estado
  ) VALUES (
    v_id, p_id_categoria, p_nombre, p_descripcion, p_duracion, p_precio, p_estado
  );

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('INSERT', 'servicios', CONCAT('Insert servicio ', BIN_TO_UUID(v_id)), NULL);
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_actualizar_servicio (
  IN p_id BINARY(16),
  IN p_id_categoria INT,
  IN p_nombre VARCHAR(100),
  IN p_descripcion TEXT,
  IN p_duracion INT,
  IN p_precio DECIMAL(10,2),
  IN p_estado BOOLEAN
)
BEGIN
  UPDATE servicios
  SET
    id_categoria = p_id_categoria,
    nombre = p_nombre,
    descripcion = p_descripcion,
    duracion = p_duracion,
    precio = p_precio,
    estado = p_estado
  WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('UPDATE', 'servicios', CONCAT('Update servicio ', BIN_TO_UUID(p_id)), NULL);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminar_servicio (
  IN p_id BINARY(16)
)
BEGIN
  DELETE FROM servicios WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('DELETE', 'servicios', CONCAT('Delete servicio ', BIN_TO_UUID(p_id)), NULL);
END$$

DELIMITER ;



--  VETERINARIOS + TIPO_ESPECIALIDAD  --------------
-- =================================================

DELIMITER $$

CREATE PROCEDURE sp_insertar_veterinario (
  IN p_nombre VARCHAR(100),
  IN p_apellido_paterno VARCHAR(100),
  IN p_apellido_materno VARCHAR(100),
  IN p_correo VARCHAR(100),
  IN p_numero_telefono VARCHAR(20),
  IN p_dni VARCHAR(20),
  IN p_estado BOOLEAN,
  IN p_id_especialidad INT
)
BEGIN
  DECLARE v_id BINARY(16);
  SET v_id = UUID_TO_BIN(UUID());

  INSERT INTO veterinario (
    id, nombre, apellido_paterno, apellido_materno,
    correo, numero_telefono, dni, estado, id_especialidad
  ) VALUES (
    v_id, p_nombre, p_apellido_paterno, p_apellido_materno,
    p_correo, p_numero_telefono, p_dni, p_estado, p_id_especialidad
  );

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('INSERT', 'veterinario', CONCAT('Insert veterinario ', BIN_TO_UUID(v_id)), NULL);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_actualizar_veterinario (
  IN p_id BINARY(16),
  IN p_nombre VARCHAR(100),
  IN p_apellido_paterno VARCHAR(100),
  IN p_apellido_materno VARCHAR(100),
  IN p_correo VARCHAR(100),
  IN p_numero_telefono VARCHAR(20),
  IN p_dni VARCHAR(20),
  IN p_estado BOOLEAN,
  IN p_id_especialidad INT
)
BEGIN
  UPDATE veterinario
  SET
    nombre = p_nombre,
    apellido_paterno = p_apellido_paterno,
    apellido_materno = p_apellido_materno,
    correo = p_correo,
    numero_telefono = p_numero_telefono,
    dni = p_dni,
    estado = p_estado,
    id_especialidad = p_id_especialidad
  WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('UPDATE', 'veterinario', CONCAT('Update veterinario ', BIN_TO_UUID(p_id)), NULL);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE sp_eliminar_veterinario (
  IN p_id BINARY(16)
)
BEGIN
  DELETE FROM veterinario WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES ('DELETE', 'veterinario', CONCAT('Delete veterinario ', BIN_TO_UUID(p_id)), NULL);
END$$

DELIMITER ;


--  ORDENES Y DETALLE_ORDEN   ----------------------
-- =================================================
DELIMITER $$

create PROCEDURE sp_actualizar_orden (
  IN p_id BINARY(16),
  IN p_id_mascota BINARY(16),
  IN p_id_veterinario BINARY(16),
  IN p_estado BOOLEAN,
  IN p_id_asistente BINARY(16),
  IN p_fecha DATE,
  IN p_hora_inicio TIME
)
BEGIN
  DECLARE v_total_duracion INT DEFAULT 0;

  -- Calcular duración total de los servicios asociados a esta orden
  SELECT SUM(s.duracion)
  INTO v_total_duracion
  FROM detalle_orden d
  JOIN servicios s ON s.id = d.id_servicio
  WHERE d.id_orden = p_id;

  -- Calcular hora_fin
  SET @hora_fin := ADDTIME(p_hora_inicio, SEC_TO_TIME(v_total_duracion * 60));

  -- Actualizar orden con nueva hora_fin calculada
  UPDATE ordenes
  SET
    id_mascota = p_id_mascota,
    id_veterinario = p_id_veterinario,
    estado = p_estado,
    fecha = p_fecha,
    hora_inicio = p_hora_inicio,
    hora_fin = @hora_fin
  WHERE id = p_id;

  -- Auditoría
  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES (
    'UPDATE',
    'ordenes',
    CONCAT('Update orden ', BIN_TO_UUID(p_id)),
    p_id_asistente
  );
END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE sp_eliminar_orden (
  IN p_id BINARY(16),
  IN p_id_asistente BINARY(16)
)
BEGIN
  DELETE FROM detalle_orden WHERE id_orden = p_id;
  DELETE FROM ordenes WHERE id = p_id;

  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES (
    'DELETE', 'ordenes',
    CONCAT('Delete orden ', BIN_TO_UUID(p_id)),
    p_id_asistente
  );
END$$

DELIMITER ;


use db_vet

DELIMITER $$

create PROCEDURE sp_insertar_orden (
  IN p_id_mascota BINARY(16),
  IN p_id_veterinario BINARY(16),
  IN p_id_asistente BINARY(16),
  IN p_fecha DATE,
  IN p_hora_inicio TIME,
  IN p_servicios TEXT,
  IN p_estado BOOLEAN
)
BEGIN
  DECLARE v_id_orden BINARY(16);
  DECLARE v_pos INT DEFAULT 1;
  DECLARE v_coma INT;
  DECLARE v_servicio_uuid VARCHAR(36);
  DECLARE v_total_duracion INT DEFAULT 0;

  SET v_id_orden = UUID_TO_BIN(UUID());

  -- Calcular duración total
  WHILE v_pos > 0 DO
    SET v_coma = LOCATE(',', p_servicios, v_pos);
    IF v_coma = 0 THEN
      SET v_servicio_uuid = SUBSTRING(p_servicios, v_pos);
      SET v_pos = 0;
    ELSE
      SET v_servicio_uuid = SUBSTRING(p_servicios, v_pos, v_coma - v_pos);
      SET v_pos = v_coma + 1;
    END IF;

    IF TRIM(v_servicio_uuid) != '' THEN
      SELECT COALESCE(duracion, 0) INTO @dur
      FROM servicios WHERE id = UUID_TO_BIN(v_servicio_uuid);

      SET v_total_duracion = v_total_duracion + @dur;
    END IF;
  END WHILE;

  -- Calcular hora_fin
  SET @hora_fin := ADDTIME(p_hora_inicio, SEC_TO_TIME(v_total_duracion * 60));

  -- Insertar orden con estado recibido
  INSERT INTO ordenes (
    id, fecha, hora_inicio, hora_fin, estado,
    id_mascota, id_veterinario, id_asistente
  ) VALUES (
    v_id_orden, p_fecha, p_hora_inicio, @hora_fin, p_estado,
    p_id_mascota, p_id_veterinario, p_id_asistente
  );

  -- Insertar detalle orden
  SET v_pos = 1;
  WHILE v_pos > 0 DO
    SET v_coma = LOCATE(',', p_servicios, v_pos);
    IF v_coma = 0 THEN
      SET v_servicio_uuid = SUBSTRING(p_servicios, v_pos);
      SET v_pos = 0;
    ELSE
      SET v_servicio_uuid = SUBSTRING(p_servicios, v_pos, v_coma - v_pos);
      SET v_pos = v_coma + 1;
    END IF;

    IF TRIM(v_servicio_uuid) != '' THEN
      INSERT INTO detalle_orden (id, id_orden, id_servicio)
      VALUES (
        UUID_TO_BIN(UUID()),
        v_id_orden,
        UUID_TO_BIN(v_servicio_uuid)
      );
    END IF;
  END WHILE;

  -- Auditoría
  INSERT INTO registro (accion, tabla_afectada, descripcion, id_asistente)
  VALUES (
    'INSERT', 'ordenes',
    CONCAT('Insert orden ', BIN_TO_UUID(v_id_orden)),
    p_id_asistente
  );
END$$

DELIMITER ;





--  ASISTENTES ----------------------
-- =================================================
DELIMITER $$
CREATE PROCEDURE sp_crear_asistente (
    IN p_id BINARY(16),
    IN p_nombre VARCHAR(50),
    IN p_apellido_paterno VARCHAR(50),
    IN p_apellido_materno VARCHAR(50),
    IN p_correo VARCHAR(100),
    IN p_numero_telefono VARCHAR(20),
    IN p_dni VARCHAR(20),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    INSERT INTO asistente (
        id, nombre, apellido_paterno, apellido_materno, correo, numero_telefono, dni, password_hash
    ) VALUES (
        p_id, p_nombre, p_apellido_paterno, p_apellido_materno, p_correo, p_numero_telefono, p_dni, p_password_hash
    );
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_buscar_asistente_por_correo (
    IN p_correo VARCHAR(100)
)
BEGIN
    SELECT 
        BIN_TO_UUID(id) AS id,
        nombre, apellido_paterno, apellido_materno,
        correo, numero_telefono, dni, password_hash
    FROM asistente
    WHERE correo = p_correo;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_buscar_asistente_por_id (
    IN p_id BINARY(16)
)
BEGIN
    SELECT 
        BIN_TO_UUID(id) AS id,
        nombre, apellido_paterno, apellido_materno,
        correo, numero_telefono, dni
    FROM asistente
    WHERE id = p_id;
END$$
DELIMITER ;



--  CATEGORIA_SERVICIOS + TIPO_ESPECIALIDAD --------------
-- ================================================
DELIMITER $$

CREATE PROCEDURE sp_eliminar_especialidad_categoria (
  IN p_id_especialidad INT,
  IN p_id_categoria INT
)
BEGIN
  DELETE FROM especialidad_categorias
  WHERE id_especialidad = p_id_especialidad AND id_categoria = p_id_categoria;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_get_usuario_con_mascotas (IN p_dni VARCHAR(20))
BEGIN
  -- Obtener información del usuario
  SELECT 
    BIN_TO_UUID(u.id) AS id,
    u.nombre,
    u.apellido_paterno,
    u.apellido_materno,
    u.correo,
    u.numero_telefono,
    u.dni
  FROM usuarios u
  WHERE u.dni = p_dni;

  -- Obtener sus mascotas
  SELECT 
    BIN_TO_UUID(m.id) AS id_mascota,
    m.nombre AS nombre_mascota,
    m.raza,
    m.edad,
    m.sexo,
    m.estado,
    m.imagen,
    tm.nombre AS tipo_mascota
  FROM mascotas m
  JOIN usuarios u ON m.id_usuario = u.id
  JOIN tipo_mascota tm ON m.id_tipo_mascota = tm.id
  WHERE u.dni = p_dni;
END $$

DELIMITER ;



DELIMITER //

CREATE PROCEDURE sp_veterinarios_por_categoria(IN cat_id INT)
BEGIN
  SELECT 
    BIN_TO_UUID(v.id) AS id_veterinario,
    CONCAT(v.nombre, ' ', v.apellido_paterno, ' ', v.apellido_materno) AS nombre
  FROM veterinario v
  JOIN tipo_especialidad te ON v.id_especialidad = te.id
  JOIN especialidad_categorias ec ON ec.id_especialidad = te.id
  WHERE ec.id_categoria = cat_id
    AND v.estado = TRUE;
END //

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE sp_obtener_historial_ordenes_mascota(IN mascota_id BINARY(16))
BEGIN
  SELECT 
    BIN_TO_UUID(o.id) AS id_orden,
    o.fecha,
    TIME_FORMAT(o.hora_inicio, '%H:%i') AS hora_inicio,
    TIME_FORMAT(o.hora_fin, '%H:%i') AS hora_fin,
    s.nombre AS servicio,
    s.descripcion,
    CONCAT(v.nombre, ' ', v.apellido_paterno) AS veterinario,
    o.estado
  FROM ordenes o
  JOIN detalle_orden d ON o.id = d.id_orden
  JOIN servicios s ON d.id_servicio = s.id
  JOIN veterinario v ON o.id_veterinario = v.id
  WHERE o.id_mascota = mascota_id AND o.estado = TRUE
  ORDER BY o.fecha DESC;
END$$

DELIMITER ;

































