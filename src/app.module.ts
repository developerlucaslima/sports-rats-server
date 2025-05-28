import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [PlayersModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
