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
    
    
    try{
        console.log("Lendo o script da tabela...")
        const tablesQuery = readFileSync(`${__dirname}/scripts/tables_mock.sql`, "utf8")
        await pool.query(tablesQuery)
        console.log("Criando as tabelas...")

        console.log("Lendo o script da trigger...")
        const triggerQuery = readFileSync(`${__dirname}/scripts/trigger.sql`, "utf8")
        await pool.query(triggerQuery)
        console.log("Criando a trigger...")

        console.log("Lendo o script da procedure...")
        const procedureQuery = readFileSync(`${__dirname}/scripts/procedure.sql`, "utf8")
        await pool.query(procedureQuery)
        console.log("criando a procedure...")

        console.log("Lendo o script da view")
        const viewQuery = readFileSync(`${__dirname}/scripts/view.sql`, "utf8")
        await pool.query(viewQuery)
        console.log("criando view...")

        console.log("Lendo o script da seed")
        const seedQuery = readFileSync(`${__dirname}/scripts/seed.sql`, "utf8")
        await pool.query(seedQuery)
        console.log("populando as tabelas...")
    } catch(e){
        console.error(e)
    }

    pool.end()
    console.timeEnd("mock")
})()

