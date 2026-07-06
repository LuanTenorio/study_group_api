import { ArrayNotEmpty, IsArray, IsInt, IsString } from "class-validator";

export class UpdateGroupDto {

    @IsString()
    name: string

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each: true})
    areas: number[];
}