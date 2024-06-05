import { Controller, Module } from "@nestjs/common";
import { SingleChatController } from "./singleChat.controller";
import { SingleChatService } from "./singleChat.service";
import { SingleChat } from "src/entities/singleChat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([SingleChat])],
    controllers: [SingleChatController],
    providers: [SingleChatService],
})

export class SingleChatModule {}