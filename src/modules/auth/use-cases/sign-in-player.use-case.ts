import { type Either, failure, success } from '@either/either'
import { WrongCredentialsError } from '@errors/wrong-credentials-error'
import type { PlayersRepository } from '@modules/players/domain/repositories/players-repository'
import { Injectable } from '@nestjs/common'

import type { Encrypter } from '../domain/cryptography/encrypter'
import type { HashComparer } from '../domain/cryptography/hash-comparer'

interface SignInPlayerUseCaseRequest {
  email: string
  password: string
}

type SignInPlayerUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class SignInPlayerUseCase {
  constructor(
    private playersRepository: PlayersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: SignInPlayerUseCaseRequest): Promise<SignInPlayerUseCaseResponse> {
    const player = await this.playersRepository.findByEmail(email)

    if (!player) {
      return failure(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      player.hashedPassword,
    )

    if (!isPasswordValid) {
      return failure(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: player.id.toString(),
    })

    return success({
      accessToken,
    })
  }
}
