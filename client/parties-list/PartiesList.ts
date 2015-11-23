/// <reference path="../../typings/angular2-meteor.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {PartyForm} from 'client/party-form/PartyForm';

import {Parties} from 'collections/Parties';

import {MeteorComponent} from 'angular2-meteor';

import {PartiesService, PartyModel} from 'client/parties-list/PartiesService';

import {PartiesFilter} from 'client/parties-list/PartiesFilter';

import {PartyItem} from '../party-item/PartyItem';


@Component({
    selector: 'parties-list'
})

@View({
    pipes: [PartiesFilter],
    templateUrl: '/client/parties-list/parties-list.html',
    directives: [PartyForm, NgFor, PartyItem, NgIf]
})

export class PartiesList extends MeteorComponent {

    public pageTitle:string;
    public parties:Mongo.Cursor<any>;
    public party;

    private service:PartiesService;

    private subscription;

    public pagination: {perPage: number, currentPage: number, items: number, totalPages: number, arrayPages: number[]} = {
        perPage: 10,
        currentPage: 1,
        items: 0,
        totalPages: 0,
        arrayPages: [1, 2, 3, 4]
    };

    public constructor(PartiesService:PartiesService) {
        super();

        this.service = PartiesService;

        this.setUpPageDetails();

        this.meteorSubscribe();

    }

    public changePage(page:number):void {
        this.pagination.currentPage = page;
        this.meteorSubscribe();
        this.pagination.totalPages = Math.ceil(this.pagination.items / this.pagination.perPage);

        var pages:number[] = [];

        for (let i = 1; i < this.pagination.totalPages + 1; i++) {
            pages.push(i);
        }

        this.pagination.arrayPages = pages;

    }

    private meteorSubscribe():void {

        if (this.subscription) {
            this.subscription.stop();
        }

        this.subscription = Meteor.subscribe('parties', {
            limit: this.pagination.perPage,
            skip: this.pagination.currentPage * this.pagination.perPage - this.pagination.perPage
        }, true);

        this.autorun(()=> {
            this.parties = Parties.find();
        }, true);

        Meteor.call('partiesCount',
            (error:any, results:any)=> {

                let totalPages: number = Math.ceil(results / this.pagination.perPage);

                var pages:number[] = [];

                for (let i = 1; i < totalPages + 1; i++) {
                    pages.push(i);
                }

                this.pagination.arrayPages = pages;

                this.pagination = {
                    perPage: 10,
                    currentPage: this.pagination.currentPage,
                    items: results,
                    totalPages: Math.ceil(results / this.pagination.perPage),
                    arrayPages: pages
                };

            }
        )
    }

    private setUpPageDetails():void {
        this.pageTitle = 'List Of Parties';
    }

    public onDestroy() {
        this.subscription.stop();
    }

}