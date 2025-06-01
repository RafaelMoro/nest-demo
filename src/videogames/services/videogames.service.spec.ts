import { Test, TestingModule } from '@nestjs/testing';
import { VideogamesService } from './videogames.service';
import { getModelToken } from '@nestjs/mongoose';
import { Videogame } from '../entities/videogames.entity';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
