import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Card, CardRelations, CardVersion} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CardVersionRepository} from './card-version.repository';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.id,
  CardRelations
> {

  public readonly cardVersions: HasManyRepositoryFactory<CardVersion, typeof Card.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CardVersionRepository') protected cardVersionRepositoryGetter: Getter<CardVersionRepository>,
  ) {
    super(Card, dataSource);
    this.cardVersions = this.createHasManyRepositoryFactoryFor('cardVersions', cardVersionRepositoryGetter,);
    this.registerInclusionResolver('cardVersions', this.cardVersions.inclusionResolver);
  }
}
