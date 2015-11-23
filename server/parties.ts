import {Parties} from 'collections/Parties';

Meteor.publish('parties', function(options: any) {
    console.log("PARTIES ", options);
    return Parties.find({}, options);
});

Meteor.publish('party', function(partyId: string) {
    return Parties.find({_id: partyId});
});

Meteor.methods({
    updateParty: function(id: string, data: any){
        Parties.update({_id: id}, {$set: {name: 'updated'}})
    },
    partiesCount: function(){
        return Parties.find().count();
    }
});
 