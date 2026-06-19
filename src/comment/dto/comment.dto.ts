import { UserDto } from "src/user/dto/user.dto";

export class CommentDto {
    id: number
    group_id: number
    created_at: Date
    description: string 

    user: UserDto
}