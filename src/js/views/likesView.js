import { elements } from "./base";



export const highlightSelected=id=>{
    let list=document.querySelectorAll('.likes__link');
    Array.from(list).forEach(el=>{
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
    
}


export const renderlike=(like)=>{
    const markup= 
            `<li>
            <a class="likes__link" data-id=${like.id} href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>`


elements.renderlike.insertAdjacentHTML('beforeend', markup);
}

export const changeIcon=(type)=>{
const markup= `<button class="recipe__love">
<svg class="header__likes">
    <use href="img/icons.svg#${type=='unlike' ? 'icon-heart-outlined': 'icon-heart'}"></use>
</svg>
</button>`
document.querySelector('.recipe__love').innerHTML=markup;
}


export const deleteLike=(id)=>{
   const item= document.querySelector(`[data-id="${id}"]`);
   console.log(item)
  if(item) item.parentElement.removeChild(item);

}