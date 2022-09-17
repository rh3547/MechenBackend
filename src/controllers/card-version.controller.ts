import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CardVersion} from '../models';
import {CardVersionRepository} from '../repositories';

export class CardVersionController {
  constructor(
    @repository(CardVersionRepository)
    public cardVersionRepository : CardVersionRepository,
  ) {}

  @post('/card-versions', {
    responses: {
      '200': {
        description: 'CardVersion model instance',
        content: {'application/json': {schema: getModelSchemaRef(CardVersion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardVersion, {
            title: 'NewCardVersion',
            exclude: ['id'],
          }),
        },
      },
    })
    cardVersion: Omit<CardVersion, 'id'>,
  ): Promise<CardVersion> {
    return this.cardVersionRepository.create(cardVersion);
  }

  @get('/card-versions/count', {
    responses: {
      '200': {
        description: 'CardVersion model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CardVersion)) where?: Where<CardVersion>,
  ): Promise<Count> {
    return this.cardVersionRepository.count(where);
  }

  @get('/card-versions', {
    responses: {
      '200': {
        description: 'Array of CardVersion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CardVersion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CardVersion)) filter?: Filter<CardVersion>,
  ): Promise<CardVersion[]> {
    return this.cardVersionRepository.find(filter);
  }

  @patch('/card-versions', {
    responses: {
      '200': {
        description: 'CardVersion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardVersion, {partial: true}),
        },
      },
    })
    cardVersion: CardVersion,
    @param.query.object('where', getWhereSchemaFor(CardVersion)) where?: Where<CardVersion>,
  ): Promise<Count> {
    return this.cardVersionRepository.updateAll(cardVersion, where);
  }

  @get('/card-versions/{id}', {
    responses: {
      '200': {
        description: 'CardVersion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CardVersion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(CardVersion)) filter?: Filter<CardVersion>
  ): Promise<CardVersion> {
    return this.cardVersionRepository.findById(id, filter);
  }

  @patch('/card-versions/{id}', {
    responses: {
      '204': {
        description: 'CardVersion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CardVersion, {partial: true}),
        },
      },
    })
    cardVersion: CardVersion,
  ): Promise<void> {
    await this.cardVersionRepository.updateById(id, cardVersion);
  }

  @put('/card-versions/{id}', {
    responses: {
      '204': {
        description: 'CardVersion PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cardVersion: CardVersion,
  ): Promise<void> {
    await this.cardVersionRepository.replaceById(id, cardVersion);
  }

  @del('/card-versions/{id}', {
    responses: {
      '204': {
        description: 'CardVersion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cardVersionRepository.deleteById(id);
  }
}
