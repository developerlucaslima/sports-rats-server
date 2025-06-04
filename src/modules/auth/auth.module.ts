import { signInPlayerController } from '@auth-controllers/sign-in.controller'
import { SignUpPlayerController } from '@auth-controllers/sign-up-player.controller'
import { Encrypter } from '@auth-domain/cryptography/encrypter'
import { HashComparer } from '@auth-domain/cryptography/hash-comparer'
import { HashGenerator } from '@auth-domain/cryptography/hash-generator'
import { BcryptHasher } from '@auth-infrastructure/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '@auth-infrastructure/cryptography/jwt-encrypter'
import { Module } from '@nestjs/common'
import { PlayersModule } from '@players/players.module'

@Module({
  imports: [PlayersModule],
  controllers: [signInPlayerController, SignUpPlayerController],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class AuthModule {}
