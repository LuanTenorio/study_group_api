import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AreaRepository } from './area.repository';
import { Database } from 'src/database/database.module';

@Module({
  imports: [Database],
  controllers: [AreaController],
  providers: [AreaService, AreaRepository],
})
export class AreaModule {}
