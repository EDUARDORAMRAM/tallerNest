import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  private employees = [{

    id:1,
    name: "eduardo",
    lastName:"Ramirez",
    celphone:"4444444"
  },
  {
    id:2,
    name: "yo otra vez",
    lastName:"Ramirez",
    celphone:"444466666"
  }
]

  create(createEmployeeDto: CreateEmployeeDto) {
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees[id];
    if (!employee) throw new NotFoundException(`Employee #${id} not found`);
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.employees[id];
    if (!employee) throw new NotFoundException(`Employee #${id} not found`);
    this.employees[id] = { ...employee, ...updateEmployeeDto };
    return this.employees[id];
  }

  remove(id: number) {
    const employee = this.employees[id];
    if (!employee) throw new NotFoundException(`Employee #${id} not found`);
    this.employees.splice(id, 1);
    return employee;
  }
}
