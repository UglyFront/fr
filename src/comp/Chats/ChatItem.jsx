
import { useDispatch, useSelector } from "react-redux";
import { AT } from "../../redux/action";
import { useState } from "react";
import { useEffect } from "react";
import { ADRESS } from "../../redux/const";


function ChatItem(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    // function limitStr(str, n, symb) {
    //     if (!n && !symb) return str;
    //     symb = symb || '...';
    //     return str.substr(0, n - symb.length) + symb;
    // }


    // useEffect(() => {
    //     fetch(`http://${ADRESS}:4444/getMsgLast?myid=${user.id}&id=${props.idother}`)
    //     .then(response => response.json())
    //     .then(str => {

            
    //         str.length > 70 ?
    //         setLast(limitStr(str, 70))
    //         :
    //         setLast(str)
            
    //     })
    // }, [])

    // const [last, setLast] = useState("")
    
    return (
            <div className="chat_item" onClick={() => {
                dispatch(AT.selectUser(props.idother))
            }}>
                <div className="chat_img">
                    <div className="img" style = {{background: `url(${props.img}) no-repeat center`, backgroundSize: "cover"}}>
                    
                    </div>
                    <div className="line"></div>
                </div>
                <div className="chat_info">
                    <h4>{props.name}</h4>
                    {/* <p>{last}</p> 
                    82 cимволов с ... */}
                </div>
            </div>
    )
  }
  
  export default ChatItem;
  