import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import { AccountService } from '../module/account/account.service';

@WebSocketGateway(
  3002
  // {cors: {
  // origin: '*',
  // }}
  )
export class VotetingGetway 
 {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('voting')
  voting(@MessageBody() body:any){
    console.log(body);
  }



  // constructor(
  //   private readonly accountService: AccountService,
  //   ){}


  // @SubscribeMessage('voting')
  //   async vote(@MessageBody() quantityVote : number, idCandidate, getUser) {
  //     const voted = await this.accountService.vote(quantityVote, idCandidate, getUser);
  //     this.server.emit('voted', voted);
  //     return voted;
  //   }

  //   @SubscribeMessage('Participants')
  //   participantsVote(
  //     @MessageBody('name') name: string,
  //     @ConnectedSocket() client: Socket,
  //   ){
  //     return this.accountService.idInfo(name, client.id);
  //   }

}