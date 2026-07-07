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

  async findById(id: number){
    const material = await this.materialRepository.findById(id)
    return material ? this.formatMaterial(material) : null
  }

  async createMaterial(user_id: number,group_id: number,file: any,description: string,) {
    const material = await this.materialRepository.createMaterial(user_id,group_id,description,file.buffer,file.size,file.mimetype,);
    return material ? this.formatMaterial(material) : null;
  }

  async updateMaterial(id: number,description: string,file?: any,) {
  const material = await this.materialRepository.updateMaterial(
    file.size,
    file.buffer,
    file.mimetype,
    description,
    id,
  );
    return material ? this.formatMaterial(material) : null;
  }

  async deleteMaterial(id: number, group_id: number) {
    const material = await this.materialRepository.deleteMaterial(id, group_id)
    return material ? this.formatMaterial(material) : null
  }

  async download(id: number) {
    return this.materialRepository.findById(id);
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
