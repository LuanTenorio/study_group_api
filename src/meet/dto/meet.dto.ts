import { UserDto } from "src/user/dto/user.dto";

export class MeetDto {
    id: number
    title: string
    user_id: number
    group_id: number
    date_time: Date
    description: string
    location: string

    user: UserDto
}