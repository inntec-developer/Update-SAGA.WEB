import { ReportesModule } from './reportes.module';

describe('ReportesModule', () => {
  let reportesModule: ReportesModule;

  beforeEach(() => {
    reportesModule = new ReportesModule();
  });

  it('should create an instance', () => {
    expect(reportesModule).toBeTruthy();
  });
});
