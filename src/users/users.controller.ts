import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Post()
    async createOneUser(
        @Body("name") name: string,
        @Body("cell") cell: string,
        @Body("age") age: number,
    ) {
        const newUserId = await this.userService.createOneUser(name, cell, age);

        return { id: newUserId };
    }

}
