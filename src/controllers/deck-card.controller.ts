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
import {DeckCard} from '../models';
import {DeckCardRepository} from '../repositories';

export class DeckCardController {
  constructor(
    @repository(DeckCardRepository)
    public deckCardRepository : DeckCardRepository,
  ) {}

  @post('/deck-cards', {
    responses: {
      '200': {
        description: 'DeckCard model instance',
        content: {'application/json': {schema: getModelSchemaRef(DeckCard)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeckCard, {
            title: 'NewDeckCard',
            exclude: ['id'],
          }),
        },
      },
    })
    deckCard: Omit<DeckCard, 'id'>,
  ): Promise<DeckCard> {
    return this.deckCardRepository.create(deckCard);
  }

  @get('/deck-cards/count', {
    responses: {
      '200': {
        description: 'DeckCard model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(DeckCard)) where?: Where<DeckCard>,
  ): Promise<Count> {
    return this.deckCardRepository.count(where);
  }

  @get('/deck-cards', {
    responses: {
      '200': {
        description: 'Array of DeckCard model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DeckCard, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DeckCard)) filter?: Filter<DeckCard>,
  ): Promise<DeckCard[]> {
    return this.deckCardRepository.find(filter);
  }

  @patch('/deck-cards', {
    responses: {
      '200': {
        description: 'DeckCard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeckCard, {partial: true}),
        },
      },
    })
    deckCard: DeckCard,
    @param.query.object('where', getWhereSchemaFor(DeckCard)) where?: Where<DeckCard>,
  ): Promise<Count> {
    return this.deckCardRepository.updateAll(deckCard, where);
  }

  @get('/deck-cards/{id}', {
    responses: {
      '200': {
        description: 'DeckCard model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DeckCard, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(DeckCard)) filter?: Filter<DeckCard>
  ): Promise<DeckCard> {
    return this.deckCardRepository.findById(id, filter);
  }

  @patch('/deck-cards/{id}', {
    responses: {
      '204': {
        description: 'DeckCard PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeckCard, {partial: true}),
        },
      },
    })
    deckCard: DeckCard,
  ): Promise<void> {
    await this.deckCardRepository.updateById(id, deckCard);
  }

  @put('/deck-cards/{id}', {
    responses: {
      '204': {
        description: 'DeckCard PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deckCard: DeckCard,
  ): Promise<void> {
    await this.deckCardRepository.replaceById(id, deckCard);
  }

  @del('/deck-cards/{id}', {
    responses: {
      '204': {
        description: 'DeckCard DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deckCardRepository.deleteById(id);
  }
}
