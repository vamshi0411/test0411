import { Test, TestingModule } from '@nestjs/testing';
import { ExamplesController } from './examples.controller';

describe('ExamplesController', () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
    }).compile();

    controller = module.get<ExamplesController>(ExamplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can perform a POST', async () => {
    const result = await controller.create("myExample");
    expect(result.created.exampleName).toBe("myExample");
  });
});
