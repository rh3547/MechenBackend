import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CardVersion,
  Card,
} from '../models';
import {CardVersionRepository} from '../repositories';

export class CardVersionCardController {
  constructor(
    @repository(CardVersionRepository)
    public cardVersionRepository: CardVersionRepository,
  ) { }

  @get('/card-versions/{id}/card', {
    responses: {
      '200': {
        description: 'Card belonging to CardVersion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Card)},
          },
        },
      },
    },
  })
  async getCard(
    @param.path.number('id') id: typeof CardVersion.prototype.id,
  ): Promise<Card> {
    return this.cardVersionRepository.card(id);
  }
}
