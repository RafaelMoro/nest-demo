import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { VideogamesController } from './videogames.controller';
import { VideogamesService } from '../services/videogames.service';
import { Videogame, VideogameDoc } from '../entities/videogames.entity';
import { CreateVideogameDto, UpdateVideogameDto } from '../dtos/videogames.dto';

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

  afterEach(() => {
    jest.clearAllMocks();
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

  it('Get single videogame', async () => {
    const result = {
      _id: '68351afb0e685e9fe702e63b',
      name: 'The last of us',
      description: 'A thriller videogame with zombies and a lot of action',
      price: 1200,
      platform: ['xbox series x', 'playstatiuon 5'],
    } as unknown as VideogameDoc;

    jest
      .spyOn(videogamesService, 'getSingleVideogame')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);

    expect(
      await videogamesController.getSingleVideogame('The last of us'),
    ).toBe(result);
  });

  it('Create videogame', async () => {
    const payload: CreateVideogameDto = {
      name: 'Horizon forbidden west',
      description: 'The second deliver of horizon series for ps5 only',
      price: '1600',
      platform: ['playstatiuon 5'],
    };

    const result = {
      name: 'Horizon forbidden west',
      description: 'The second deliver of horizon series for ps5 only',
      price: 1600,
      platform: ['playstatiuon 5'],
      _id: '683525f9815326432e6ea8cc',
      __v: 0,
    } as unknown as VideogameDoc;

    jest
      .spyOn(videogamesService, 'createVideogame')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);

    expect(await videogamesController.createOneVideogame(payload)).toBe(result);
  });

  it('Edit videogame', async () => {
    const payload: UpdateVideogameDto = {
      videogameId: '683525f9815326432e6ea8cc',
      name: 'Horizon forbidden west edited',
    };

    const result = {
      name: 'Horizon forbidden west edited',
      description: 'The second deliver of horizon series for ps5 only',
      price: 1600,
      platform: ['playstatiuon 5'],
      _id: '683525f9815326432e6ea8cc',
      __v: 0,
    } as unknown as VideogameDoc;

    jest
      .spyOn(videogamesService, 'updateVideogame')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);

    expect(await videogamesController.editVideogame(payload)).toBe(result);
  });

  it('Delete videogame', async () => {
    const result = {
      name: 'Horizon forbidden west edited',
      description: 'The second deliver of horizon series for ps5 only',
      price: 1600,
      platform: ['playstatiuon 5'],
      _id: '683525f9815326432e6ea8cc',
      __v: 0,
    } as unknown as VideogameDoc;

    jest
      .spyOn(videogamesService, 'deleteVideogame')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);

    expect(
      await videogamesController.deleteVideogame('683525f9815326432e6ea8cc'),
    ).toBe(result);
  });
});
