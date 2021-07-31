import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    getOneUser(@Param("id") userId: string) {
        return this.userService.getOneUser(userId);
    }
}
