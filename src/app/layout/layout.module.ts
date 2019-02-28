import { ModalModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { NgModule } from '@angular/core';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import { ButtonCollapsedComponent } from './sidebar/button-collapsed/button-collapsed.component';

@NgModule({
    imports: [
        SharedModule,
        PopoverModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
    ],
    providers: [
        UserblockService
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
