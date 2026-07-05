import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import { MeetModule } from './meet/meet.module';
import { CommentModule } from './comment/comment.module';
import { NoticeModule } from './notice/notice.module';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    Database,
    ConfigModule.forRoot({ isGlobal: true }),
    GroupModule,
    MeetModule,
    CommentModule,
    NoticeModule,
    MaterialModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
