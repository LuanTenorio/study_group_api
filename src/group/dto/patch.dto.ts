import { IsNotEmpty, IsString } from "class-validator";

export class PatchGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string
}