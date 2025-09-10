import axios from "axios"
import { cache } from "react";


const fetchProducts = cache(async () => {
    try { 
        const response = await axios.get("https://fakestoreapi.com/products") ; 
        return response.data ; 
    } catch (error) {
        console.error("Error while fetching products:", error) ;
        throw error ;
    }

})


export {fetchProducts} ; 