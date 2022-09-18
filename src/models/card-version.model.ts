import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Card} from './card.model';

@model()
export class CardVersion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  version: number;

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

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'string',
    required: false,
  })
  abilityText: string;

  @property({
    type: 'number',
    required: false,
  })
  legSlots: number;

  @property({
    type: 'number',
    required: false,
  })
  armSlots: number;

  @property({
    type: 'number',
    required: false,
  })
  headSlots: number;

  @property({
    type: 'number',
    required: false,
  })
  hardpointSlots: number;

  @property({
    type: 'number',
    required: false,
  })
  modSlots: number;

  @property({
    type: 'number',
    required: false,
  })
  coreHealth: number;

  @property({
    type: 'number',
    required: false,
  })
  armor: number;

  @property({
    type: 'number',
    required: false,
  })
  agility: number;

  @property({
    type: 'number',
    required: false,
  })
  energy: number;

  @property({
    type: 'number',
    required: false,
  })
  cooldown: number;

  @property({
    type: 'number',
    required: false,
  })
  minRange: number;

  @property({
    type: 'number',
    required: false,
  })
  maxRange: number;

  @property({
    type: 'string',
    required: false,
  })
  direction: string;

  @property({
    type: 'string',
    required: false,
  })
  areaOfEffect: string;

  @belongsTo(() => Card)
  cardId: number;

  constructor(data?: Partial<CardVersion>) {
    super(data);
  }
}

export interface CardVersionRelations {
  // describe navigational properties here
}

export type CardVersionWithRelations = CardVersion & CardVersionRelations;
