/// <reference path="../../typings/angular2-meteor.d.ts" />
import {Pipe} from 'angular2/angular2';

@Pipe({
  name: 'PartiesFilter'
})
export class PartiesFilter{
    transform(value){
        console.log(value);
        return '**=> ' +  value;
    }
}
