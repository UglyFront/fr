import { useState } from 'react';
import HeaderChat from '../Chat/HeaderChat'
import Msg from '../Chat/Msg'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ADRESS } from '../../../redux/const';
import { createRef, useRef } from 'react';
import { useLayoutEffect } from 'react';
import { Route } from 'react-router-dom';

function Chat(props) {


  let end = useRef()

  

  useEffect(() => { 
    end.current.scrollIntoView() 



    msginp.current.addEventListener("keydown", (e) => {

      if (e.key == 'Enter') {
      end.current.scrollIntoView() 
      let val = msginp.current.value
      let date = new Date
      let h = date.getHours()
      let m = date.getMinutes()


      if (m >= 0 && m <= 9) {
        m = `0${m}`
      }


      if (val.length < 1) {
        
      }
      else {
        let body = {
          text: val,
          idsend: user.id,
          idadress: selectUser.id,
          time: `${h}:${m}`
        }
  
        fetch(`http://${ADRESS}:4444/msg`, {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        })
      }


     msginp.current.value = ""

    }



    setVal("")
    })



    return () => {
      msginp.current.removeEventListener("keydown")
    }
    

    

  }, [])



    const [vUser, setVUser] = useState(false)

    const [voice, setVoice] = useState(false)

    const [msg, setMsg] = useState([])

    const selectUser = useSelector(state => state.selectUser)
    const user = useSelector(state => state.user)
    const [val, setVal] = useState("")


   useEffect(() => {

      
    fetch(`http://${ADRESS}:4444/msg?id=${selectUser.id}&myid=${user.id}`)
    .then(response => response.json())
    .then(data => {

      if (data.length !== msg.length) {
       end.current.scrollIntoView()
      }
        setMsg(data)
  


    })
 
    })


    let msginp = useRef()





    function send() {

      end.current.scrollIntoView() 
      let val = msginp.current.value
      let date = new Date
      let h = date.getHours()
      let m = date.getMinutes()


      if (m >= 0 && m <= 9) {
        m = `0${m}`
      }


      if (val.length < 1) {
        
      }
      else {
        let body = {
          text: val,
          idsend: user.id,
          idadress: selectUser.id,
          time: `${h}:${m}`
        }
  
        fetch(`http://${ADRESS}:4444/msg`, {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        })
      }


     msginp.current.value = ""
     setVal("")
    }


    

      const stopButtonRef = useRef();


      function startRecording() {
        // alert(222)
  
          navigator
              .mediaDevices
              .getUserMedia({ audio: true, video: false })
              .then(function (stream) {
                console.log(stream)

             
                  const options = { mimeType: 'audio/webm' };
                  let recordedChunks = [];
                  const mediaRecorder = new MediaRecorder(stream, options);
  
                  mediaRecorder.addEventListener('dataavailable', function (e) {
                      recordedChunks.push(e.data);
                      console.log(e)
                  });
  
                  mediaRecorder.addEventListener('stop', function () {
  
                        
                    console.log(recordedChunks)
                    let blo2b = new Blob(recordedChunks,  {type: "audio/webm"})
                    recordedChunks = []
                    const file = new File([blo2b], `${user.id}${selectUser.id}${Date.now()}`, {type: "audio/webm"})
                    console.log(file)
                    let data = new FormData()
                    let date = new Date
                    let h = date.getHours()
                    let m = date.getMinutes()


                    if (m >= 0 && m <= 9) {
                      m = `0${m}`
                    }

                    let t = `${h}:${m}`
                 

                    data.append("file", file)
                    data.append("idsend", user.id)       
                    data.append("time", `${t}`)
                    data.append("idadress", selectUser.id)

                    fetch(`http://${ADRESS}:4444/voice`, {
                      method: "post",
                      body: data
                    })
  
                  });
  
                  if (stopButtonRef && stopButtonRef.current)
                      stopButtonRef?.current?.addEventListener('click', function onStopClick() {
                          mediaRecorder.stop();
 

                          this.removeEventListener('click', onStopClick)
                      });
  
  
                  mediaRecorder.start();
              });

    }

  


    return (
            <div className="chat">

                {vUser ?
                <div className="blocked" onClick={() => setVUser(!vUser)}>
                    <div className="chat_user_info" style = {{position: "relative", borderRadius: "20px"}}  onClick={(e) => e.stopPropagation()}>
                        <div className="header_info">
                            <h3>О пользователе</h3> 
                            <div className="lock"  onClick={() => setVUser(!vUser)} style = {{cursor: "pointer"}}>
                            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3934 4.66667L8.00002 7.06L5.60669 4.66667L4.66669 5.60667L7.06002 8L4.66669 10.3933L5.60669 11.3333L8.00002 8.94L10.3934 11.3333L11.3334 10.3933L8.94002 8L11.3334 5.60667L10.3934 4.66667Z" fill="#242424"/>
                            </svg>
                            </div>

                            <div className="info_profile" style = {{position: "absolute", left: 0, marginTop: "50px"}}>
                                  <div className="img_profile" style = {{background: `url( ${selectUser.img}) no-repeat center`, backgroundSize: "cover"}}>
                                  </div> 
                                  <div className="text_profile">{selectUser.name}</div> 
                              </div>


                               <div className="about_block" style = {{position: "absolute", marginTop: "160px", left: 0}}>
                                <div className="profile_block"  style = {{width: "230px"}}>
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6634 9.52858C19.6634 4.48183 15.3165 0.386787 9.96042 0.386787C4.60438 0.386787 0.257446 4.48183 0.257446 9.52858C0.257446 12.3082 1.59646 14.8132 3.6923 16.4947C3.7117 16.513 3.73111 16.513 3.73111 16.5313C3.90576 16.6595 4.08042 16.7876 4.27448 16.9157C4.37151 16.9706 4.44913 17.0426 4.54616 17.1159C6.14966 18.1412 8.04252 18.6891 9.97982 18.6887C11.9171 18.6891 13.81 18.1412 15.4135 17.1159C15.5105 17.0609 15.5881 16.9889 15.6852 16.9328C15.8598 16.8059 16.0539 16.6778 16.2285 16.5496C16.2479 16.5313 16.2673 16.5313 16.2673 16.513C18.3244 14.8121 19.6634 12.3082 19.6634 9.52858ZM9.96042 17.5368C8.13626 17.5368 6.46735 16.9877 5.08953 16.0738C5.10893 15.9274 5.14774 15.7821 5.18656 15.6357C5.30219 15.2389 5.47178 14.8579 5.69111 14.5021C5.90458 14.1544 6.15685 13.8432 6.46735 13.5687C6.75844 13.2942 7.10774 13.0391 7.45705 12.8378C7.82576 12.6365 8.21388 12.4901 8.64081 12.3802C9.07106 12.2709 9.51481 12.2159 9.96042 12.2167C11.2832 12.2078 12.5575 12.6864 13.5117 13.5504C13.958 13.9714 14.3073 14.4655 14.5596 15.0317C14.6955 15.3612 14.7925 15.7089 14.8507 16.0738C13.4185 17.0234 11.7111 17.5342 9.96042 17.5368ZM6.99131 9.07218C6.82032 8.70296 6.73433 8.30373 6.73903 7.90086C6.73903 7.49936 6.81665 7.09672 6.99131 6.73068C7.16596 6.36464 7.39883 6.03635 7.68992 5.76182C7.98101 5.48729 8.33032 5.26882 8.71844 5.1041C9.10655 4.93938 9.53349 4.86617 9.96042 4.86617C10.4068 4.86617 10.8143 4.93938 11.2024 5.1041C11.5905 5.26882 11.9398 5.48844 12.2309 5.76182C12.522 6.03635 12.7549 6.36578 12.9295 6.73068C13.1042 7.09672 13.1818 7.49936 13.1818 7.90086C13.1818 8.3218 13.1042 8.70614 12.9295 9.07103C12.761 9.43165 12.5242 9.76034 12.2309 10.041C11.9332 10.3173 11.5847 10.5401 11.2024 10.6988C10.4005 11.0096 9.50095 11.0096 8.69903 10.6988C8.31675 10.5401 7.96824 10.3173 7.67052 10.041C7.37678 9.76443 7.1457 9.43442 6.99131 9.07103V9.07218ZM15.9957 15.1415C15.9957 15.1049 15.9763 15.0866 15.9763 15.05C15.7854 14.4774 15.5041 13.9352 15.1418 13.4418C14.7792 12.9446 14.3335 12.5062 13.8222 12.1435C13.4317 11.8664 13.0084 11.633 12.5608 11.448C12.7644 11.3213 12.9531 11.1744 13.1236 11.0099C13.4129 10.7405 13.667 10.4394 13.8804 10.1131C14.3102 9.44715 14.5322 8.68039 14.5208 7.90086C14.5268 7.32379 14.408 6.75164 14.1715 6.21937C13.9381 5.7065 13.602 5.24086 13.1818 4.84787C12.7622 4.45899 12.2684 4.1485 11.7264 3.93278C11.161 3.71017 10.5536 3.59847 9.94101 3.60449C9.32835 3.59884 8.72089 3.71093 8.15566 3.93392C7.60897 4.14918 7.11394 4.46626 6.70022 4.86617C6.28789 5.26148 5.95866 5.72684 5.72992 6.23767C5.49347 6.76994 5.37461 7.34209 5.38061 7.91916C5.38061 8.3218 5.43883 8.70614 5.55527 9.07103C5.6717 9.45537 5.82695 9.80311 6.04042 10.1314C6.23448 10.4608 6.50616 10.7537 6.79725 11.0282C6.9719 11.1929 7.16596 11.3382 7.37943 11.4663C6.93046 11.6562 6.50703 11.8958 6.11804 12.1801C5.61349 12.5461 5.16715 12.9842 4.79844 13.4601C4.43246 13.9515 4.15086 14.4942 3.96398 15.0683C3.94458 15.1049 3.94458 15.1415 3.94458 15.1598C2.41151 13.6968 1.46061 11.7225 1.46061 9.52858C1.46061 5.1224 5.28359 1.52036 9.96042 1.52036C14.6372 1.52036 18.4602 5.1224 18.4602 9.52858C18.4577 11.6332 17.5716 13.6513 15.9957 15.1415Z" fill="#242424"/>
</svg>
                                    </div>

                                    <div className="name_block">
                                      <h3>{selectUser.name}</h3>  
                                      <p>Имя</p>
                                    </div>
                                </div>
                           





                              
                                <div className="profile_block" style = {{width: "230px"}}>
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.56145 0.126164C8.99078 0.126164 10.2654 0.424831 11.3854 1.02216C12.5161 1.60883 13.3961 2.44083 14.0254 3.51816C14.6548 4.58483 14.9694 5.80616 14.9694 7.18216C14.9694 8.53683 14.7348 9.59816 14.2654 10.3662C13.7961 11.1235 13.1454 11.5022 12.3134 11.5022C11.7908 11.5022 11.3641 11.3475 11.0334 11.0382C10.7134 10.7288 10.5374 10.3022 10.5054 9.75816C10.1854 10.3128 9.74811 10.7448 9.19345 11.0542C8.63878 11.3528 8.00945 11.5022 7.30545 11.5022C6.55878 11.5022 5.88145 11.3262 5.27345 10.9742C4.67611 10.6115 4.20145 10.1155 3.84945 9.48616C3.50811 8.85683 3.33745 8.1475 3.33745 7.35816C3.33745 6.56883 3.50811 5.86483 3.84945 5.24616C4.20145 4.61683 4.67611 4.12616 5.27345 3.77416C5.88145 3.42216 6.55878 3.24616 7.30545 3.24616C7.98811 3.24616 8.60145 3.3955 9.14545 3.69416C9.70011 3.98216 10.1428 4.39283 10.4734 4.92616V3.31016H11.5134V9.37416C11.5134 9.80083 11.6041 10.1102 11.7854 10.3022C11.9668 10.4942 12.2068 10.5902 12.5054 10.5902C13.0068 10.5902 13.4014 10.2915 13.6894 9.69416C13.9881 9.09683 14.1374 8.26483 14.1374 7.19816C14.1374 5.96083 13.8601 4.87283 13.3054 3.93416C12.7508 2.98483 11.9721 2.24883 10.9694 1.72616C9.97745 1.2035 8.84145 0.942164 7.56145 0.942164C6.27078 0.942164 5.12411 1.21416 4.12145 1.75816C3.12945 2.2915 2.35611 3.04883 1.80145 4.03016C1.24678 5.00083 0.969446 6.11016 0.969446 7.35816C0.969446 8.60616 1.24145 9.72083 1.78545 10.7022C2.34011 11.6835 3.10811 12.4462 4.08945 12.9902C5.08145 13.5342 6.21745 13.8062 7.49745 13.8062C7.99878 13.8062 8.52145 13.7475 9.06545 13.6302C9.62011 13.5128 10.1214 13.3368 10.5694 13.1022L10.8414 13.8862C10.3828 14.1208 9.84945 14.3022 9.24145 14.4302C8.64411 14.5582 8.06278 14.6222 7.49745 14.6222C6.04678 14.6222 4.76145 14.3128 3.64145 13.6942C2.52145 13.0755 1.64678 12.2168 1.01745 11.1182C0.39878 10.0088 0.0894463 8.7555 0.0894463 7.35816C0.0894463 5.95016 0.404113 4.70216 1.03345 3.61416C1.66278 2.5155 2.54278 1.66216 3.67345 1.05416C4.81478 0.435498 6.11078 0.126164 7.56145 0.126164ZM7.44945 10.5742C8.02545 10.5742 8.54278 10.4408 9.00145 10.1742C9.46011 9.9075 9.82278 9.53416 10.0894 9.05416C10.3561 8.5635 10.4894 7.99816 10.4894 7.35816C10.4894 6.72883 10.3561 6.17416 10.0894 5.69416C9.82278 5.2035 9.46011 4.83016 9.00145 4.57416C8.54278 4.3075 8.02545 4.17416 7.44945 4.17416C6.86278 4.17416 6.33478 4.3075 5.86545 4.57416C5.40678 4.84083 5.04411 5.21416 4.77745 5.69416C4.52145 6.17416 4.39345 6.72883 4.39345 7.35816C4.39345 7.9875 4.52145 8.5475 4.77745 9.03816C5.04411 9.51816 5.40678 9.89683 5.86545 10.1742C6.33478 10.4408 6.86278 10.5742 7.44945 10.5742Z" fill="black"/>
</svg>

                                    </div>

                                    <div className="name_block">
                                      <h3>@{selectUser.login}</h3>  
                                      <p>Имя пользователя</p>
                                    </div>
                                </div>
                              






                           
                                <div className="profile_block" style = {{width: "230px"}}>
                                  <div className="icon_block">
                                  <svg width="30" height="30" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.96044 15.191C12.9795 15.191 16.2377 12.1182 16.2377 8.32783C16.2377 4.53743 12.9795 1.46462 8.96044 1.46462C4.94139 1.46462 1.68321 4.53743 1.68321 8.32783C1.68321 12.1182 4.94139 15.191 8.96044 15.191ZM8.96044 15.9536C13.4262 15.9536 17.0462 12.5395 17.0462 8.32783C17.0462 4.11611 13.4262 0.702043 8.96044 0.702043C4.49465 0.702043 0.874634 4.11611 0.874634 8.32783C0.874634 12.5395 4.49465 15.9536 8.96044 15.9536Z" fill="#242424"/>
<path d="M8.15186 12.522C8.15186 12.7243 8.23705 12.9182 8.38868 13.0612C8.54032 13.2042 8.74599 13.2846 8.96044 13.2846C9.17489 13.2846 9.38055 13.2042 9.53219 13.0612C9.68383 12.9182 9.76902 12.7243 9.76902 12.522V7.18396C9.76902 6.98171 9.68383 6.78775 9.53219 6.64474C9.38055 6.50172 9.17489 6.42138 8.96044 6.42138C8.74599 6.42138 8.54032 6.50172 8.38868 6.64474C8.23705 6.78775 8.15186 6.98171 8.15186 7.18396V12.522ZM8.96044 4.89622C8.74599 4.89622 8.54032 4.81588 8.38868 4.67287C8.23705 4.52986 8.15186 4.33589 8.15186 4.13365C8.15186 3.9314 8.23705 3.73743 8.38868 3.59442C8.54032 3.45141 8.74599 3.37107 8.96044 3.37107C9.17489 3.37107 9.38055 3.45141 9.53219 3.59442C9.68383 3.73743 9.76902 3.9314 9.76902 4.13365C9.76902 4.33589 9.68383 4.52986 9.53219 4.67287C9.38055 4.81588 9.17489 4.89622 8.96044 4.89622Z" fill="#242424"/>
</svg>
                    </div>

                                    <div className="name_block">
                                      <h3>{selectUser.about}</h3>  
                                      <p>О себе</p>
                                    </div>

                                </div>
                              </div>
                        </div>   
                    </div>    
                </div>
                :
                ""
                }


                <HeaderChat set = {setVUser} v = {vUser}/>
      
                <div className="msg_box">

                  {msg.map(el => <Msg text = {el.text}  idsend={el.idsend} time={el.time} voice={el.voice}/>)}
                
                  
                  <div  ref = {end} id = "end"></div>
                </div>


                <div className="input_block">
                    <svg 
 width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.834 17.3123L16.3571 22.7892C13.7324 25.4139 9.47697 25.4139 6.85228 22.7892C4.22759 20.1645 4.22759 15.909 6.85228 13.2844L14.2246 5.91203C15.9757 4.16091 18.8149 4.16091 20.566 5.91203C22.3171 7.66316 22.3171 10.5023 20.566 12.2534L12.9614 19.858C12.1387 20.6807 10.8047 20.6807 9.982 19.858C9.15926 19.0353 9.15926 17.7013 9.982 16.8786L15.6911 11.1694C15.9811 10.8795 15.9811 10.4094 15.6911 10.1195C15.4012 9.82958 14.9311 9.82958 14.6412 10.1195L8.93207 15.8287C7.52947 17.2313 7.52947 19.5053 8.93207 20.9079C10.3347 22.3105 12.6087 22.3105 14.0113 20.9079L21.6159 13.3034C23.9469 10.9724 23.9469 7.19309 21.6159 4.8621C19.2849 2.53112 15.5057 2.53112 13.1747 4.8621L5.80235 12.2344C2.5978 15.439 2.5978 20.6346 5.80235 23.8391C9.0069 27.0437 14.2025 27.0437 17.4071 23.8391L22.8839 18.3622C23.1739 18.0723 23.1739 17.6022 22.8839 17.3123C22.594 17.0224 22.1239 17.0224 21.834 17.3123Z" fill="#858E99"/>
                    </svg>
                    <input onChange={(e) => setVal(e.target.value)} ref = {msginp} type="text" placeholder="Сообщение"/>
                    {val === ""?
                    <div className="enter" onClick = {() => {startRecording()}}>{"r"}</div>
                  :
                  <div className="enter" onClick = {() => {send()}}>+</div>
                  }

<div className="enter" ref={stopButtonRef}>{'s'}</div>
                 
                   
                  
                </div>
            </div>
    )
  }
  
  export default Chat;