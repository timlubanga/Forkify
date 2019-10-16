import axios from 'axios'
import{proxy,apikey,apikey1,apikey2,apikey3} from '../config'
export default class Recipe {
 constructor(id){
    this.id=id;
 }
 async getRecipe(){
     try {
         const result= await axios(`${proxy}https://www.food2fork.com/api/get?key=${apikey1}&rId=${this.id}`);
         this.title=result.data.recipe.title;
         this.author=result.data.recipe.publisher;
         this.img=result.data.recipe.image_url;
         this.url=result.data.recipe.source_url;
         this.ingredients=result.data.recipe.ingredients;
         console.log(result)
     } catch (error) {
         console.log(error)
         
     }

     

 }
 calcTime(){
    const numIng=this.ingredients.length;
    const period=Math.ceil(numIng/3);
    this.time=period*15;
    
}
calcServing(){
    this.servings=4;
}
parseIngredients(){
    const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
    const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
    const newIngredients=this.ingredients.map(el=>{
        // convert to uniform units
        let ingredient=el.toLowerCase();

        unitsLong.forEach((unit,i)=>{
            ingredient=ingredient.replace(unit,unitsShort[i])
        });

        // 2)  remove parenthesis
        ingredient=ingredient.replace(/ *\([^)]*\) */g, " ");

        // 3) parse ingredients into count, unit, and ingredient
        const arrIng=ingredient.split(' ');
        if (!arrIng[0]) {
            arrIng.splice(0,1);
        }
        const unitIndex=arrIng.findIndex(el=>unitsShort.includes(el));

        let objing;
        if (unitIndex==0){
            objing={
                count:1,
                unit:arrIng[unitIndex],
                ingredient:arrIng.slice(unitIndex+1).join(' ')
            }
        } 
        else if (unitIndex >0){
            // there is a unit

            //Ex. 4 1/2 cups arrCount is [4,1/2],
            // Ex. 4 cups. arrCount is [4],



            const arrCount=arrIng.slice(0,unitIndex);
            let count;
                if (arrCount.length==1){
                count=eval(arrIng[0].replace('-','+'));
                count=Number((count).toFixed(1));
                }
                else{
                count=eval(arrIng.slice(0,unitIndex).join('+'));
                }

                objing={
                count,
                unit:arrIng[unitIndex],
                ingredient:arrIng.slice(unitIndex+1).join(' ')
                };
        }


        else if(parseInt(arrIng[0],10)){
            // there is no unit but the first element is a number
            objing={
                count:parseInt(arrIng[0],10),
                unit:'',
                ingredient:arrIng.slice(1).join(' ')

                    }
        }
        else if(unitIndex==-1){
            // there is no unit and no number in first position
            objing={
                count:1,
                unit:'',
                ingredient
                    }
        }

        return objing;
    });
    this.ingredients=newIngredients;
}

updateServings(type){
    //servings
    const newServings=type=='dec'? this.servings-1:this.servings+1;

    //ingredients
    this.ingredients.forEach(el=>{
        el.count *=(newServings/this.servings);
    });
    this.servings=newServings;
}
}


