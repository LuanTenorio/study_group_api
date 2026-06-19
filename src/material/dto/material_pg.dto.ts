import { UserDto } from "src/user/dto/user.dto";

export class MaterialPGDto implements Omit<UserDto, "id"> {
    id: number
    user_id: number
    group_id: number
    file_size: number
    file_content: ArrayBuffer
    file_type: string
    uploaded_at: Date  
    description: string

    // User
    name: string;
    email: string;
    institution_id: number;
}