import {Entity, model, property, hasMany} from '@loopback/repository';
import {CardVersion} from './card-version.model';

@model()
export class Card extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  subtype?: string;

  @property({
    type: 'string',
    default: "Common",
  })
  rarity?: string;

  @hasMany(() => CardVersion)
  cardVersions: CardVersion[];

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
