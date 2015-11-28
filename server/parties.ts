import {Parties} from 'collections/Parties';

Meteor.publish('parties', function(options: any, regex: string) {
    console.log("PARTIES ", options);
    return Parties.find({name: new RegExp(regex, "g")}, options);
});

Meteor.publish('party', function(partyId: string) {
    return Parties.find({_id: partyId});
});

Meteor.methods({
    updateParty: function(id: string, data: any){
        Parties.update({_id: id}, {$set: {name: 'updated'}})
    },
    partiesCount: function(regex: string){
        return Parties.find({name: new RegExp(regex, "g")}).count();
    }
});
 