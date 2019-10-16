import {elements} from './base'

export const getInput=()=> elements.searchInput.value;

export const clearinput=()=>{
    elements.searchInput.value='';
}


export const clearHtml=()=>{
    elements.searchResultList.innerHTML=''; 
    elements.renderButton.innerHTML='';
}


export const highlightSelected=id=>{
    let list=document.querySelectorAll('.results__link');
    Array.from(list).forEach(el=>{
        el.classList.remove('results__link--active');
    })
   document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
   console.log(document.querySelector(`a[href="#${id}"]`));
   console.log(list);
}

//limit recipe title to specific number of characters

const limitRecipeTitle=(title,limit=17)=>{
const newTitle=[];
if(title.length>limit){
title.split(' ').reduce((acc,cur)=>{
    if(acc+cur.length<=limit){
        newTitle.push(cur);
    }
    return acc+cur.length;
},0);
return `${newTitle.join(' ')}...`;
}
return title;
}

// render a recipe to the Ul
const renderRecipe=(recipe)=>{
    const markup=`<li>
            <a class="results__link" href="#${recipe.recipe_id}" data-id=${recipe.recipe_id}>
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
}


//create button

const createButtons=(page,type)=>{
return `
        <button class="btn-inline results__btn--${type}" data-goto="${type=='prev' ? page-1 : page+1}">
        <span>Page ${type=='prev' ? page-1 :page+1}</span>
             <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type=='prev' ? 'left':'right'}"></use>
            </svg>
        </button>`
}
// renderbuttons to the ul
const renderButtons=(page, numResults,resPerPage)=>{
    const numberOfPages=Math.ceil(numResults/resPerPage);
    let btn;
    if (page==1 && numberOfPages>1){
        //render 'next' button
        btn=createButtons(page,"next");

    }
    else if(numberOfPages>page){
        // render both buttons
        btn=`${createButtons(page,"prev")}  
             ${createButtons(page,"next")}
        `;

    }
    else if(page==numberOfPages && numberOfPages>1){
        //render 'prev' button
        btn=createButtons(page,"prev");
    }
  elements.renderButton.insertAdjacentHTML('afterbegin',btn);  
}

export const renderResults=(recipes, page=1,resPerPage=10)=>{
const start=(page-1)*resPerPage;
const end=page*resPerPage;
recipes.slice(start,end).forEach(renderRecipe);
renderButtons(page,recipes.length,resPerPage);
    
}
