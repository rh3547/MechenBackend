import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Card,
  CardVersion,
} from '../models';
import {CardRepository} from '../repositories';

export class CardCardVersionController {
  constructor(
    @repository(CardRepository) protected cardRepository: CardRepository,
  ) { }

  @get('/cards/{id}/card-versions', {
    responses: {
      '200': {
        description: 'Array of Card has many CardVersion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CardVersion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CardVersion>,
  ): Promise<CardVersion[]> {
    return this.cardRepository.cardVersions(id).find(filter);
  }

  @post('/cards/{id}/card-versions', {
    responses: {
      '200': {
        description: 'Card model instance',
        content: {'application/json': {schema: getModelSchemaRef(CardVersion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Card.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardVersion, {
            title: 'NewCardVersionInCard',
            exclude: ['id'],
            optional: ['cardId']
          }),
        },
      },
    }) cardVersion: Omit<CardVersion, 'id'>,
  ): Promise<CardVersion> {
    return this.cardRepository.cardVersions(id).create(cardVersion);
  }

  @patch('/cards/{id}/card-versions', {
    responses: {
      '200': {
        description: 'Card.CardVersion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardVersion, {partial: true}),
        },
      },
    })
    cardVersion: Partial<CardVersion>,
    @param.query.object('where', getWhereSchemaFor(CardVersion)) where?: Where<CardVersion>,
  ): Promise<Count> {
    return this.cardRepository.cardVersions(id).patch(cardVersion, where);
  }

  @del('/cards/{id}/card-versions', {
    responses: {
      '200': {
        description: 'Card.CardVersion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CardVersion)) where?: Where<CardVersion>,
  ): Promise<Count> {
    return this.cardRepository.cardVersions(id).delete(where);
  }
}
