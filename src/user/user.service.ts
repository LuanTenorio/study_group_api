import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserPgDto } from "./dto/user_pg.dto";
import { UserDto } from "./dto/user.dto";
import { CreateUserPgDto } from "./dto/create_user_pg.dto";
import { UpdateUserDto } from "./dto/update_user.dto";
import { InstitutionService } from "src/institution/institution.service";
import { DatabaseError } from "pg";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly institutionService: InstitutionService) {}

    async findByEmail(email: string): Promise<UserPgDto | undefined> {
        const user = await this.userRepository.findByEmail(email)

        return user
    }

    async create(data: CreateUserPgDto): Promise<UserDto> {
        const user = await this.userRepository.create(data)

        return this.toDto(user)
    }

    async update(userId: number, data: UpdateUserDto): Promise<UserDto> {

        try {
            const user = await this.userRepository.update(userId, data)

            if(!user) {
                throw new NotFoundException('Usuário não encontrado!')
            }

            return user
        } catch (error) {
            if(error instanceof DatabaseError) {
                if(error.code == '23505') {
                    throw new ConflictException('Este e-mail já está em uso!')
                }
                if(error.code == '23503') {
                    throw new NotFoundException('Essa instituição não está cadastrada.')
                }
            }
            throw error
        }
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