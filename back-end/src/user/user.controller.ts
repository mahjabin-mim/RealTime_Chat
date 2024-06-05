import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./DTOs/create-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
        return await 'created';
    }

    @Get('findall')
    async findAll() {
        return await this.userService.findAll();
    }

    @Get('search')
    async findOne(@Body() data) {
        return this.userService.findOne(data);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:number) {
        await this.userService.delete(id);
        return await 'Deleted';
    }
}