import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./DTOs/create-user.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

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

    //@UseGuards(JwtAuthGuard)
    @Get('findall')
    async findAll() {
        return await this.userService.findAll();
    }

    @Get('search')
    async findOne(@Body() data) {
        return this.userService.findOne(data);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('finduser')
    async findUser(@Query('value') value: string) {
        const user = await this.userService.findUser(value);
        if (!user) {
            return { message: 'User not found' };
        }
        return user;
    }

    @Delete('delete/:id')
    async delete(@Param('id') id:number) {
        await this.userService.delete(id);
        return await 'Deleted';
    }
}