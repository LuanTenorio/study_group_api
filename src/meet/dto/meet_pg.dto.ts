import { UserDto } from "src/user/dto/user.dto";

export class MeetPGDto implements Omit<UserDto, "id">{
    id: number
    title: string
    user_id: number
    group_id: number
    date_time: Date
    description: string
    location: string

    // User
    name: string;
    email: string;
    institution_id: number;
}