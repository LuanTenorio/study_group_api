import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsInt()
    @Min(1)
    institution_id: number;
}