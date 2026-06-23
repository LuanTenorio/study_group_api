import { UserDto } from "src/user/dto/user.dto";

export class UserPGDto {


    id: string;
    name: string;
    email: string;
    institution_id: number;
    hashedpassowrd: string;

}