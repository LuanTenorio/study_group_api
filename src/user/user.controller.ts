import { Body, Controller, Param, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update_user.dto";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserDto> {
        return this.userService.update(id, data)
    }
    
}