import { ComponentsModule } from './../components/components.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ButtonCollapsedComponent } from './sidebar/button-collapsed/button-collapsed.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolsModule } from '../tools/tools.module';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
// import { ModalModule } from 'ngx-bootstrap/modal/public_api';
// import { TooltipModule } from 'ngx-bootstrap/tooltip/public_api';

registerLocaleData(es);

@NgModule({
    imports: [
        SharedModule,
        // TooltipModule.forRoot(),
        // ModalModule.forRoot(),
        ToolsModule,
        ComponentsModule
    ],
    providers: [
        UserblockService, { provide: LOCALE_ID, useValue: 'es-ES' }
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
        ButtonCollapsedComponent
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule { }
