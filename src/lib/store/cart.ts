import { ProductCard } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    cart: ProductCard[];
    totalAmount: number;
    totalQuantity: number;
}

const initialState: CartState = {
    cart: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state: CartState, action: PayloadAction<ProductCard>) => {
            const newItem = action.payload;
            const existingProduct = state.cart.find((item: ProductCard) => item.id === newItem.id);
            
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + (newItem.quantity || 1);
            } else {
                state.cart.push({
                    ...newItem,
                    quantity: newItem.quantity || 1,
                });
                state.totalQuantity += 1;
            }
            state.totalAmount = calculateTotalAmount(state.cart);
        },
        removeFromCart: (state: CartState, action: PayloadAction<number>) => {
            const productId = action.payload;
            const existingProduct = state.cart.find(item => item.id === productId);
            
            if (existingProduct) {
                state.cart = state.cart.filter(item => item.id !== productId);
                state.totalQuantity -= 1;
                state.totalAmount = calculateTotalAmount(state.cart);
            }
        },
        updateQuantity: (state: CartState, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === id);
            
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
                state.totalAmount = calculateTotalAmount(state.cart);
            }
        },
        clearCart: (state: CartState) => {
            state.cart = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
    },
});


const calculateTotalAmount = (cart: ProductCard[]): number => {
    return cart.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
};

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
} = cartSlice.actions;

type RootState = ReturnType<typeof import('./store').store.getState>;

export const showCartItems = (state: RootState) => state.cart.cart;
export const showTotalAmount = (state: RootState) => state.cart.totalAmount;
export const showTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export default cartSlice.reducer;