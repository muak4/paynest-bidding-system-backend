import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const configService = new ConfigService();
      const frontendAppUrl = configService.get<string>(
        'FRONTEND_APP_URL',
        'http://localhost:3030',
      );

      if (origin === frontendAppUrl || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class BidGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private configService: ConfigService) {}

  handleConnection(client: Socket) {}

  handleDisconnect(client: Socket) {}

  broadcastHighestBid(itemId: number, highestBid: number) {
    this.server.emit('bidUpdate', { itemId, highestBid });
  }

  @SubscribeMessage('connected')
  handleConnectionMessage(client: Socket) {
    const origin = this.configService.get<string>('FRONTEND_APP_URL');
    console.log('Origin:', origin); // Check if it resolves correctly
  }
}
