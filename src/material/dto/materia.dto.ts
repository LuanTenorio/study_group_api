import { UserDto } from "src/user/dto/user.dto";

export class MaterialDto {
    id: number
    title: string
    user_id: number
    group_id: number
    file_size: number
    file_content: ArrayBuffer
    file_type: string
    uploaded_at: Date  
    description: string

    user: UserDto
}