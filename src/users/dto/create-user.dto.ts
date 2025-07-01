import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsEnum(['Intern', 'Employee', 'Manager'], {
        message: 'Role must be one of the following: Intern, Employee, Manager'
    })
    @IsNotEmpty()
    role: 'Intern' | 'Employee' | 'Manager';
}