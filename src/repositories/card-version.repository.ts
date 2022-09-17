import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CardVersion, CardVersionRelations, Card} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CardRepository} from './card.repository';

export class CardVersionRepository extends DefaultCrudRepository<
  CardVersion,
  typeof CardVersion.prototype.id,
  CardVersionRelations
> {

  public readonly card: BelongsToAccessor<Card, typeof CardVersion.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CardRepository') protected cardRepositoryGetter: Getter<CardRepository>,
  ) {
    super(CardVersion, dataSource);
    this.card = this.createBelongsToAccessorFor('card', cardRepositoryGetter,);
    this.registerInclusionResolver('card', this.card.inclusionResolver);
  }
}
