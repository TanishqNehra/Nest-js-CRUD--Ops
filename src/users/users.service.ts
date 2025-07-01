import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
    private users =[
        { id: 1, name: 'Tanishq',email: 'tanishq@test.com', role: 'Intern' },
        { id: 2, name: 'John',email: 'john@test.com', role: 'Employee' },
        { id: 3, name: 'Jane', email: 'jane@test.com', role: 'Manager' },
        { id: 4, name: 'Doe', email: 'doe@test.com', role: 'Intern' },
        { id: 5, name: 'Alice', email: 'alice@test.com', role: 'Employee' },
        { id: 6, name: 'Bob', email: 'bob@test.com', role: 'Manager' },
        { id: 7, name: 'Charlie', email: 'charlie@test.com', role: 'Intern' },
        { id: 8, name: 'David', email: 'david@test.com', role: 'Employee' },
        { id: 9, name: 'Eve', email: 'eve@test.com', role: 'Manager' },
        { id: 10, name: 'Frank', email: 'frank@test.com', role: 'Intern' }
        ];

    findAll(role?: 'Intern' | 'Employee' | 'Manager') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if( rolesArray.length === 0) {
                throw new NotFoundException(`No users found with role ${role}`);
            }
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if(!user) throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const newUser = { id: this.users.length + 1, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto:UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null; 
        }
        const updated = { ...this.users[userIndex], ...updateUserDto };
        this.users[userIndex] = updated;
        return updated;
    }

    delete(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return null; 
        }
        const deletedUser = this.users.splice(userIndex, 1);
        return deletedUser[0];
    }


}
