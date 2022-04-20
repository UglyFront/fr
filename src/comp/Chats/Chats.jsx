import Animate from "../Animate";
import {Link} from "react-router-dom"
import ChatItem from "./ChatItem";
import { useState } from "react";
import { HashLink as MyLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import {ADRESS} from '../../redux/const'
import { AT } from "../../redux/action";
import { useEffect } from "react";



function Chats() {
  const dispatch = useDispatch()

  let user = useSelector(state => state.user)


  const [v, setV] = useState(false)

  const cont = useSelector(state => state.contacts)

  useEffect(() => {
    dispatch(AT.getContacts({id: user.id}))
  })




  const [search, setSearch] = useState(false)
  const [sArr, setSArr] = useState([])
  const [inp, setInp] = useState('')

 
  async function goSearch(e) {
    setInp(e.target.value)
    setSearch(true)
    if (e.target.value.length  == 0 || e.target.value.length == 1 ) {
      setSearch(false)
      dispatch(AT.getContacts({id: user.id}))
    } 
    else {
      await fetch(`http://${ADRESS}:4444/search?v=${e.target.value}`)
      .then(response => response.json())
      .then(data => setSArr(data))
    }
  }
 

 

  if(user.id) {
    return (
      <div className="chats" onClick={() => { dispatch(AT.getContacts({id: user.id}))}}>

          
                        <div className="blocked"  style={v? {opacity: 1,  } : {opacity: 0,  zIndex: -10}}  onClick={(e) => setV(!v)}>

                            <div onClick={(e) => {
                            e.stopPropagation()
                            // setV(true) эквивалент
                        }} className="sidebar_profile" style={v? {transform: "translateX(0%)"} : {transform: "translateX(-100%)"}}>
                            
                              <h2 style={{marginTop: "20px", marginLeft: "40px"}}>Профиль</h2>
                              <div className="info_profile">
                                  <div className="img_profile" style = {{background: `url(${user.img}) no-repeat center`, backgroundSize: "cover", width: "75px", height: "75px"}}>
                                    <div id="block_img" onClick={async () => {
                                      let img = prompt("Ссылка на изображение")

                                      let body = {
                                        id: user.id,
                                        img: img
                                      }

                                      await fetch(`http://${ADRESS}:4444/img`, {
                                        method: "put",
                                        body: JSON.stringify(body),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    })

                                    let body2 = {
                                      login: user.login,
                                      password: user.password
                                    }
                                
                                    dispatch(AT.login(body2))


                                    }}>
                                    <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0832 0.481125C15.3779 0.481125 15.6567 0.614141 15.8409 0.84264L17.8782 3.3709H21.3713C22.979 3.3709 24.2822 4.66469 24.2822 6.26067V15.8932C24.2822 17.4892 22.979 18.783 21.3713 18.783H2.93567C1.32803 18.783 0.0247803 17.4892 0.0247803 15.8932V6.26067C0.0247803 4.66469 1.32803 3.3709 2.93567 3.3709H6.42777L8.46613 0.84264C8.65026 0.614141 8.92904 0.481125 9.2238 0.481125H15.0832ZM12.1535 5.29741C9.07218 5.29741 6.57428 7.77718 6.57428 10.8361C6.57428 13.8951 9.07218 16.3749 12.1535 16.3749C15.2348 16.3749 17.7327 13.8951 17.7327 10.8361C17.7327 7.77718 15.2348 5.29741 12.1535 5.29741ZM12.1534 6.7423C14.4309 6.7423 16.2772 8.57517 16.2772 10.8361C16.2772 13.0971 14.4309 14.93 12.1534 14.93C9.87593 14.93 8.02966 13.0971 8.02966 10.8361C8.02966 8.57517 9.87593 6.7423 12.1534 6.7423ZM18.9456 5.0566C18.5436 5.0566 18.2178 5.38005 18.2178 5.77904C18.2178 6.17804 18.5436 6.50148 18.9456 6.50148C19.3475 6.50148 19.6733 6.17804 19.6733 5.77904C19.6733 5.38005 19.3475 5.0566 18.9456 5.0566ZM4.39111 1.44439C4.65905 1.44439 4.87626 1.66002 4.87626 1.92602V2.40765H2.93567V1.92602C2.93567 1.66002 3.15288 1.44439 3.42082 1.44439H4.39111Z" fill="white"/>
</svg>

                                    </div>
                                  </div> 
                                  <div className="text_profile">{user.name}</div> 
                              </div>

                              <div className="about_block">
                                <div className="profile_block">
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6634 9.52858C19.6634 4.48183 15.3165 0.386787 9.96042 0.386787C4.60438 0.386787 0.257446 4.48183 0.257446 9.52858C0.257446 12.3082 1.59646 14.8132 3.6923 16.4947C3.7117 16.513 3.73111 16.513 3.73111 16.5313C3.90576 16.6595 4.08042 16.7876 4.27448 16.9157C4.37151 16.9706 4.44913 17.0426 4.54616 17.1159C6.14966 18.1412 8.04252 18.6891 9.97982 18.6887C11.9171 18.6891 13.81 18.1412 15.4135 17.1159C15.5105 17.0609 15.5881 16.9889 15.6852 16.9328C15.8598 16.8059 16.0539 16.6778 16.2285 16.5496C16.2479 16.5313 16.2673 16.5313 16.2673 16.513C18.3244 14.8121 19.6634 12.3082 19.6634 9.52858ZM9.96042 17.5368C8.13626 17.5368 6.46735 16.9877 5.08953 16.0738C5.10893 15.9274 5.14774 15.7821 5.18656 15.6357C5.30219 15.2389 5.47178 14.8579 5.69111 14.5021C5.90458 14.1544 6.15685 13.8432 6.46735 13.5687C6.75844 13.2942 7.10774 13.0391 7.45705 12.8378C7.82576 12.6365 8.21388 12.4901 8.64081 12.3802C9.07106 12.2709 9.51481 12.2159 9.96042 12.2167C11.2832 12.2078 12.5575 12.6864 13.5117 13.5504C13.958 13.9714 14.3073 14.4655 14.5596 15.0317C14.6955 15.3612 14.7925 15.7089 14.8507 16.0738C13.4185 17.0234 11.7111 17.5342 9.96042 17.5368ZM6.99131 9.07218C6.82032 8.70296 6.73433 8.30373 6.73903 7.90086C6.73903 7.49936 6.81665 7.09672 6.99131 6.73068C7.16596 6.36464 7.39883 6.03635 7.68992 5.76182C7.98101 5.48729 8.33032 5.26882 8.71844 5.1041C9.10655 4.93938 9.53349 4.86617 9.96042 4.86617C10.4068 4.86617 10.8143 4.93938 11.2024 5.1041C11.5905 5.26882 11.9398 5.48844 12.2309 5.76182C12.522 6.03635 12.7549 6.36578 12.9295 6.73068C13.1042 7.09672 13.1818 7.49936 13.1818 7.90086C13.1818 8.3218 13.1042 8.70614 12.9295 9.07103C12.761 9.43165 12.5242 9.76034 12.2309 10.041C11.9332 10.3173 11.5847 10.5401 11.2024 10.6988C10.4005 11.0096 9.50095 11.0096 8.69903 10.6988C8.31675 10.5401 7.96824 10.3173 7.67052 10.041C7.37678 9.76443 7.1457 9.43442 6.99131 9.07103V9.07218ZM15.9957 15.1415C15.9957 15.1049 15.9763 15.0866 15.9763 15.05C15.7854 14.4774 15.5041 13.9352 15.1418 13.4418C14.7792 12.9446 14.3335 12.5062 13.8222 12.1435C13.4317 11.8664 13.0084 11.633 12.5608 11.448C12.7644 11.3213 12.9531 11.1744 13.1236 11.0099C13.4129 10.7405 13.667 10.4394 13.8804 10.1131C14.3102 9.44715 14.5322 8.68039 14.5208 7.90086C14.5268 7.32379 14.408 6.75164 14.1715 6.21937C13.9381 5.7065 13.602 5.24086 13.1818 4.84787C12.7622 4.45899 12.2684 4.1485 11.7264 3.93278C11.161 3.71017 10.5536 3.59847 9.94101 3.60449C9.32835 3.59884 8.72089 3.71093 8.15566 3.93392C7.60897 4.14918 7.11394 4.46626 6.70022 4.86617C6.28789 5.26148 5.95866 5.72684 5.72992 6.23767C5.49347 6.76994 5.37461 7.34209 5.38061 7.91916C5.38061 8.3218 5.43883 8.70614 5.55527 9.07103C5.6717 9.45537 5.82695 9.80311 6.04042 10.1314C6.23448 10.4608 6.50616 10.7537 6.79725 11.0282C6.9719 11.1929 7.16596 11.3382 7.37943 11.4663C6.93046 11.6562 6.50703 11.8958 6.11804 12.1801C5.61349 12.5461 5.16715 12.9842 4.79844 13.4601C4.43246 13.9515 4.15086 14.4942 3.96398 15.0683C3.94458 15.1049 3.94458 15.1415 3.94458 15.1598C2.41151 13.6968 1.46061 11.7225 1.46061 9.52858C1.46061 5.1224 5.28359 1.52036 9.96042 1.52036C14.6372 1.52036 18.4602 5.1224 18.4602 9.52858C18.4577 11.6332 17.5716 13.6513 15.9957 15.1415Z" fill="#242424"/>
</svg>
                                    </div>

                                    <div className="name_block">
                                      <h3>{user.name}</h3>  
                                      <p>Имя</p>
                                    </div>

                                    <div className="edit_block" onClick={async () => {
                                      let name = prompt("Новое имя (10 символов)")

                                      if (name.length > 10) {
                                        alert("Много символов")
                                      }
                                      else {
                                        let body = {
                                          id: user.id,
                                          name: name
                                        }
  
                                        await fetch(`http://${ADRESS}:4444/name`, {
                                          method: "put",
                                          body: JSON.stringify(body),
                                          headers: {
                                              "Content-Type": "application/json"
                                          }
                                      })
  
                                      let body2 = {
                                        login: user.login,
                                        password: user.password
                                      }
                                  
                                      dispatch(AT.login(body2))
                                      }



                                    }}>
                                    <svg width="30" height="30" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3562 1.69423C10.0511 1.40641 9.63713 1.24471 9.20553 1.24471C8.77393 1.24471 8.36001 1.40641 8.05482 1.69423L2.61873 6.82105C2.4339 6.99542 2.30401 7.21474 2.2435 7.45461L1.74546 9.42821C1.73198 9.48168 1.73324 9.53751 1.74914 9.59039C1.76503 9.64326 1.79502 9.69142 1.83625 9.73026C1.87748 9.7691 1.92857 9.79734 1.98466 9.81227C2.04074 9.8272 2.09995 9.82833 2.15663 9.81555L4.24929 9.34542C4.50362 9.28835 4.73617 9.16585 4.92107 8.99154L10.3562 3.86472C10.6614 3.57689 10.8329 3.18652 10.8329 2.77947C10.8329 2.37243 10.6614 1.98206 10.3562 1.69423ZM8.53694 2.14892C8.62474 2.06611 8.72897 2.00043 8.84369 1.95561C8.95841 1.9108 9.08136 1.88773 9.20553 1.88773C9.3297 1.88773 9.45266 1.9108 9.56737 1.95561C9.68209 2.00043 9.78633 2.06611 9.87413 2.14892C9.96193 2.23172 10.0316 2.33003 10.0791 2.43822C10.1266 2.54641 10.1511 2.66237 10.1511 2.77947C10.1511 2.89658 10.1266 3.01254 10.0791 3.12073C10.0316 3.22892 9.96193 3.32723 9.87413 3.41003L9.46842 3.79223L8.13123 2.53154L8.53694 2.14977V2.14892ZM7.64912 2.98709L8.98631 4.24734L4.43804 8.53685C4.34253 8.62693 4.22245 8.68998 4.09101 8.71958L2.53732 9.06832L2.90709 7.60302C2.93847 7.47948 3.00579 7.36581 3.1013 7.27573L7.64912 2.98623V2.98709Z" fill="#242424"/>
</svg>

                                    </div>
                                </div>
                           





                              
                                <div className="profile_block">
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.56145 0.126164C8.99078 0.126164 10.2654 0.424831 11.3854 1.02216C12.5161 1.60883 13.3961 2.44083 14.0254 3.51816C14.6548 4.58483 14.9694 5.80616 14.9694 7.18216C14.9694 8.53683 14.7348 9.59816 14.2654 10.3662C13.7961 11.1235 13.1454 11.5022 12.3134 11.5022C11.7908 11.5022 11.3641 11.3475 11.0334 11.0382C10.7134 10.7288 10.5374 10.3022 10.5054 9.75816C10.1854 10.3128 9.74811 10.7448 9.19345 11.0542C8.63878 11.3528 8.00945 11.5022 7.30545 11.5022C6.55878 11.5022 5.88145 11.3262 5.27345 10.9742C4.67611 10.6115 4.20145 10.1155 3.84945 9.48616C3.50811 8.85683 3.33745 8.1475 3.33745 7.35816C3.33745 6.56883 3.50811 5.86483 3.84945 5.24616C4.20145 4.61683 4.67611 4.12616 5.27345 3.77416C5.88145 3.42216 6.55878 3.24616 7.30545 3.24616C7.98811 3.24616 8.60145 3.3955 9.14545 3.69416C9.70011 3.98216 10.1428 4.39283 10.4734 4.92616V3.31016H11.5134V9.37416C11.5134 9.80083 11.6041 10.1102 11.7854 10.3022C11.9668 10.4942 12.2068 10.5902 12.5054 10.5902C13.0068 10.5902 13.4014 10.2915 13.6894 9.69416C13.9881 9.09683 14.1374 8.26483 14.1374 7.19816C14.1374 5.96083 13.8601 4.87283 13.3054 3.93416C12.7508 2.98483 11.9721 2.24883 10.9694 1.72616C9.97745 1.2035 8.84145 0.942164 7.56145 0.942164C6.27078 0.942164 5.12411 1.21416 4.12145 1.75816C3.12945 2.2915 2.35611 3.04883 1.80145 4.03016C1.24678 5.00083 0.969446 6.11016 0.969446 7.35816C0.969446 8.60616 1.24145 9.72083 1.78545 10.7022C2.34011 11.6835 3.10811 12.4462 4.08945 12.9902C5.08145 13.5342 6.21745 13.8062 7.49745 13.8062C7.99878 13.8062 8.52145 13.7475 9.06545 13.6302C9.62011 13.5128 10.1214 13.3368 10.5694 13.1022L10.8414 13.8862C10.3828 14.1208 9.84945 14.3022 9.24145 14.4302C8.64411 14.5582 8.06278 14.6222 7.49745 14.6222C6.04678 14.6222 4.76145 14.3128 3.64145 13.6942C2.52145 13.0755 1.64678 12.2168 1.01745 11.1182C0.39878 10.0088 0.0894463 8.7555 0.0894463 7.35816C0.0894463 5.95016 0.404113 4.70216 1.03345 3.61416C1.66278 2.5155 2.54278 1.66216 3.67345 1.05416C4.81478 0.435498 6.11078 0.126164 7.56145 0.126164ZM7.44945 10.5742C8.02545 10.5742 8.54278 10.4408 9.00145 10.1742C9.46011 9.9075 9.82278 9.53416 10.0894 9.05416C10.3561 8.5635 10.4894 7.99816 10.4894 7.35816C10.4894 6.72883 10.3561 6.17416 10.0894 5.69416C9.82278 5.2035 9.46011 4.83016 9.00145 4.57416C8.54278 4.3075 8.02545 4.17416 7.44945 4.17416C6.86278 4.17416 6.33478 4.3075 5.86545 4.57416C5.40678 4.84083 5.04411 5.21416 4.77745 5.69416C4.52145 6.17416 4.39345 6.72883 4.39345 7.35816C4.39345 7.9875 4.52145 8.5475 4.77745 9.03816C5.04411 9.51816 5.40678 9.89683 5.86545 10.1742C6.33478 10.4408 6.86278 10.5742 7.44945 10.5742Z" fill="black"/>
</svg>

                                    </div>

                                    <div className="name_block">
                                      <h3>@{user.login}</h3>  
                                      <p>Имя пользователя</p>
                                    </div>

                                    <div className="edit_block" style = {{opacity: 0, cursor: "auto"}}>
                                    <svg width="30" height="30" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3562 1.69423C10.0511 1.40641 9.63713 1.24471 9.20553 1.24471C8.77393 1.24471 8.36001 1.40641 8.05482 1.69423L2.61873 6.82105C2.4339 6.99542 2.30401 7.21474 2.2435 7.45461L1.74546 9.42821C1.73198 9.48168 1.73324 9.53751 1.74914 9.59039C1.76503 9.64326 1.79502 9.69142 1.83625 9.73026C1.87748 9.7691 1.92857 9.79734 1.98466 9.81227C2.04074 9.8272 2.09995 9.82833 2.15663 9.81555L4.24929 9.34542C4.50362 9.28835 4.73617 9.16585 4.92107 8.99154L10.3562 3.86472C10.6614 3.57689 10.8329 3.18652 10.8329 2.77947C10.8329 2.37243 10.6614 1.98206 10.3562 1.69423ZM8.53694 2.14892C8.62474 2.06611 8.72897 2.00043 8.84369 1.95561C8.95841 1.9108 9.08136 1.88773 9.20553 1.88773C9.3297 1.88773 9.45266 1.9108 9.56737 1.95561C9.68209 2.00043 9.78633 2.06611 9.87413 2.14892C9.96193 2.23172 10.0316 2.33003 10.0791 2.43822C10.1266 2.54641 10.1511 2.66237 10.1511 2.77947C10.1511 2.89658 10.1266 3.01254 10.0791 3.12073C10.0316 3.22892 9.96193 3.32723 9.87413 3.41003L9.46842 3.79223L8.13123 2.53154L8.53694 2.14977V2.14892ZM7.64912 2.98709L8.98631 4.24734L4.43804 8.53685C4.34253 8.62693 4.22245 8.68998 4.09101 8.71958L2.53732 9.06832L2.90709 7.60302C2.93847 7.47948 3.00579 7.36581 3.1013 7.27573L7.64912 2.98623V2.98709Z" fill="#242424"/>
</svg>

                                    </div>
                                </div>
                              






                           
                                <div className="profile_block">
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.96044 15.191C12.9795 15.191 16.2377 12.1182 16.2377 8.32783C16.2377 4.53743 12.9795 1.46462 8.96044 1.46462C4.94139 1.46462 1.68321 4.53743 1.68321 8.32783C1.68321 12.1182 4.94139 15.191 8.96044 15.191ZM8.96044 15.9536C13.4262 15.9536 17.0462 12.5395 17.0462 8.32783C17.0462 4.11611 13.4262 0.702043 8.96044 0.702043C4.49465 0.702043 0.874634 4.11611 0.874634 8.32783C0.874634 12.5395 4.49465 15.9536 8.96044 15.9536Z" fill="#242424"/>
<path d="M8.15186 12.522C8.15186 12.7243 8.23705 12.9182 8.38868 13.0612C8.54032 13.2042 8.74599 13.2846 8.96044 13.2846C9.17489 13.2846 9.38055 13.2042 9.53219 13.0612C9.68383 12.9182 9.76902 12.7243 9.76902 12.522V7.18396C9.76902 6.98171 9.68383 6.78775 9.53219 6.64474C9.38055 6.50172 9.17489 6.42138 8.96044 6.42138C8.74599 6.42138 8.54032 6.50172 8.38868 6.64474C8.23705 6.78775 8.15186 6.98171 8.15186 7.18396V12.522ZM8.96044 4.89622C8.74599 4.89622 8.54032 4.81588 8.38868 4.67287C8.23705 4.52986 8.15186 4.33589 8.15186 4.13365C8.15186 3.9314 8.23705 3.73743 8.38868 3.59442C8.54032 3.45141 8.74599 3.37107 8.96044 3.37107C9.17489 3.37107 9.38055 3.45141 9.53219 3.59442C9.68383 3.73743 9.76902 3.9314 9.76902 4.13365C9.76902 4.33589 9.68383 4.52986 9.53219 4.67287C9.38055 4.81588 9.17489 4.89622 8.96044 4.89622Z" fill="#242424"/>
</svg>
                    </div>

                                    <div className="name_block">
                                      <h3>{user.about}</h3>  
                                      <p>О себе</p>
                                    </div>

                                    <div className="edit_block" onClick={async () => {
                                      let about = prompt("Расскажите о себе (15 символов)")

                                      if (about.length > 15) {
                                        alert("Много символов")
                                      }
                                      else {
                                        let body = {
                                          id: user.id,
                                          about: about
                                        }
  
                                        await fetch(`http://${ADRESS}:4444/about`, {
                                          method: "put",
                                          body: JSON.stringify(body),
                                          headers: {
                                              "Content-Type": "application/json"
                                          }
                                      })
  
                                      let body2 = {
                                        login: user.login,
                                        password: user.password
                                      }
                                  
                                      dispatch(AT.login(body2))
                                      }



                                    }}>
                                    <svg width="30" height="30" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3562 1.69423C10.0511 1.40641 9.63713 1.24471 9.20553 1.24471C8.77393 1.24471 8.36001 1.40641 8.05482 1.69423L2.61873 6.82105C2.4339 6.99542 2.30401 7.21474 2.2435 7.45461L1.74546 9.42821C1.73198 9.48168 1.73324 9.53751 1.74914 9.59039C1.76503 9.64326 1.79502 9.69142 1.83625 9.73026C1.87748 9.7691 1.92857 9.79734 1.98466 9.81227C2.04074 9.8272 2.09995 9.82833 2.15663 9.81555L4.24929 9.34542C4.50362 9.28835 4.73617 9.16585 4.92107 8.99154L10.3562 3.86472C10.6614 3.57689 10.8329 3.18652 10.8329 2.77947C10.8329 2.37243 10.6614 1.98206 10.3562 1.69423ZM8.53694 2.14892C8.62474 2.06611 8.72897 2.00043 8.84369 1.95561C8.95841 1.9108 9.08136 1.88773 9.20553 1.88773C9.3297 1.88773 9.45266 1.9108 9.56737 1.95561C9.68209 2.00043 9.78633 2.06611 9.87413 2.14892C9.96193 2.23172 10.0316 2.33003 10.0791 2.43822C10.1266 2.54641 10.1511 2.66237 10.1511 2.77947C10.1511 2.89658 10.1266 3.01254 10.0791 3.12073C10.0316 3.22892 9.96193 3.32723 9.87413 3.41003L9.46842 3.79223L8.13123 2.53154L8.53694 2.14977V2.14892ZM7.64912 2.98709L8.98631 4.24734L4.43804 8.53685C4.34253 8.62693 4.22245 8.68998 4.09101 8.71958L2.53732 9.06832L2.90709 7.60302C2.93847 7.47948 3.00579 7.36581 3.1013 7.27573L7.64912 2.98623V2.98709Z" fill="#242424"/>
</svg>

                                    </div>
                                </div>
                              </div>
               


                              <Animate width = "100%" height = "200px"/>

                              <div className="close" onClick={(e) => setV(!v)}>X</div>
                            </div>
                        </div> 



            {
              search && !sArr.length !== 0?
              <h1>ПОИСК</h1>
              :
              <h1>ЧАТЫ</h1>
            }
        <header>
            <div id="burger" onClick={() => setV(!v)}>
                
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16H18M6 8H18H6ZM6 12H18H6Z" stroke="#242424" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

                
            </div>
            <input onChange = {goSearch}type="text" placeholder="Поиск"/>
        </header>

        <div className="wrapper_chats">


          {
            sArr.length !== 0 && (inp !== "" || inp !== " ") && search? 
            sArr.map(el => <MyLink to = "/chat"><ChatItem idother = {el.id} img = {el.img} about = {el.about} name = {el.name}/></MyLink>)
            :
            cont.length === 0 && (inp == "" || inp == " ") ? 
              <div style={{position: "absolute", left: 0}}>
                <Animate width = "100%" height = "200px"/>
              </div>
                : 
                cont.map(el => <MyLink to = "/chat"><ChatItem idother = {el.id} img = {el.img} about = {el.about} name = {el.name}/></MyLink>)
                  
             
          }
        </div>

      </div>
    );
  }

  else {
    return(<Link to = "/auth">К авторизации...</Link>)
  }
  }
  
  export default Chats;
  