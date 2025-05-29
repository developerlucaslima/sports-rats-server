import { DatabaseModule } from '@config/database/database.module'
import { EnvModule } from '@config/env/env.module'
import { AuthModule } from '@modules/auth/auth.module'
import { PlayersModule } from '@modules/players/players.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlayersModule, EnvModule, AuthModule, DatabaseModule],
})
export class AppModule {}
