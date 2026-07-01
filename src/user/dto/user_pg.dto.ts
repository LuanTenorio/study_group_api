import { UserDto } from "./user.dto";

export class UserPgDto extends UserDto {
    password_hash: string;
}