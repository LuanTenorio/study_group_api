import { IsNumber, IsString } from "class-validator";

export class CreateGroupDto {

    @IsString()
    name: string;

    @IsNumber()
    areaId: number;
}