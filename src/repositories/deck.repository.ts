import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Deck, DeckRelations, DeckCard} from '../models';
import {DeckCardRepository} from './deck-card.repository';

export class DeckRepository extends DefaultCrudRepository<
  Deck,
  typeof Deck.prototype.id,
  DeckRelations
> {

  public readonly cards: HasManyRepositoryFactory<DeckCard, typeof Deck.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DeckCardRepository') protected deckCardRepositoryGetter: Getter<DeckCardRepository>,
  ) {
    super(Deck, dataSource);
    this.cards = this.createHasManyRepositoryFactoryFor('cards', deckCardRepositoryGetter,);
    this.registerInclusionResolver('cards', this.cards.inclusionResolver);
  }
}
