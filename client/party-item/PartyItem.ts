/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, Input } from 'angular2/angular2';

import {PartiesService, PartyModel} from 'client/parties-list/PartiesService';

import {RouterLink} from 'angular2/router';

@Component({
    selector: 'party-item'
})

@View({
    templateUrl: 'client/party-item/party-item.html',
    directives: [RouterLink]
})

export class PartyItem {

    @Input() item: PartyModel;

    public partyStatus:string;
    
    private partiesService: PartiesService;
    
    public constructor(PartiesService:PartiesService){
        this.partiesService = PartiesService;
    }
    
    onInit() {
        this.partyStatus = this.partiesService.partyStatus(this.item.public);
    }

}


