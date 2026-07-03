import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserPgDto } from "./dto/user_pg.dto";
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository){}

  async create(data: CreateUserDto) {
    const hashed_password = await bcrypt.hash(data.password, 10);
    data.password = hashed_password;

    const name =await this.userRepository.create(data);

    return `usuário ${name} criado com sucesso!`;
  }


  
  async findAll() {
    const users = await this.userRepository.findAll
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<UserPgDto | undefined> {
        const user = await this.userRepository.findByEmail(email)

        if(!user)
              throw new NotFoundException()

        return user
    }

    toDto(user: UserPgDto): UserDto {
        return {
            id: user.id,
            institution_id: user.institution_id,
            name: user.name,
            email: user.email,
        };
    }
}
