import { Usuario } from '../components/interfaces/appInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    loader: boolean;
    user: Usuario | null;
    usuario : Usuario | null;
}



type AuthAction = 
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'addLoader', payload: boolean }
    | { type: 'removeLoader' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }


export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                usuario: null,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload,
                loader: false
            }
    
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'addLoader':
            return {
                ...state,
                usuario: null,
                user: null,
                status: 'not-authenticated',
                token: null,
                loader: action.payload
            }
        
        case 'removeLoader':
            return {
                ...state,
                loader: false
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                usuario: action.payload.user,
                loader: false
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                usuario : null
            }


        default:
            return state;
    }


}


