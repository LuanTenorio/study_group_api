import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AppService {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}
  
  async getHello() {
    const result = await this.pool.query("select * from teste;")
    
    return result.rows
  }
}
