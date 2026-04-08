import { createFeature } from "@ngrx/store";
import { reducer } from "./user.reducer";


export const userFeature = createFeature({
  name: 'users',
  reducer,  
});