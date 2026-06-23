import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { Database } from 'src/database/database.module';

@Module({
  imports: [Database],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [
          UserService
      ]
})
export class UserModule {}
