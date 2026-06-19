import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Database } from 'src/database/database.module';
import { MaterialRepository } from './material.repository';

@Module({
    imports: [Database],
    controllers: [MaterialController],
    providers: [
        MaterialService, 
        MaterialRepository
    ],
})
export class MaterialModule {}
