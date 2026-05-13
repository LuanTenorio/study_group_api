import { Module } from "@nestjs/common";
import { databaseProvider } from "./pool";

@Module({
    providers: [databaseProvider],
    exports: [databaseProvider]
})
export class Database { }