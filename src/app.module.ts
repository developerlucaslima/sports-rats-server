import { DatabaseModule } from '@infrastructure/database/database.module'
import { EnvModule } from '@infrastructure/env/env.module'
import { JWTModule } from '@infrastructure/jwt/jwt.module'
import { AuthModule } from '@modules/auth/auth.module'
import { PlayersModule } from '@modules/players/players.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [PlayersModule, AuthModule, EnvModule, DatabaseModule, JWTModule],
})
export class AppModule {}
