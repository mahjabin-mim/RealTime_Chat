import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { SingleChatService } from "./singleChat.service";
import { SingleChatDto } from "./DTOs/singleChat.dto";
import { SingleChat } from "src/entities/singleChat.entity";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { log } from "console";

@Controller('singlechat')
export class SingleChatController{
    constructor(private readonly singleChatService: SingleChatService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('newMessage')
    async create(@Body() singleChatDto: SingleChatDto, @Request() req): Promise<SingleChat> {
        const userEmail = req.user.email; 
        log(req.user.email);
        singleChatDto = { ...singleChatDto, sender: userEmail }; 
        return this.singleChatService.create(singleChatDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getChat')
    async findAll(): Promise<SingleChat[]> {
        return this.singleChatService.findAll();
    }
}
