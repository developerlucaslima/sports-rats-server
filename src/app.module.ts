import { EnvModule } from '@env/env.module'
import { Module } from '@nestjs/common'
import { PlayersModule } from '@players/players.module'
import { SharedModule } from '@shared/shared.module'

@Module({
  imports: [PlayersModule, SharedModule, EnvModule],
})
export class AppModule {}
