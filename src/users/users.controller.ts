import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(":id")
    getOneUser(@Param("id") userId: string) {
        return this.usersService.getOneUser(userId);
    }

    @Post()
    async createOneUser(
        @Body("name") name: string,
        @Body("cell") cell: string,
        @Body("age") age: number,
    ) {
        const newUserId = await this.usersService.createOneUser(name, cell, age);

        return { id: newUserId };
    }

    @Patch(":id")
    updateuser(
        @Param("id") userId: string,
        @Body("name") name: string,
        @Body("cell") cell: string,
        @Body("age") age: number,
    ) {
        this.usersService.updateUser(userId, name, cell, age);

        return null;
    }

    @Delete(":id")
    deleteUser(@Param("id") userId: string) {
        this.usersService.deleteUser(userId);

        return null;
    }
}
