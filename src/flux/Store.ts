import { AppDispatcher, Action } from './Dispatcher';
import { ProductActionTypes, LoadStorageActionTypes} from './Actions';
import { Products } from '../utils/types';

export type User = {
    name: string;
    age: number;
}

export type State = {
    cart: Products[]
}

type Listener = (state: State) => void;

type ProductAction = {
    type: string;
    payload: Products;
}

class Store {
    private _myState: State = {
        cart: []
    }
    // Los componentes
    private _listeners: Listener[] = [];

    constructor() {
    const saved = localStorage.getItem("flux:persist");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            this._myState = {
                ...this._myState,
                ...parsed,
            };
        } catch (e) {
            console.error("Error parsing localStorage state:", e);
        }
    }

    AppDispatcher.register(this._handleActions.bind(this));
}

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
    const productAction = action as ProductAction;
    switch (action.type) {
        case ProductActionTypes.ADD_TO_CART:
            if (typeof productAction.payload === 'object') {
                this._myState = {
                    ...this._myState,
                    cart: [...this._myState.cart, productAction.payload]
                };
            }
            this._emitChange();
            this.persist(); // ✅ solo aquí
            break;

        case ProductActionTypes.REMOVE_FROM_CART:
            if (typeof productAction.payload === 'object') {
                this._myState = {
                    ...this._myState,
                    cart: this._myState.cart.filter(product => product.id !== productAction.payload.id)
                };
            }
            this._emitChange();
            this.persist(); // ✅ también aquí
            break;

        case LoadStorageActionTypes.LOAD_STORAGE:
            if (typeof productAction.payload === 'object') {
                this._myState = {
                    ...this._myState,
                    ...productAction.payload
                };
            }
            this._emitChange();
            // ❌ NO persist() aquí — ya viene del localStorage
            break;
    }
}

    
    //notifica que la aplicacion cambió
    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    // Permite a los componentes suscribirse al store
    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState()); // Emitir estado actual al suscribirse
    }

    // Permite quitar la suscripción
    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }

    persist() {
    try {
        localStorage.setItem("flux:persist", JSON.stringify(this._myState));
    } catch (e) {
        console.error("Error guardando en localStorage", e);
    }
}

}

export const store = new Store();