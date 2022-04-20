import { useSelector, useStore } from "react-redux";
import {Link} from "react-router-dom"

function HeaderChat(props) {

    const selectUser = useSelector(state => state.selectUser)


    return (
                <header>
                <Link to = "/chats">
                 <div className="arrow" style = {{cursor: "pointer"}}>
                 
                        <svg width="20" height="16" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H14V3.5H1V4.5Z" fill="#242424"/>
                        </svg>
                    </div>
                    </Link>

                    <div className="user_info" onClick = {() => props.set(!props.v)}>
                        <div className="img" style = {{background: `url(${selectUser.img}) no-repeat center`, backgroundSize: "cover", width: "40px", height: "40px"}}></div>
                        <h3 className="text_info">{selectUser.name}</h3>
                    </div>

                    <div className="dot"  style = {{cursor: "pointer"}} onClick = {() => props.set(!props.v)}>
                        <svg width="14" height="14" viewBox="0 0 2 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6.99251V7.00749M1 1V1.01498M1 12.985V13" stroke="#242424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </header>
    )
  }
  
  export default HeaderChat;