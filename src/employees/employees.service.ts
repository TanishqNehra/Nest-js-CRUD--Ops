import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';
import { EmployeeCreateDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Role } from './employees.entity';
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: EmployeeCreateDto) {
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      role: createEmployeeDto.role as Role,
    });
  return this.employeeRepository.save(employee);
  }

  async findAll(role?: Role) {
    if (role) {
      return this.employeeRepository.find({ where: { role } });
    }
    return this.employeeRepository.find();
  }

  async findOne(id: number) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  await this.findOne(id); // throws if not found
  const updateData = {
    ...updateEmployeeDto,
    role: updateEmployeeDto.role as Role,
  };
  await this.employeeRepository.update(id, updateData);
  return this.findOne(id);
}

  async remove(id: number) {
    const employee = await this.findOne(id);
    await this.employeeRepository.delete(id);
    return employee;
  }
}