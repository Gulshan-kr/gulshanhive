import {Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorage{
    
    constructor(private http: Http,private recipeService : RecipeService, private authService: AuthService){}

    storeRecipe(){
     const token = this.authService.getToken();
     return this.http.put('https://innotical-guls-recipe.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes());
    }

    getRecipes(){
       const token = this.authService.getToken();
       this.http.get('https://innotical-guls-recipe.firebaseio.com/recipes.json?auth='+token)
        .pipe(map(
            (response: Response) =>{
                const recipes :Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        console.log(recipe);
                        recipe['ingredients']=[];
                        console.log(recipe);
                    }
                }
                return recipes;
            }
        ))
        .subscribe(
            (recipes: Recipe[])=>{
                this.recipeService.setRecipe(recipes);
            }
        );
    }

}