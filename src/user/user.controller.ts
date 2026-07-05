import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserPgDto } from './dto/create_user_pg.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserPgDto) {
    return this.userService.create(createUserDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  
  @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserDto> {
        return this.userService.update(id, data)
    }
}

