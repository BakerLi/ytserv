import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class LogGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  // 當一個新的 socket 連線進來時，會觸發這個方法
  handleConnection(client: Socket) {
    const taskId = client.handshake.query.taskId as string;
    this.clients.set(taskId, client);
    console.log(`Socket connected for taskId: ${taskId}`);
  }

  // 當 socket 斷線時，會觸發這個方法
  handleDisconnect(client: Socket) {
    const taskId = client.handshake.query.taskId as string;
    this.clients.delete(taskId);
    console.log(`Socket disconnected for taskId: ${taskId}`);
  }

  // 發送 log 給特定的 taskId 客戶端
  sendLog(taskId: string, message: string) {
    const client = this.clients.get(taskId);
    if (client) {
      client.emit('log', message);
    }
  }

  //正規斷線
  disconnect(taskId: string, url: string){
    const client = this.clients.get(taskId);
    if (client) {
      client.emit('downloadComplete', url)  // 發送下載完成事件
    }
    
    this.clients.delete(taskId);
    console.log(`Socket normal disconnected for taskId: ${taskId}`);
  }

  //error斷線
  errorDisconnect(taskId: string){
    this.clients.delete(taskId);
    console.log(`Socket error disconnected for taskId: ${taskId}`);
  }

}
