import {ADRESS} from "./const"


export const TYPE = {
    LOGIN: "LOGIN",
    CONTACTS: "CONTACTS",
    USER: "USER"
}



 class ACTIONS_THUNK {
        login(body) {
            return dispatch => {
                fetch(`http://${ADRESS}:4444/login`, {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: TYPE.LOGIN,
                        payload: data
                    })
                })
            }
        }
        getContacts(body) {
            return dispatch => {
                //setInterval(() => {
                    fetch(`http://${ADRESS}:4444/contacts`, {
                        method: "put",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {

                        dispatch({
                            type: TYPE.CONTACTS,
                            payload: [...data.flat()]
                        })
                    })
               // }, 5000)
            }
        }

        selectUser(id){
            return dispatch => {
                fetch(`http://${ADRESS}:4444/user?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
                    dispatch({
                        type: TYPE.USER,
                        payload: data
                    })
                })
            }
        }
    }



export const AT = new ACTIONS_THUNK
// export const A = new ACTIONS

