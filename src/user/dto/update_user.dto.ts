import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    institution_id: number;
}