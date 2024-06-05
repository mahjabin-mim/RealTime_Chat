import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SingleChatModule } from './singleChat/singleChat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    SingleChatModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
