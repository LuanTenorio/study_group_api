import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    institucionId: number


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email! : string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    hashed_password: string




}
