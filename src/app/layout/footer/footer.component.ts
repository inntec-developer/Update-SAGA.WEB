import { SagaBotComponent } from './../../components/saga-bot/saga-bot.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    open = false;
    @ViewChild('sagabot') sagabot: SagaBotComponent;
    constructor(public settings: SettingsService) { }

    ngOnInit() {

    }

    closeConversation(close) {
        this.open = close;

    }

}
