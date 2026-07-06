import { ArrayNotEmpty, IsArray, IsInt, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each: true})
    areas: number[];
}