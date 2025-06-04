import { type Either, failure, success } from '@either/either'
import { PlayerAlreadyExistsError } from '@errors/player-already-exists-error'
import { Player } from '@modules/players/domain/entities/player.entity'
import type { PlayersRepository } from '@modules/players/domain/repositories/players-repository'
import { Injectable } from '@nestjs/common'
import { SubscriptionPlan, UserRole } from '@shared-types/enums'

import type { HashGenerator } from '../domain/cryptography/hash-generator'

interface SignUpPlayerUseCaseRequest {
  name: string
  email: string
  password: string
}

type SignUpPlayerUseCaseResponse = Either<
  PlayerAlreadyExistsError,
  {
    player: Player
  }
>

@Injectable()
export class SignUpPlayerUseCase {
  constructor(
    private playersRepository: PlayersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: SignUpPlayerUseCaseRequest): Promise<SignUpPlayerUseCaseResponse> {
    const playerWithSameEmail = await this.playersRepository.findByEmail(email)

    if (playerWithSameEmail) {
      return failure(new PlayerAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const player = Player.create({
      name,
      email,
      role: UserRole.Player,
      hashedPassword,
      subscriptionPlan: SubscriptionPlan.Free,
    })

    await this.playersRepository.create(player)

    return success({
      player,
    })
  }
}
