/// <reference path="../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, provide} from 'angular2/angular2';

import {bootstrap} from 'angular2-meteor';

import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';

import {PartiesList} from 'client/parties-list/PartiesList';

import {PartiesService} from 'client/parties-list/PartiesService';

import {PartyDetails} from 'client/party-details/PartyDetails';

@Component({
    selector: 'app'
})

@View({
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: '/', redirectTo: '/parties'},
    {path: '/parties', as: 'PartiesList', component: PartiesList},
    {path: '/party/:id', as: 'PartyDetails', component: PartyDetails}
])

class Socially {}

bootstrap(Socially, [PartiesService, ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue: '/'})]);