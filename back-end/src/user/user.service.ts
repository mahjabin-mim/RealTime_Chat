import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./DTOs/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const user = this.userRepo.create({
          ...createUserDto,
          password: hashedPassword,
        });
        return await this.userRepo.save(user);
    }

    async findAll() {
        return await this.userRepo.find();
    }

    // async findOne(data) {
    //     const user = await this.userRepo.findOne({
    //       where: [{ name: data.val }, { email: data.val }],
    //     });
    //     if (user) return user;
    //     else throw new NotFoundException('No user found');
    //   }

    async findOne(data:any) {
        //find by id
        const val = parseInt(data);
        if(Number.isInteger(val)) {
            return await this.userRepo.findOne({
                where: { id: parseInt(data)},
            })
        }
        //find by email
        return await this.userRepo.findOne({where: {email:data}});
    }

    async delete(id: number) {
        return await this.userRepo.delete(id);
    }

    private async hashPassword(password: string): Promise<string> {
        const applyTimes = 10;
        return await bcrypt.hash(password, applyTimes);
    }
}