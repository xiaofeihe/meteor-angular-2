/// <reference path="../../typings/angular2-meteor.d.ts" />
import {Parties} from '../../collections/Parties';

export class PartyModel {
    public name:string = '';
    public description:string = '';
    public location:string = '';
    public public:boolean = false;
}

export class PartiesService {

    public createParty(newParty:PartyModel):void {
        Parties.insert({
            name: newParty.name,
            description: newParty.description,
            location: newParty.location,
            public: newParty.public
        }, (error)=> {
            console.log(error);
        })
    }

    public updateParty(id:string, party:PartyModel):void {
        Parties.update(id, {
            $set: {
                name: party.name,
                description: party.description,
                location: party.location,
                public: party.public
            }
        });
    }

    public partyStatus(status:boolean) {
        if (status) {
            return 'Public';
        } else {
            return 'Private';
        }
    }

    public deleteParty(partyId:String):void {
        Parties.remove({_id: partyId});
    }
}
