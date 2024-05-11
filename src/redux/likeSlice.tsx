// likeSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single product
export interface Product {
  id: string;
  name: string;
  // Add other properties if needed
}

// Define the type for the state of the likes
interface LikesState {
  likes: Product[];
}

// Initial state
const initialState: LikesState = {
  likes: JSON.parse(localStorage.getItem("likedProducts") ?? "[]") as Product[],
};

// Create the likes slice
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    likedProduct: (state, action: PayloadAction<Product>) => {
      const existingProductIndex = state.likes.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex === -1) {
        state.likes.push(action.payload);
      } else {
        state.likes.splice(existingProductIndex, 1);
      }
      localStorage.setItem("likedProducts", JSON.stringify(state.likes));
    },
    removeLike: (state, action: PayloadAction<Product>) => {
      state.likes = state.likes.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("likedProducts", JSON.stringify(state.likes));
    },
  },
});

// Export actions and the slice
export const { likedProduct, removeLike } = likeSlice.actions;
export { likeSlice };
