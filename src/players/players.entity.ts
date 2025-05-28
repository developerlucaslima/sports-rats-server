import { Entity } from "@shared/entities/base.entity"
import type { Optional } from "@shared/types/optional"
import type { UniqueEntityID } from "@shared/value-objects/unique-entity-id"

interface PlayerProps {
  name: string
  email: string
  createdAt: Date
  updatedAt?: Date
}

export class Player extends Entity<PlayerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }
  
  static create(
    props: Optional<PlayerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const player = new Player({
      ...props,
      createdAt: new Date(),
    })

    return player
  }
}