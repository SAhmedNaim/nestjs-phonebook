import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel("User") private readonly userModel: Model<User>) {};

    /**
     * Get all Users from Database
     * 
     * @returns 
     */
    async getAllUsers() {
        const users = await this.userModel.find().exec();

        return users.map((user) => ({
            id: user.id,
            name: user.name,
            cell: user.cell,
            age: user.age
        }));
    }

    /**
     * Get one user from Database
     * 
     * @param userId 
     * @returns 
     */
    async getOneUser(userId: string) {
        const user = await this.findUser(userId);

        return {
            id: user.id,
            name: user.name,
            cell: user.cell,
            age: user.age
        };
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    private async findUser(id: string): Promise<User> {
        let user: any;

        try {
            user = await this.userModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException("Sorry! Unable to find the user");
        }

        if(!user) {
            throw new NotFoundException("Sorry! Unable to find the user");
        }

        return user;
    }
}
