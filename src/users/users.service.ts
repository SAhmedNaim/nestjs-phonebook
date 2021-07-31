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
     * Create an User to Database
     * 
     * @param name 
     * @param cell 
     * @param age 
     * @returns 
     */
    async createOneUser(name: string, cell: string, age: number) {
        const newUser = new this.userModel({
            name, cell, age
        });

        const result = await newUser.save();

        return result.id as string;
    }

    /**
     * Update single user by Id
     * 
     * @param userId 
     * @param name 
     * @param cell 
     * @param age 
     */
    async updateUser(userId: string, name: string, cell: string, age: number) {
        const modifiedUser = await this.findUser(userId);

        if(name) modifiedUser.name = name;
        if(cell) modifiedUser.cell = cell;
        if(age) modifiedUser.age = age;

        modifiedUser.save();
    }

    /**
     * Delete user from Database
     * 
     * @param userId 
     */
    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();        

        if(result.n === 0) {
            throw new NotFoundException("Sorry! Unable to find the user");
        }
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
