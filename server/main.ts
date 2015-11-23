/// <reference path="../typings/angular2-meteor.d.ts" />

import {Parties} from 'collections/Parties'

import './parties';

Meteor.startup(function() {
    if(Parties.find().count() === 0) {

        var parties = [
            {name: 'party 1', description: 'party description is here'},
            {name: 'party 2', description: 'party description is here'},
            {name: 'party 3', description: 'party description is here'}
        ];

        for(var i = 0; parties.length; i++){
            Parties.insert({name: parties[i].name, description: parties[i].description});
        }

    }
});
