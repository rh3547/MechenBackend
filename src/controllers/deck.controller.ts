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
import {Deck} from '../models';
import {DeckRepository} from '../repositories';

export class DeckController {
  constructor(
    @repository(DeckRepository)
    public deckRepository : DeckRepository,
  ) {}

  @post('/decks', {
    responses: {
      '200': {
        description: 'Deck model instance',
        content: {'application/json': {schema: getModelSchemaRef(Deck)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {
            title: 'NewDeck',
            exclude: ['id'],
          }),
        },
      },
    })
    deck: Omit<Deck, 'id'>,
  ): Promise<Deck> {
    return this.deckRepository.create(deck);
  }

  @get('/decks/count', {
    responses: {
      '200': {
        description: 'Deck model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Deck)) where?: Where<Deck>,
  ): Promise<Count> {
    return this.deckRepository.count(where);
  }

  @get('/decks', {
    responses: {
      '200': {
        description: 'Array of Deck model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Deck, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Deck)) filter?: Filter<Deck>,
  ): Promise<Deck[]> {
    return this.deckRepository.find(filter);
  }

  @patch('/decks', {
    responses: {
      '200': {
        description: 'Deck PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {partial: true}),
        },
      },
    })
    deck: Deck,
    @param.query.object('where', getWhereSchemaFor(Deck)) where?: Where<Deck>,
  ): Promise<Count> {
    return this.deckRepository.updateAll(deck, where);
  }

  @get('/decks/{id}', {
    responses: {
      '200': {
        description: 'Deck model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Deck, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Deck)) filter?: Filter<Deck>
  ): Promise<Deck> {
    return this.deckRepository.findById(id, filter);
  }

  @patch('/decks/{id}', {
    responses: {
      '204': {
        description: 'Deck PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {partial: true}),
        },
      },
    })
    deck: Deck,
  ): Promise<void> {
    await this.deckRepository.updateById(id, deck);
  }

  @put('/decks/{id}', {
    responses: {
      '204': {
        description: 'Deck PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deck: Deck,
  ): Promise<void> {
    await this.deckRepository.replaceById(id, deck);
  }

  @del('/decks/{id}', {
    responses: {
      '204': {
        description: 'Deck DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deckRepository.deleteById(id);
  }
}
