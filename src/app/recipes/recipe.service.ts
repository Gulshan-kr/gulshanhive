import { Recipe } from './recipe.model';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{


  recipeChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService){}

  private  recipes: Recipe[] =  [
        new Recipe('Spagatti','You have to make yourself to ...',
        'https://disneyvacationenthusiast.files.wordpress.com/2012/02/spaghetti1.jpg',[
          new Ingredient('pasta',200),
          new Ingredient('White Sauce',300)
        ]),
        new Recipe('Pizza','Italian pizza are the best',
        'http://images5.fanpop.com/image/photos/30400000/Pizza-pizza-30424284-1366-768.jpg',[
          new Ingredient('Dough',150),
          new Ingredient('Olives',30)
        ])
      ];  

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
       this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number,newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }

      setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

}