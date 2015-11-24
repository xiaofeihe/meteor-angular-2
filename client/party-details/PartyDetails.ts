/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgIf, NgFor} from 'angular2/angular2';

import {MeteorComponent} from 'angular2-meteor';

import {RouterLink, RouteParams} from 'angular2/router';

import {Parties} from 'collections/Parties';

import {PartiesService, PartyModel} from 'client/parties-list/PartiesService';

import {PartyEdit} from 'client/party-edit/PartyEdit';

import {Router} from 'angular2/router'


@Component({
    selector: 'party-details'
})

@View({
    templateUrl: '/client/party-details/party-details.html',
    directives: [RouterLink, PartyEdit, NgIf, NgFor]
})

export class PartyDetails extends MeteorComponent {

    private partyId:string;

    public party:PartyModel = new PartyModel();

    public partyStatus:string = '';

    private partiesService:PartiesService;
    
    private router: Router;

    public constructor(params:RouteParams, PartiesService:PartiesService, Router:Router) {
        super();
        
        this.partyId = params.get('id');

        this.partiesService = PartiesService;
        
        this.router = Router;
        
        this.autorun(()=> {
            this.subscribe('party', this.partyId, ()=> {
                this.party = <PartyModel>Parties.findOne({_id: this.partyId});
                if (this.party){
                    this.partyStatus = this.partiesService.partyStatus(this.party.public);
                }
            }, true);
        }, true);
  
    }
    
    public deleteConfirmation(): void {
        var element:any = $('#modal3');
        element.openModal();
    }
    
    public deleteParty(): void{
        var element:any = $('#modal3');
        this.partiesService.deleteParty(this.partyId)
        element.closeModal();
        this.router.navigate(['/PartiesList']);
    }
    
    
}


    


