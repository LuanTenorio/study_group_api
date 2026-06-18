import { UserDto } from "src/user/dto/user.dto";

export class CommentPGDto implements Omit<UserDto, "id"> {
    id: number
    user_id: number
    group_id: number
    created_at: Date
    description: string 

    // User
    name: string;
    email: string;
    institution_id: number;
}