import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

@Entity('singlechat')
export class SingleChat {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Conversation, conversation => conversation.id, {
  //   onDelete: 'CASCADE',
  // })
  // convId: Conversation;

  // @ManyToOne(() => User, user => user.id, {
  //   onDelete: 'CASCADE',
  // })
  //sender: User;
  @Column({nullable:false})
  sender: string;
 
  @Column({nullable:false})
  receiver: string;

  @Column({nullable:false})
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
