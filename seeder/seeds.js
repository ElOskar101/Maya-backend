require('dotenv').config();

export default {
    bank: `INSERT INTO bank (name, telephone) VALUES ('LAFISE', '+505 2255-8888'), ('BANPRO', '+505 2255 9595'),
           ('FICOSA', '+505 2255 8000'),  ('BAC', '+505 2274 4505')`,

    currency_type:`INSERT INTO currency_type (name, symbol, exchange_rate) VALUES ('Dólar', '$', '1'),
        ('Córdoba', 'C$', '35.6')`,

    department: `INSERT INTO department (name, abbreviation) VALUES ('Managua', 'M'),('Granada', 'GR'),
        ('Masaya', 'MY'), ('León', 'LE'), ('Chinandega', 'CH'), ('Carazo', 'CZ'), ('Rivas', 'RI'),('Estelí', 'ES'),
        ('Madriz', 'MZ'), ('Nueva Segovia', 'NS'), ('Jinotega', 'JI'), ('Matagalpa', 'MT'), ('Boaco', 'BO'),
        ('Chontales', 'CO'), ('Río San Juan', 'RS'), ('RAAN', 'RACCN'), ('RAAS', 'RACCS');`,

    document:`INSERT INTO document (name) VALUES ('Orden de venta'), ('Orden de entrada'), 
        ('Orden de salida'), ('Orden de compra');`,

    measurement_unit:`INSERT INTO measurement_unit (name, abbreviation) VALUES ('Libra', 'lb'), ('Kilogramo', 'kg'),
        ('Gramo', 'g'), ('Tonelada', 't'), ('Litro', 'L'), ('Mililitro', 'mL'), ('Galón', 'gal'), ('Metro', 'm'),
        ('Centímetro', 'cm'), ('Milímetro', 'mm'), ('Pulgada', 'in'), ('Pie', 'ft'), ('Unidad', 'unid'), 
        ('Docena', 'doc'), ('Ciento', 'cien'), ('Caja', 'caja'), ('Paquete', 'paq'), ('Bolsa', 'bolsa');`,

    payment_method:`INSERT INTO payment_method (name) VALUES ('Transferencia bancaria'),('Efectivo'), ('Crédito')`,

    invoice_status:`INSERT INTO invoice_status (name) VALUES ('Pendiente'), ('Cancelado'), ('Facturado'), 
        ('En Revisión');`,

    invoice_type:`INSERT INTO invoice_type (name) VALUES ('Cotizacion'), ('Factura');`,

    product_status:`INSERT INTO product_status (name) VALUES ('Pendiente'), ('Agotado'), ('Vigente'), 
        ('Vencido'), ('Descompuesto'), ('Usado'), ('Nuevo');`,

    role:`INSERT INTO role (name) VALUES ('superadmin'), ('admin'), ('standard');`,

    system_setting:`INSERT INTO system_setting (currency_type, warehouse) VALUES (2, NULL);`,

    user:`INSERT INTO user (name, username, password, role, createdBy) VALUES ('Maya Systems', 'maya', 
        '$2b$10$tlBrV/cr7usc6mEg53e9E.7QPt4R/cnuqAjQVagKQRQjI8itJCJ8G', 1, NULL);`

}
