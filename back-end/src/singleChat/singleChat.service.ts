import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SingleChat } from "src/entities/singleChat.entity";
import { Repository } from "typeorm";
import { SingleChatDto } from "./DTOs/singleChat.dto";

@Injectable()
export class SingleChatService{
    constructor(
        @InjectRepository(SingleChat)
        private readonly singleChatRepo: Repository<SingleChat>,
    ) {}

    async create(singleChatDto: SingleChatDto): Promise<SingleChat> {
        const newMessage = this.singleChatRepo.create(singleChatDto);
        return this.singleChatRepo.save(newMessage);
    }

    async findAll(): Promise<SingleChat[]> {
        return this.singleChatRepo.find();
    }
}