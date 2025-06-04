import type { SignUpPlayerUseCase } from '@auth-use-cases/sign-up-player.use-case'
import { PlayerAlreadyExistsError } from '@errors/player-already-exists-error'
import { Public } from '@infrastructure/jwt/public'
import { ZodValidationPipe } from '@infrastructure/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type SignUpBodySchema = z.infer<typeof signUpBodySchema>

@Controller('/sign-up')
@Public()
export class SignUpPlayerController {
  constructor(private signUpPlayer: SignUpPlayerUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(signUpBodySchema))
  async handle(@Body() body: SignUpBodySchema) {
    const { name, email, password } = body

    const result = await this.signUpPlayer.execute({
      name,
      email,
      password,
    })

    if (result.isFailure()) {
      const error = result.value

      switch (error.constructor) {
        case PlayerAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
