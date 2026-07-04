import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserPgDto } from "./dto/user_pg.dto";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(email: string): Promise<UserPgDto | undefined> {
        const user = await this.userRepository.findByEmail(email)

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