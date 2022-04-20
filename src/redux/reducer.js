import {TYPE} from "./action"

let defState = {
    user: {
        id: null,
        img: null,
        about: null,
        name: null,
        login: null,
        password: null
    },

    contacts: [],

    selectUser: {
        id: null,
        img: null,
        about: null,
        name: null,
        login: null
    },

    // selectChatMessage: [],

    search: [],

    test: []
}

export default function reducer(state = defState, action) {
    switch (action.type) {
        case TYPE.LOGIN:
            if (action.payload.id) {
                return {...state, user: {...action.payload}}
            }
            else {
                alert(action.payload)
            }

        case TYPE.CONTACTS:
            return {...state, contacts: [...action.payload]}


            case TYPE.USER:
              //  console.log(action.payload)
                return {...state, selectUser: {...action.payload}}
        


        default: return state
    }
}