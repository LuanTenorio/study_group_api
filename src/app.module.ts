import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import { MeetModule } from './meet/meet.module';

@Module({
  imports: [
    Database,
    ConfigModule.forRoot({ isGlobal: true }),
    GroupModule,
    MeetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
