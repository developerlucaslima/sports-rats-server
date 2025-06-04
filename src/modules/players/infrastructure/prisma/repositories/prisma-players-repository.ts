import type { PrismaService } from '@infrastructure/database/prisma/prisma.service'
import type { Player } from '@modules/players/domain/entities/player.entity'
import type { PlayersRepository } from '@modules/players/domain/repositories/players-repository'
import { Injectable } from '@nestjs/common'

import { PrismaPlayerMapper } from '../mappers/prisma-player-mapper'

@Injectable()
export class PrismaPlayersRepository implements PlayersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Player | null> {
    const player = await this.prisma.player.findUnique({
      where: {
        email,
      },
    })

    if (!player) {
      return null
    }

    return PrismaPlayerMapper.toDomain(player)
  }

  async create(player: Player): Promise<void> {
    const data = PrismaPlayerMapper.toPrisma(player)

    await this.prisma.player.create({
      data,
    })
  }
}
