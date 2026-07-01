import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const email = loginDto.email.trim().toLowerCase();

        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const passwordMatches = await bcrypt.compare(
            loginDto.password,
            user.password_hash
        );

        if(!passwordMatches) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            name: user.name,
            email: user.email,
            institution_id: user.institution_id
        });

        return {
            accessToken,
            user: this.userService.toDto(user)
        };
    }
}