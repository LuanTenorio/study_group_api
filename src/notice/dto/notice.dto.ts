import { UserDto } from "src/user/dto/user.dto";

export class NoticeDto {
    id: number
    user_id: number
    group_id: number
    created_at: Date
    expiration_date: Date  
    description: string 

    user: UserDto
}