import { AppDispatcher } from './Dispatcher';
import { State } from './Store';
import { Products } from '../utils/types';

export const ProductActionTypes = {
    ADD_TO_CART:"ADD_TO_CART",
    REMOVE_FROM_CART:"REMOVE_FROM_CART"
};

export const ProductActions = {
    addToCart: (product: Products) => {
        AppDispatcher.dispatch({
            type: ProductActionTypes.ADD_TO_CART,
            payload: product,
        })
    },
    removeFromCart: (product: Products) => {
        AppDispatcher.dispatch({
            type: ProductActionTypes.REMOVE_FROM_CART,
            payload: product,
        })
    }
}

export const LoadStorageActionTypes = {
    LOAD_STORAGE: 'LOAD_STORAGE',
}  

export const StorageActions = {
    load: (state: State) =>{        
        AppDispatcher.dispatch({
            type: LoadStorageActionTypes.LOAD_STORAGE,
            payload: state,
        })  
    }
}
