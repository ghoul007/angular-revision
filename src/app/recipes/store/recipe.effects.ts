import { map } from 'rxjs/operators';
import { Recipe } from './../recipe.model';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions'
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchREcipes = this.action$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(
                "https://recipe-book-ng-project-6e3d2.firebaseio.com/recipes.json"
            );
        }),
        map(recipes => {
            return recipes.map(recipe => ({
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
            }));
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    )


    constructor(private action$: Actions, private http: HttpClient) { }
}