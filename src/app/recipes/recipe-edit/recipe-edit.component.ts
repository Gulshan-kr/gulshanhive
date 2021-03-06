import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm : FormGroup;
  constructor(private route: ActivatedRoute,private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params)=>{
        this.id = +param['id'];
        this.editMode = param['id'] != null;
        this.initForm();
        console.log(this.editMode);
      }
    );

  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath ='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode === true){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name,Validators.required),
              'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/-?\d+/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  onSubmit(){
   // const newRecipe = new Recipe(this.recipeForm.value['name'],
   // this.recipeForm.value['description'],
   // this.recipeForm.value['imagePath'],
   // this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    } 
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }    
    this.onCancel();                                                                                
  }

  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/-?\d+/)])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo: this.route});
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
