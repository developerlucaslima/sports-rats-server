import type { Player } from '../entities/player.entity'

export abstract class PlayersRepository {
  abstract findByEmail(email: string): Promise<Player | null>
  abstract create(player: Player): Promise<void>
}
