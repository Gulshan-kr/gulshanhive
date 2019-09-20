import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  id: number;

  constructor(private recipeService : RecipeService,
    private route: ActivatedRoute,
    private routes:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params)=>{
        this.id= +param['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
   this.routes.navigate(['edit'],{relativeTo: this.route});

   // this.routes.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.routes.navigate(['/recipes']);
  }

}
