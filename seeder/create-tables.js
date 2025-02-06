const { initDatabase } = require("../database");

export const createTables = () => {
    const db = initDatabase();
    console.log("🔄 Creating Tables...");

    db.exec(`
        CREATE TABLE IF NOT EXISTS "bank" ( "id" INTEGER NOT NULL UNIQUE, "name"
        TEXT UNIQUE, "telephone" TEXT, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT));
        
        CREATE TABLE IF NOT EXISTS "bank_account" ( "id" INTEGER NOT NULL UNIQUE,
        "account_number" TEXT NOT NULL UNIQUE, "account_holder_name"
        TEXT, "currency_type" INTEGER, "bank" INTEGER, "createdAt"
        DATETIME DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME
        DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("bank") REFERENCES "bank"("id"), FOREIGN
        KEY("currency_type") REFERENCES "currency_type"("id"));
        
        CREATE TABLE IF NOT EXISTS "cardex" ( "id" INTEGER NOT NULL UNIQUE,
        "description" TEXT NOT NULL, "amount" INTEGER, "balance"
        NUMERIC, "addressee" TEXT, "date" DATETIME, "document"
        INTEGER, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN
        KEY("document") REFERENCES "document"("id") );
        
        CREATE TABLE IF NOT EXISTS "client" ( "id" INTEGER NOT NULL UNIQUE, "name"
        TEXT NOT NULL, "address" TEXT, "identification" TEXT NOT
        NULL UNIQUE, "cellphone" TEXT, "credit_apply" INTEGER
        DEFAULT 1, "max_credit" NUMERIC, "credit_currency" INTEGER,
        "createdBy" INTEGER, "department" INTEGER, "seller"
        INTEGER, "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY
        KEY("id" AUTOINCREMENT), FOREIGN KEY("createdBy") REFERENCES
        "user"("id"), FOREIGN KEY("credit_currency") REFERENCES
        "currency_type"("id"), FOREIGN KEY("department") REFERENCES
        "department"("id"), FOREIGN KEY("seller") REFERENCES
        "seller"("id"));
        
        CREATE TABLE IF NOT EXISTS "currency_type" ( "id" INTEGER NOT NULL UNIQUE,
        "name" INTEGER NOT NULL UNIQUE, "symbol" INTEGER NOT NULL,
        "exchange_rate" INTEGER NOT NULL, "createdAt" DATETIME
        DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "department" ( "id" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL UNIQUE, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "document" ( "id" INTEGER NOT NULL UNIQUE,
        "name" INTEGER NOT NULL UNIQUE, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "invoice" ( "id" INTEGER NOT NULL UNIQUE,
        "number" TEXT NOT NULL UNIQUE, "date" DATETIME NOT NULL
        DEFAULT CURRENT_TIMESTAMP, "total" NUMERIC, "discount"
        NUMERIC, "iva" NUMERIC, "discount_applied" NUMERIC, "note"
        TEXT, "net" NUMERIC, "quote" TEXT, "payment_method" INTEGER,
        "currency_type" INTEGER, "status" INTEGER, "client" INTEGER,
        "seller" INTEGER, "bank_account" INTEGER, "invoice_type"
        INTEGER, "createdBy" INTEGER, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN
        KEY("bank_account") REFERENCES "bank_account"("id"), FOREIGN
        KEY("client") REFERENCES "client"("id"), FOREIGN
        KEY("createdBy") REFERENCES "user"("id"), FOREIGN
        KEY("currency_type") REFERENCES "currency_type"("id"),
        FOREIGN KEY("invoice_type") REFERENCES "invoice_type"("id"),
        FOREIGN KEY("payment_method") REFERENCES
        "payment_method"("id"), FOREIGN KEY("seller") REFERENCES
        "seller"("id"), FOREIGN KEY("status") REFERENCES
        "status"("id") );
        
        CREATE TABLE IF NOT EXISTS "invoice_detail" ( "id" INTEGER NOT NULL
        UNIQUE, "unit_price" NUMERIC, "amount" NUMERIC, "discount"
        NUMERIC, "discount_percent" NUMERIC, "iva" NUMERIC,
        "subtotal" NUMERIC, "measurement_unit" INTEGER, "product"
        INTEGER, "invoice" INTEGER, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN
        KEY("invoice") REFERENCES "invoice"("id"), FOREIGN
        KEY("measurement_unit") REFERENCES "measurement_unit"("id"),
        FOREIGN KEY("product") REFERENCES "product"("id") );
        
        CREATE TABLE IF NOT EXISTS "invoice_type" ( "id" INTEGER NOT NULL UNIQUE,
        "name" INTEGER NOT NULL, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "measurement_unit" ( "id" INTEGER NOT NULL
        UNIQUE, "name" INTEGER NOT NULL UNIQUE, "createdAt" DATETIME
        DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "payment_method" ( "id" INTEGER NOT NULL
        UNIQUE, "name" TEXT NOT NULL, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "product" ( "id" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL, "price" NUMERIC, "description" TEXT,
        "iva" NUMERIC, "net" NUMERIC, "quantity" NUMERIC, "life"
        INTEGER, "countable" INTEGER DEFAULT 1, "combo" INTEGER
        DEFAULT 0, "currency_type" INTEGER, "measurement_unit"
        INTEGER, "entry" INTEGER, "category" INTEGER, "warehouse"
        INTEGER, "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY
        KEY("id" AUTOINCREMENT), FOREIGN KEY("category") REFERENCES
        "product_category"("id"), FOREIGN KEY("currency_type")
        REFERENCES "currency_type"("id"), FOREIGN KEY("entry")
        REFERENCES "product_entry"("id"), FOREIGN
        KEY("measurement_unit") REFERENCES "measurement_unit"("id"),
        FOREIGN KEY("warehouse") REFERENCES "warehouse"("id") );
        
        CREATE TABLE IF NOT EXISTS "product_category" ( "id" INTEGER NOT NULL
        UNIQUE, "name" TEXT NOT NULL, "abbreviation" TEXT,
        "createdBy" INTEGER, "createdAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, "updatedAt" DATETIME DEFAULT
        CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN
        KEY("createdBy") REFERENCES "user"("id") );
        
        CREATE TABLE IF NOT EXISTS "product_entry" ( "id" INTEGER NOT NULL UNIQUE,
        "order_number" TEXT NOT NULL, "date" DATETIME, "concept"
        TEXT NOT NULL, "amount" NUMERIC, "state" INTEGER, "product"
        INTEGER, "supplier" INTEGER, "createdBy" INTEGER,
        "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY
        KEY("id" AUTOINCREMENT), FOREIGN KEY("createdBy") REFERENCES
        "user"("id"), FOREIGN KEY("product") REFERENCES
        "product"("id"), FOREIGN KEY("state") REFERENCES
        "status"("id"), FOREIGN KEY("supplier") REFERENCES
        "supplier"("id") );
        
        CREATE TABLE IF NOT EXISTS "role" ( "id" INTEGER NOT NULL UNIQUE, "name"
        TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT) );
        
        CREATE TABLE IF NOT EXISTS "seller" ( "id" INTEGER NOT NULL UNIQUE, "name"
        INTEGER NOT NULL, "createdBy" INTEGER, "createdAt" DATETIME
        DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("createdBy") REFERENCES "user"("id") );
        
        CREATE TABLE IF NOT EXISTS "status" ( "id" INTEGER NOT NULL UNIQUE, "name"
        INTEGER NOT NULL, PRIMARY KEY("id" AUTOINCREMENT));
        
        CREATE TABLE IF NOT EXISTS "supplier" ("id" INTEGER NOT NULL UNIQUE,
        "identification" TEXT UNIQUE,"name" TEXT,
        "representative_name" TEXT,"cellphone" TEXT,
        "createdBy" INTEGER, PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY("createdBy") REFERENCES "user"("id")
        );
        
        CREATE TABLE IF NOT EXISTS "system_setting" ( "id" INTEGER NOT NULL
        UNIQUE, "currency_type" INTEGER, "warehouse" INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT), FOREIGN
        KEY("currency_type") REFERENCES "currency_type"("id") );
        
        CREATE TABLE IF NOT EXISTS "user" ( "id" INTEGER NOT NULL UNIQUE, "name"
        TEXT NOT NULL, "username" TEXT NOT NULL, "password" TEXT NOT
        NULL, "role" INTEGER NOT NULL, "createdBy" INTEGER,
        "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY
        KEY("id" AUTOINCREMENT), FOREIGN KEY("createdBy") REFERENCES
        "user"("id"), FOREIGN KEY("role") REFERENCES "role"("id") );
        
        CREATE TABLE IF NOT EXISTS "warehouse" ( "id" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL, "address" TEXT, "department" INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("department")
        REFERENCES "department"("id") );
    `);

    console.log("✅ Tables were created!.");
}