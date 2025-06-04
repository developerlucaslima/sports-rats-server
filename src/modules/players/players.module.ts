import { Module } from '@nestjs/common'

import { PlayersRepository } from './domain/repositories/players-repository'
import { PrismaPlayersRepository } from './infrastructure/prisma/repositories/prisma-players-repository'

@Module({
  controllers: [],
  providers: [
    {
      provide: PlayersRepository,
      useClass: PrismaPlayersRepository,
    },
  ],
  exports: [PlayersRepository],
})
export class PlayersModule {}
