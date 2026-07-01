import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { Database } from "src/database/database.module";
import { UserRepository } from "./user.repository";

@Module({
    imports: [Database],
    providers: [UserService, UserRepository],
    exports: [UserService]
})
export class UserModule {}