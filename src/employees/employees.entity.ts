// filepath: nest-learn/src/employees/employee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Role {
    Intern = 'Intern',
    Employee = 'Employee',
    Manager = 'Manager',
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;
}