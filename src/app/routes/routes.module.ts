import { AuthRolesGuard } from '../auth-guard/auth-roles.guard';
import { AuthService } from '../service/auth/auth.service';
import { LogInGuardGuard } from '../auth-guard/log-in-guard.guard';
import { MenuService } from '../core/menu/menu.service';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslatorService } from '../core/translator/translator.service';
import { menu } from './menu';
import { routes } from './routes';
import { PantallaGGComponent } from './EquiposDeTrabajo/pantalla-gg/pantalla-gg.component';




@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule
    ],
    declarations: [
   PantallaGGComponent],
    exports: [RouterModule],
    providers: [LogInGuardGuard, AuthRolesGuard, AuthService]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}