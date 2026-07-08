import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { MaterialQuery } from './query.enum';
import { MaterialPGDto as MaterialPGDto } from './dto/material_pg.dto';

@Injectable()
export class MaterialRepository {

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async findByGroupId(group_id: number) {
    const materials = await this.pool.query<MaterialPGDto>(MaterialQuery.SELECT_BY_GROUP_ID, [group_id])

    return materials.rows
  }

  async findById(id: number){
      const material = await this.pool.query<MaterialPGDto>(MaterialQuery.SELECT_BY_ID, [id])
      return material.rows[0]
  }

  async createMaterial(title: string, user_id: number, group_id: number, description: string, file_content: Buffer,file_size: number,  file_type: string) {
    const material = await this.pool.query<MaterialPGDto>(MaterialQuery.CREATE, [title, user_id, group_id, file_size, file_content, file_type, description])
    return material.rows[0]
  }

  async updateMaterial(title: string, file_size: number, file_content: Buffer, file_type: string, description: string, id: number) {
    const material = await this.pool.query<MaterialPGDto>(MaterialQuery.UPDATE, [title, file_size, file_content, file_type, description, id])
    return material.rows[0]
  }

  async deleteMaterial(id: number, group_id: number) {
    const material = await this.pool.query<MaterialPGDto>(MaterialQuery.DELETE, [id, group_id])
    return material.rows[0]
  }

}
