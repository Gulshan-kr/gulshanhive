import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorage } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

    constructor(private dataStorage: DataStorage, public authService: AuthService){}

   @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature:string){
       this.featureSelected.emit(feature);
    }
    onSave(){
        this.dataStorage.storeRecipe()
        .subscribe(
            (response: Response)=>{console.log(response)});

    }
    onFetch(){
        this.dataStorage.getRecipes();
    }
    onLogOut(){
        this.authService.onLogOut();
    }
}
