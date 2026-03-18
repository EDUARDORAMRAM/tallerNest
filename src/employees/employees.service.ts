// employees/employees.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    create(createEmployeeDto: CreateEmployeeDto) {
        const employee = this.employeeRepository.create(createEmployeeDto);
        return this.employeeRepository.save(employee);
    }

    findAll() {
        return this.employeeRepository.find();
    }

    async findOne(id: string) {
        const employee = await this.employeeRepository.findOneBy({ id });
        if (!employee) throw new NotFoundException(`Employee #${id} not found`);
        return employee;
    }


    async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const employee = await this.employeeRepository.preload({
            id,
            ...updateEmployeeDto,
        });
        if (!employee) throw new NotFoundException(`Employee #${id} not found`);
        return this.employeeRepository.save(employee);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.employeeRepository.delete({ id });
        return { message: `Employee #${id} has been deleted` };
    }
}