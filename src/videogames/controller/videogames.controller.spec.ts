import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { VideogamesController } from './videogames.controller';
import { VideogamesService } from '../services/videogames.service';
import { Videogame, VideogameDoc } from '../entities/videogames.entity';

describe('VideogamesController', () => {
  let videogamesController: VideogamesController;
  let videogamesService: VideogamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideogamesController],
      providers: [
        VideogamesService,
        { provide: getModelToken(Videogame.name), useValue: jest.fn() },
      ],
    }).compile();

    videogamesController =
      module.get<VideogamesController>(VideogamesController);
    videogamesService = module.get<VideogamesService>(VideogamesService);
  });

  it('Get all videogames', async () => {
    const result = [
      {
        _id: '68351afb0e685e9fe702e63b',
        name: 'The last of us',
        description: 'A thriller videogame with zombies and a lot of action',
        price: 1200,
        platform: ['xbox series x', 'playstatiuon 5'],
      },
    ] as unknown as VideogameDoc[];

    jest
      .spyOn(videogamesService, 'findAllVideogames')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);

    expect(await videogamesController.getAllVideogames()).toBe(result);
  });
});
