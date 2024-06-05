import { Controller, Post, Get, Param, Body, Delete, UseGuards, Request } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationDto } from './DTOs/conversation.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() conversationDto: ConversationDto, @Request() req){
    const userId = req.user.id; 
    // if (!conversationDto.users.includes(userId)) {
    //     conversationDto.users.push(userId);
    // }
    conversationDto.users.push(userId);
    //conversationDto.users = [...conversationDto.users, userId];
    return this.conversationService.create(conversationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAll')
  async findAll(){
    return this.conversationService.findAll();
  }

  @Get('getOne/:id')
  async findOne(@Param('id') id: number) {
    return this.conversationService.findOne(id);
  }

  @Delete('delete/:id')
  async removeConversation(@Param('id') id: number) {
    return this.conversationService.delete(id);
  }
}
