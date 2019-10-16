import axios from 'axios'
import{proxy,apikey,apikey1,apikey2,apikey3} from '../config'
export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        
    try {
        let res=await axios(`${proxy}https://www.food2fork.com/api/search?key=${apikey1}&q=${this.query}`);
            this.results=res.data.recipes;
            return this.results;
        
        
        
        
       
    } catch (error) {
        alert(error);
    }
       
    }
       }


