/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Input} from 'angular2/angular2';

import {PartiesService, PartyModel} from 'client/parties-list/PartiesService';

import {MeteorComponent} from 'angular2-meteor';

import {Parties} from 'collections/Parties';

@Component({
    selector: 'party-edit'
})

@View({
    templateUrl: '/client/party-edit/party-edit.html'
})

export class PartyEdit extends MeteorComponent {

    @Input() id:string;

    public party:PartyModel = new PartyModel();
    
    private partiesService: PartiesService;

    public constructor(PartiesService:PartiesService) {
        super();
        this.partiesService = PartiesService;
    }
    
    public onInit(){
        this.autorun(()=> {
            this.subscribe('party', this.id, ()=> {
                this.party = <PartyModel>Parties.findOne({_id: this.id});
            }, true);
        }, true);
    }

    public openModal():void {
        var element:any = $('#modal2');
        element.openModal();
    }

    public update():void {
        this.partiesService.updateParty(this.id, this.party);
    }

}


