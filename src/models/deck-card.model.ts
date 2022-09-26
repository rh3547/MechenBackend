import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CardVersion} from './card-version.model';
import {Deck} from './deck.model';

@model()
export class DeckCard extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Deck)
  deckId: number;

  @belongsTo(() => CardVersion, {name: 'card'})
  cardVersionId: number;

  constructor(data?: Partial<DeckCard>) {
    super(data);
  }
}

export interface DeckCardRelations {
  // describe navigational properties here
}

export type DeckCardWithRelations = DeckCard & DeckCardRelations;
