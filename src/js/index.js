// Global app controller;

import Search from './model/Search'
import Recipe from './model/Recipe'
import List from './model/List'
import Likes from './model/Likes'
import {elements} from './views/base'
import * as searchview from './views/searchView'
import * as listview from './views/listview'
import * as likeview from './views/likesView'
import {clearloader, renderloader} from './views/base'
import {renderRecipe,clearHtmlRecipe,updateServingsIngredients} from './views/recipeView'


const state={};

// SEARCH CONTROLLER

const controlSearch= async()=>{
    const query=searchview.getInput();
    if (query){
        state.search=new Search(query);
        searchview.clearinput();
        searchview.clearHtml();
        // render spinner on the ul
        renderloader(elements.renderspinner);
       let res=await state.search.getResults();
       console.log(res);

       if (res.length){

            // remover spinner after the data has been fetched
            clearloader();

            searchview.renderResults(state.search.results);
            


       }
       else {
            
           alert("no matching results were found");
           clearloader();
           
       }

    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

elements.renderButton.addEventListener('click',e=>{
    let results=e.target.closest('.btn-inline');

    if(results){
        const res=parseInt(results.dataset.goto,10);
        searchview.clearHtml();
        searchview.renderResults(state.search.results,res);
    }
    
    }
    
);

//elements.searchResultList.addEventListener('click', e=>{
    //let rest=e.target.closest('.results__link');
   // console.log(rest.dataset.id);

//})

// RECIPE CONTROLLER
 const display= async()=>{
   
const id=window.location.hash.replace('#','');
    if (id){
        // prepare ul for changes
        clearHtmlRecipe();
        renderloader(elements.renderRecipe);

        // highlight the selected recipe
         if (state.search) {
             searchview.highlightSelected(id);
             
         }

         if (state.like){
             likeview.highlightSelected(id);
             
         }



        // create recipe object 
        state.recipe=new Recipe(id);

        // get recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();

        // calculate serving and time
        state.recipe.calcTime();
        state.recipe.calcServing();
       
        // render recipe
        clearloader();
        renderRecipe(state.recipe);
        if (state.like && state.like.isLiked(state.recipe.id)){
                likeview.changeIcon("like");

            }   

    }

}

//List controller
const controlList=()=>{
    if(!state.list){
    state.list=new List();
    }
    const items=state.recipe.ingredients;


    // clear ul
    //listview.clearShoppingList()

    // loop through the list
    if (!state.list.items.length){
    items.forEach(el=>{
       const item= state.list.additem(el.count,el.unit,el.ingredient);
        listview.renderitem(item);
    })
    }
    else{
       items.map((elt)=>{
        const res=state.list.items.find(elf=>elf.ingredient==elt.ingredient);
       if(!res){
        const item= state.list.additem(elt.count,elt.unit,elt.ingredient);
        listview.renderitem(item);

        }
        else{
            alert(`This item ${elt.ingredient} already exists`)
        };

          
       })
       
    }
    

    }

    
 //console.log(state.list)

// likes controller

 const controlLikes=()=>{
     if(!state.like){
        state.like=new Likes();
     }
     
     if(state.like.isLiked(state.recipe.id)){
        state.like.deleteLike(state.recipe.id);
        likeview.deleteLike(state.recipe.id);
        likeview.changeIcon("unlike");
        
     }
    else{
        // prepare ul for results
        likeview.changeIcon("like");
        const item=state.like.addLike(state.recipe.id,
                    state.recipe.title,
                    state.recipe.author,
                    state.recipe.img);
        likeview.renderlike(item);
    }
     
 }


// recipe handling
['hashchange','load'].forEach(event=>window.addEventListener(event, display));

// handing button clicks
elements.renderRecipe.addEventListener('click', e=>{
 if (e.target.matches('.btn-decrease, .btn-decrease *')){
     if(state.recipe.servings>1){
        state.recipe.updateServings('dec');
        updateServingsIngredients(state.recipe);
     }
     
 }
 else if (e.target.matches('.btn-increase, .btn-increase *')){
    state.recipe.updateServings('inc');
    updateServingsIngredients(state.recipe);
}
else if(e.target.matches('.recipe__btn__add, .recipe__btn__add *')){
    controlList();
}
else if(e.target.matches('.recipe__love, .recipe__love *')){
    controlLikes();
    
}

});

// handling delete and update
elements.rendershoppingList.addEventListener('click', e=>{
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        const result=e.target.closest('.shopping__item').dataset.itemid;
        state.list.deleteitem(result);
        listview.deleteitem(result);
    
    }
})