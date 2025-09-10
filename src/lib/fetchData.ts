import axios from "axios"


const fetchProducts = async () => {
    try { 
        const response = await axios.get("https://fakestoreapi.com/products") ; 
        return response.data ; 
    } catch (error) {
        console.error("Error while fetching products:", error) ;
        throw error ;
    }

}

export {fetchProducts} ; 