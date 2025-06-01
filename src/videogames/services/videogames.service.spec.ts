import { Test, TestingModule } from '@nestjs/testing';
import { VideogamesService } from './videogames.service';
import { getModelToken } from '@nestjs/mongoose';
import { Videogame, VideogameDoc } from '../entities/videogames.entity';

describe('VideogamesService', () => {
  let service: VideogamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideogamesService,
        { provide: getModelToken(Videogame.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<VideogamesService>(VideogamesService);
  });

  it('getVideogame service should return a videogame', async () => {
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
      .spyOn(service, 'findAllVideogames')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);
    const response = await service.findAllVideogames();
    expect(response).toBe(result);
  });

  it('getVideogame service should return a empty array if no videogame found', async () => {
    const result = [] as unknown as VideogameDoc[];

    jest
      .spyOn(service, 'findAllVideogames')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);
    const response = await service.findAllVideogames();
    expect(response).toBe(result);
  });

  it('getSingleVideogame service should return a videogame', async () => {
    const result = {
      _id: '68351afb0e685e9fe702e63b',
      name: 'The last of us',
      description: 'A thriller videogame with zombies and a lot of action',
      price: 1200,
      platform: ['xbox series x', 'playstatiuon 5'],
    } as unknown as VideogameDoc;

    jest
      .spyOn(service, 'getSingleVideogame')
      // eslint-disable-next-line @typescript-eslint/require-await
      .mockImplementation(async () => result);
    const response = await service.getSingleVideogame('The last of us');
    expect(response).toBe(result);
  });
});
