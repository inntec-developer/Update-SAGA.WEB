import { EquiposModule } from './equipos.module';

describe('EquiposModule', () => {
  let equiposModule: EquiposModule;

  beforeEach(() => {
    equiposModule = new EquiposModule();
  });

  it('should create an instance', () => {
    expect(equiposModule).toBeTruthy();
  });
});
