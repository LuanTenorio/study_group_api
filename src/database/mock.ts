import { Pool } from "pg";
import { loadEnvFile } from 'node:process';
import { readFileSync } from "node:fs";

(async () => {
    loadEnvFile()

    const pool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    console.time("mock")
    
    console.log("Lendo o script da tabela...")
    const tablesQuery = readFileSync(`${__dirname}/tables_mock.sql`, "utf8")

    console.log("Criando as tabelas...")
    await pool.query(tablesQuery)

    pool.end()
    console.timeEnd("mock")
})()

