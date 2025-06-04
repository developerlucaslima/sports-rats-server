import type { UniqueEntityID } from '@entities/value-objects/unique-entity-id'
import { Entity } from '@shared/entities/base.entity'
import type { SubscriptionPlan, UserRole } from '@shared/types/enums'
import type { Optional } from '@shared/types/optional'

interface PlayerProps {
  googleId?: string | null
  email: string
  isEmailVerified?: boolean
  name: string
  username?: string | null
  hashedPassword?: string | null
  avatarUrl?: string | null
  age?: number | null
  bio?: string | null
  latitude?: number | null
  longitude?: number | null
  role: UserRole
  subscriptionPlan: SubscriptionPlan
  countryCode?: string | null
  physicalConditionName?: string | null
  mentalConditionName?: string | null
  mainModalityId?: string | null
  createdAt: Date
  updatedAt?: Date
}

export class Player extends Entity<PlayerProps> {
  get googleId() {
    return this.props.googleId ?? ''
  }

  get email() {
    return this.props.email
  }

  get isEmailVerified() {
    return this.props.isEmailVerified ?? false
  }

  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username ?? ''
  }

  get hashedPassword() {
    return this.props.hashedPassword ?? ''
  }

  get avatarUrl() {
    return this.props.avatarUrl ?? ''
  }
  set avatarUrl(value: string) {
    this.props.avatarUrl = value
    this.touch()
  }

  get age() {
    return this.props.age
  }

  get bio() {
    return this.props.bio ?? ''
  }

  get latitude() {
    return this.props.latitude ?? 0
  }

  get longitude() {
    return this.props.longitude ?? 0
  }

  get role() {
    return this.props.role
  }

  get subscriptionPlan() {
    return this.props.subscriptionPlan
  }

  get countryCode() {
    return this.props.countryCode ?? ''
  }

  get physicalConditionName() {
    return this.props.physicalConditionName ?? ''
  }

  get mentalConditionName() {
    return this.props.mentalConditionName ?? ''
  }

  get mainModalityId() {
    return this.props.mainModalityId ?? ''
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<PlayerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const player = new Player(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
    return player
  }
}
