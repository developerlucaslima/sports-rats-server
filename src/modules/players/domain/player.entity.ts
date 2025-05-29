import { Entity } from '@shared/entities/base.entity'
import type { SubscriptionPlan, UserRole } from '@shared/types/enums'
import type { Optional } from '@shared/types/optional'
import { comparePasswordHash } from '@shared/utils/compare-password-hash'
import type { UniqueEntityID } from '@shared/value-objects/unique-entity-id'

interface PlayerProps {
  id: string
  googleId?: string
  email: string
  isEmailVerified: boolean
  username?: string
  name: string
  passwordHash?: string
  avatarUrl?: string
  age?: number
  bio?: string
  latitude?: number
  longitude?: number
  role: UserRole
  subscriptionPlan: SubscriptionPlan
  countryCode?: string
  physicalConditionName?: string
  mentalConditionName?: string
  mainModalityId?: string
  createdAt: Date
  updatedAt?: Date
}

export class Player extends Entity<PlayerProps> {
  get googleId() {
    return this.props.googleId ?? ''
  }
  set googleId(value: string) {
    this.props.googleId = value
    this.touch()
  }

  get email() {
    return this.props.email
  }
  set email(value: string) {
    this.props.email = value
    this.touch()
  }

  get isEmailVerified() {
    return this.props.isEmailVerified
  }
  set isEmailVerified(value: boolean) {
    this.props.isEmailVerified = value
    this.touch()
  }

  get username() {
    return this.props.username ?? ''
  }
  set username(value: string) {
    this.props.username = value
    this.touch()
  }

  get name() {
    return this.props.name
  }
  set name(value: string) {
    this.props.name = value
    this.touch()
  }

  public async isPasswordValid(plainPassword: string): Promise<boolean> {
    return comparePasswordHash(plainPassword, this.props.passwordHash)
  }
  set passwordHash(value: string) {
    this.props.passwordHash = value
    this.touch()
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
  set bio(value: string) {
    this.props.bio = value
    this.touch()
  }

  get latitude() {
    return this.props.latitude ?? 0
  }
  set latitude(value: number) {
    this.props.latitude = value
    this.touch()
  }

  get longitude() {
    return this.props.longitude ?? 0
  }
  set longitude(value: number) {
    this.props.longitude = value
    this.touch()
  }

  get role() {
    return this.props.role
  }
  set role(value: UserRole) {
    this.props.role = value
    this.touch()
  }

  get subscriptionPlan() {
    return this.props.subscriptionPlan
  }
  set subscriptionPlan(value: SubscriptionPlan) {
    this.props.subscriptionPlan = value
    this.touch()
  }

  get countryCode() {
    return this.props.countryCode ?? ''
  }
  set countryCode(value: string) {
    this.props.countryCode = value
    this.touch()
  }

  get physicalConditionName() {
    return this.props.physicalConditionName ?? ''
  }
  set physicalConditionName(value: string) {
    this.props.physicalConditionName = value
    this.touch()
  }

  get mentalConditionName() {
    return this.props.mentalConditionName ?? ''
  }
  set mentalConditionName(value: string) {
    this.props.mentalConditionName = value
    this.touch()
  }

  get mainModalityId() {
    return this.props.mainModalityId ?? ''
  }
  set mainModalityId(value: string) {
    this.props.mainModalityId = value
    this.touch()
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
