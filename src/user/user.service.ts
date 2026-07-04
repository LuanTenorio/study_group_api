import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserPgDto } from "./dto/user_pg.dto";
import { UserDto } from "./dto/user.dto";
import { CreateUserPgDto } from "./dto/create_user_pg.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<UserPgDto | undefined> {
        const user = await this.userRepository.findByEmail(email)

        return user
    }

    async create(data: CreateUserPgDto): Promise<UserDto> {
        const user = await this.userRepository.create(data)

        return this.toDto(user)
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