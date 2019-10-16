export const elements={
    searchForm:document.querySelector(".search"),
    searchInput:document.querySelector(".search__field"),
    searchResultList:document.querySelector(".results__list"),
    resultsLink:document.querySelector(".results__link"),
    renderspinner:document.querySelector('.results'),
    renderButton:document.querySelector('.results__pages'),
    renderRecipe:document.querySelector('.recipe'),
    rendershoppingList:document.querySelector('.shopping__list'),
    renderlike:document.querySelector('.likes__list')
};

 // render a spinner to the ul
export const elementstrings={
    loader:"loader"
    };


export const renderloader=(parent)=>{
    const loader=`
    <div class="${elementstrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

//clear loader from the ul
export const clearloader=()=>{
    const load=document.querySelector(`.${elementstrings.loader}`);
    if (load){
        load.parentElement.removeChild(load);
    }
}