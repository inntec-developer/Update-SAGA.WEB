import { CampoWebModule } from './campo-web.module';

describe('CampoWebModule', () => {
  let campoWebModule: CampoWebModule;

  beforeEach(() => {
    campoWebModule = new CampoWebModule();
  });

  it('should create an instance', () => {
    expect(campoWebModule).toBeTruthy();
  });
});
