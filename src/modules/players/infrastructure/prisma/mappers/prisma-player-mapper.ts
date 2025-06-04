import { UniqueEntityID } from '@entities/value-objects/unique-entity-id'
import { Player } from '@modules/players/domain/entities/player.entity'
import { type Player as PrismaPlayer, Prisma } from '@prisma/client'
import type { SubscriptionPlan, UserRole } from '@shared-types/enums'

export class PrismaPlayerMapper {
  static toDomain(raw: PrismaPlayer): Player {
    return Player.create(
      {
        googleId: raw.googleId,
        email: raw.email,
        isEmailVerified: raw.isEmailVerified,
        name: raw.name,
        username: raw.username,
        hashedPassword: raw.hashedPassword,
        avatarUrl: raw.avatarUrl,
        age: raw.age,
        bio: raw.bio,
        latitude: raw.latitude,
        longitude: raw.longitude,
        role: raw.role as UserRole,
        subscriptionPlan: raw.subscriptionPlan as SubscriptionPlan,
        countryCode: raw.countryCode,
        physicalConditionName: raw.physicalConditionName,
        mentalConditionName: raw.mentalConditionName,
        mainModalityId: raw.mainModalityId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(player: Player): Prisma.PlayerUncheckedCreateInput {
    return {
      id: player.id.toString(),
      googleId: player.googleId,
      email: player.email,
      isEmailVerified: player.isEmailVerified,
      name: player.name,
      username: player.username,
      hashedPassword: player.hashedPassword,
      avatarUrl: player.avatarUrl,
      age: player.age,
      bio: player.bio,
      latitude: player.latitude,
      longitude: player.longitude,
      role: player.role,
      subscriptionPlan: player.subscriptionPlan,
      countryCode: player.countryCode,
      physicalConditionName: player.physicalConditionName,
      mentalConditionName: player.mentalConditionName,
      mainModalityId: player.mainModalityId,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
    }
  }
}
