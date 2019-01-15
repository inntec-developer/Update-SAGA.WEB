import { ExamenesModule } from './examenes.module';

describe('ExamenesModule', () => {
  let examenesModule: ExamenesModule;

  beforeEach(() => {
    examenesModule = new ExamenesModule();
  });

  it('should create an instance', () => {
    expect(examenesModule).toBeTruthy();
  });
});
