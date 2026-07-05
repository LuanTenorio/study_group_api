import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "./dto/register.dto";
import { InstitutionService } from "src/institution/institution.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly institutionService: InstitutionService
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

        const institution = await this.institutionService.findById(registerDto.institution_id);

        if(!institution) {
            throw new BadRequestException('Essa instituição não está cadastrada!')
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