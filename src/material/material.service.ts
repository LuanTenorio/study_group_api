import { Injectable } from '@nestjs/common';
import { MaterialRepository } from './material.repository';
import { MaterialPGDto } from './dto/material_pg.dto';
import { MaterialDto } from './dto/materia.dto';

@Injectable()
export class MaterialService {

  constructor(private readonly materialRepository: MaterialRepository) {}

  async findByGroupId(id: number){
    const materials = await this.materialRepository.findByGroupId(id)
    
    return materials.map(comment => this.formatMaterial(comment))
  }

  formatMaterial(materialPg: MaterialPGDto): MaterialDto {
    const {id, description, email, file_content, file_size, file_type, group_id, institution_id, uploaded_at, name, user_id} = materialPg
    
    return {
      id, user_id, description, group_id, file_content, file_size, file_type, uploaded_at,
      user: {
        email, id: user_id, institution_id, name
      }
    }
  }

}
