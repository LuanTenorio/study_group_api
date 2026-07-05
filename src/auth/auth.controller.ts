import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("login")
    async login(@Body() {email, password} : LoginDto) {
        return this.authService.login({email, password});
    }

    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}