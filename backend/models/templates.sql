-- Tabla foods (antes comidas)
CREATE TABLE foods (
    food_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('Proteína', 'Carbohidrato', 'Grasa saludable', 'Vegetal', 'Fruta', 'Otro') NOT NULL,
    image VARCHAR(255)
);

-- Tabla exercises (antes ejercicios)
CREATE TABLE exercises (
    exercise_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    muscle ENUM('Pecho', 'Espalda', 'Piernas', 'Hombros', 'Biceps', 'Triceps', 'Abdomen', 'Cardio Full', 'Otro') NOT NULL,
    type ENUM('Fuerza', 'Cardio', 'Flexibilidad', 'HIIT') NOT NULL,
    equipment ENUM('Mancuernas', 'Barra', 'Máquina', 'Cuerpo libre', 'Banda elástica', 'Otro') DEFAULT 'Cuerpo libre',
    description TEXT,
    image VARCHAR(255)
) ENGINE=InnoDB;

-- Insert de ejemplo CORREGIDO (usar nombres de columnas en inglés):
INSERT INTO foods (name, type, image) VALUES
('Pechuga de pollo', 'Proteína', 'pechuga_pollo.jpg'),
('Arroz integral', 'Carbohidrato', 'arroz-integral.jpg'),
('Aguacate', 'Grasa saludable', 'aguacate.jpg');

INSERT INTO exercises (name, muscle, type, equipment) VALUES
('Press banca', 'Pecho', 'Fuerza', 'Barra'),
('Sentadillas', 'Piernas', 'Fuerza', 'Cuerpo libre'),
('Burpees', 'Cardio Full', 'HIIT', 'Cuerpo libre');

-- Tablas intermedias (mejoras clave):
CREATE TABLE user_food_day (
    register_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    date DATE NOT NULL,
    grams DECIMAL(8,2) NOT NULL DEFAULT 100,
    meal_type ENUM('Desayuno', 'Almuerzo', 'Cena', 'Snack') DEFAULT 'Almuerzo',
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE,
    INDEX idx_user_food (user_id, date)
);

CREATE TABLE user_exercise_day (
    register_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    exercise_id INT NOT NULL,
    date DATE NOT NULL,
    series INT DEFAULT 3 NOT NULL,
    reps INT DEFAULT 10 NOT NULL,
    weight_kg DECIMAL(8,2) NULL,
    intensity ENUM('Fácil', 'Moderado', 'Difícil') DEFAULT 'Moderado',
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id) ON DELETE CASCADE,
    INDEX idx_user_exercise (user_id, date)
);