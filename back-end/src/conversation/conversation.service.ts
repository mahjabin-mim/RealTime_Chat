import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { Repository } from 'typeorm';
import { ConversationDto } from './DTOs/conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(conversationDto: ConversationDto) {
    const { name, users } = conversationDto;
    const conversation = this.conversationRepository.create({
      name,
      users,
    });
    return this.conversationRepository.save(conversation);
  }

  async findAll() {
    return this.conversationRepository.find();
  }

  async findOne(id: number) {
    return this.conversationRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    await this.conversationRepository.delete(id);
  }
}
