
 interface ProductCard {
    id : number , 
    title : string ,
    category : string , 
    description : string , 
    price : number , 
    image : string , 
    quantity : number , 
    rating : {
        rate : number ,
        count : number
    }
}


export type {ProductCard} ; 