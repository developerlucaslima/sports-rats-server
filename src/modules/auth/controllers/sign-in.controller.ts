import type { SignInPlayerUseCase } from '@auth-use-cases/sign-in-player.use-case'
import { WrongCredentialsError } from '@errors/wrong-credentials-error'
import { Public } from '@infrastructure/jwt/public'
import { ZodValidationPipe } from '@infrastructure/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const signInPlayerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type signInPlayerBodySchema = z.infer<typeof signInPlayerBodySchema>

@Controller('/sign-in')
@Public()
export class signInPlayerController {
  constructor(private signInPlayerPlayer: SignInPlayerUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(signInPlayerBodySchema))
  async handle(@Body() body: signInPlayerBodySchema) {
    const { email, password } = body

    const result = await this.signInPlayerPlayer.execute({
      email,
      password,
    })

    if (result.isFailure()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
