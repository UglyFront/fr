import { useSelector } from "react-redux";
import { useState } from "react/cjs/react.production.min";
import { ADRESS } from "../../../redux/const";

function Msg(props) {


    const id = useSelector(state => state.user.id)



if (props.idsend === id && props.voice.length < 5) {
    return (
        <div className="msg">
             <p className = "my">
                 <p className="text">{props.text}</p>
             <span>{props.time}</span>
             </p>
        </div>
       
        )
}


else if (props.voice.length > 5 && props.idsend === id) {
    return (
     <div className="msg">
          <audio src={`http://${ADRESS}:4444/public/${props.voice}`} controls></audio>
           <span>{props.time}</span>
         
      </div>  
    )

}


else if (props.voice.length > 5 && props.idsend !== id) {
    return (
     <div className="msg_not">
          <audio src={`http://${ADRESS}:4444/public/${props.voice}`} controls></audio>
           <span>{props.time}</span>
      </div>  
    )

}

else if (props.idsend !== id && props.voice.length < 5) {
    return (
        <div className="msg_not">
            <p className = "my_not">
                 <p className="text">{props.text}</p>
                <span>{props.time}</span>
            </p>
       </div>
        )
}
  }
  
  export default Msg;