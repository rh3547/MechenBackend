import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {DeckCard, DeckCardRelations, Deck, CardVersion} from '../models';
import {DeckRepository} from './deck.repository';
import {CardVersionRepository} from './card-version.repository';

export class DeckCardRepository extends DefaultCrudRepository<
  DeckCard,
  typeof DeckCard.prototype.id,
  DeckCardRelations
> {

  public readonly deck: BelongsToAccessor<Deck, typeof DeckCard.prototype.id>;

  public readonly card: BelongsToAccessor<CardVersion, typeof DeckCard.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DeckRepository') protected deckRepositoryGetter: Getter<DeckRepository>, @repository.getter('CardVersionRepository') protected cardVersionRepositoryGetter: Getter<CardVersionRepository>,
  ) {
    super(DeckCard, dataSource);
    this.card = this.createBelongsToAccessorFor('card', cardVersionRepositoryGetter,);
    this.registerInclusionResolver('card', this.card.inclusionResolver);
    this.deck = this.createBelongsToAccessorFor('deck', deckRepositoryGetter,);
    this.registerInclusionResolver('deck', this.deck.inclusionResolver);
  }
}
