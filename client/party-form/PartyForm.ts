/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {Parties} from '../../collections/Parties';

import {PartiesService, PartyModel} from 'client/parties-list/PartiesService';

@Component({
    selector: 'parties-form'
})

@View({
    templateUrl: 'client/party-form/party-form.html',
    directives: [FORM_DIRECTIVES]
})

export class PartyForm {

    public newParty: ControlGroup;

    public service: PartiesService;

    public constructor(PartiesService:PartiesService) {
        this.setUpPartyForm();
        this.service = PartiesService;
    }

    public submitCreateParty(newParty: PartyModel):void {
        if(this.newParty.valid){
            this.service.createParty(newParty);
        }
    }

    public openModal():void{
        let element: any = $('#modal1');
        element.openModal();
    }

    private setUpPartyForm(): void{
        var formBuilder = new FormBuilder();
        this.newParty = formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            public: [false]
        });
    }

}
