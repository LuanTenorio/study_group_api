import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { Database } from 'src/database/database.module';
import { InstitutionModule } from "src/institution/institution.module";
import { UserController } from "./user.controller";


@Module({
  controllers: [UserController],
  imports: [Database, InstitutionModule],
  providers: [UserService, UserRepository],
  exports: [ UserService]
})
export class UserModule {}
