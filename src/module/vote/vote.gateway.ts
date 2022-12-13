import { OnModuleInit } from '@nestjs/common';
import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer,} from '@nestjs/websockets';
import {Server} from 'socket.io';


@WebSocketGateway()
export class VotetingGetway implements OnModuleInit
{
  @WebSocketServer()
  server: Server;

  onModuleInit(){
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
      
    })
  }
  
  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any){
    console.log(body);
    this.server.emit('onMessage', {
      msg: 'new message',
      content: body, 
    });
  }  

  // @SubscribeMessage('voting')
  //   async voteTing(@MessageBody() quantityVote : number, idCandidate, getUser) {
  //     const voted = await this.accountService.vote(quantityVote, idCandidate, getUser);
  //     console.log(voted);
      
  //     this.server.emit('voted', voted);
  //     return voted;
  //   }

  // @WebSocketServer() io: Namespace;
  
  



  // constructor(
  //   private readonly accountService: AccountService,
  //   ){}
}