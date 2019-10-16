import {elements} from './base'

export const clearShoppingList=()=>{
    elements.rendershoppingList.innerHTML="";
}
export const renderitem=item=>{
    const markup=`
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`
    
    elements.rendershoppingList.insertAdjacentHTML('beforeend', markup);
}


export const deleteitem=(id)=>{
const item=document.querySelector(`[data-itemid="${id}"]`);
if (item) item.parentElement.removeChild(item);
}