import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "./dto/register.dto";

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

    async register(registerDto: RegisterDto) {
        const email = registerDto.email.trim().toLocaleLowerCase();

        const existingUser = await this.userService.findByEmail(email);

        if(existingUser) {
            throw new ConflictException('Este e-mail já está cadastrado');
        }

        const password_hash = await bcrypt.hash(registerDto.password, 10);

        const createdUser = await this.userService.create({
            institution_id: registerDto.institution_id,
            name: registerDto.name.trim(),
            email,
            password_hash
        })

        return createdUser;
    }

}