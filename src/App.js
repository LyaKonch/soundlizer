import logo from './logo.svg';
import './App.css';
import React,{lazy, useEffect, useState} from 'react';
import {sounds,soundsBlack} from './soundeffects/sounds.js';
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePause } from '@fortawesome/free-solid-svg-icons'

function App() {
   const [soundsArray, setNewSounds] = useState(sounds);
   const [value, setValue] = useState(30);
   const keyArray = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];
   const [audio, setAudio] = useState(new Audio());
   const [display, setDisplay] = useState("");
   const [styles,setStyles]=useState({
      float:"left"
   })
   const [showIframe,setShowIframe]=useState(false);
   const [active,setActive]=useState(false);

   function handleCLick(id){
      let [soundPath] = soundsArray.filter(elem => elem.name==id);
      audio.src = soundPath.path;
      audio.volume = value / 100;
      audio.load();
      audio.play();
      setDisplay(soundPath.name);
      if( id=='Карась крутиться'){
         setShowIframe(true);
      }else{
         setShowIframe(false);
      }

   }
   useEffect(() => {
      document.addEventListener("keydown", handleKeyEvents);
      document.addEventListener("keyup", handleKeyEventsStyles);
      return () => {
         document.removeEventListener("keydown", handleKeyEvents);
         document.addEventListener("keyup", handleKeyEventsStyles);
      };
   }, [soundsArray]);

   function handleChange(){
      if(sounds === soundsArray){
         setNewSounds(soundsBlack);
         setDisplay("Національний банк чорного гумору");
         setStyles({
            float:"right"
         })
      } else {
         setNewSounds(sounds);
         setDisplay("Національний банк білого гумору");
         setStyles({
            float:"left"
         })
      }
   }
   function handleKeyEventsStyles(e){
      for (let a of document.querySelectorAll("button")) {
         let b=[...a.classList];
         if(b.includes('active')){
            a.classList.toggle('active');
         }
      }
   }

   function handleKeyEvents(e){
      let [soundObject] = arrayForRender.filter(elem => elem.props.keyIndex == e.code.slice(3,));
      if(soundObject != undefined){
         let [soundPath] = soundsArray.filter(elem => elem.name == soundObject.key);
         for (let a of document.querySelectorAll("button")) {
            if (a.textContent.includes(e.code.slice(3,))) {
              a.classList.toggle('active');
            }
         }
         audio.src = soundPath.path;
         audio.load();
         audio.play();
         setDisplay(soundObject.key);
      }
      if(e.code.slice(3,)=="Z"){
         setShowIframe(true);
      }else{
         setShowIframe(false);
      }
      if(e.code==="Space"){
         audio.currentTime=0;
         audio.pause();
         return;
      }
   }

   function audioFlow(){
      audio.currentTime=0;
      audio.pause();
   }


   const handleChanges = (event, newValue) => {
      setValue(newValue);
      audio.volume = newValue / 100;
      setDisplay("Volume: " + Math.floor(audio.volume*100));
   };

   const arrayForRender = soundsArray.map((elem, index) => (
      <Button key={elem.name} clickHandler={handleCLick} id={elem.name} keyIndex={keyArray[index] } />
   ));
   return (
      <>
      {showIframe && <iframe className="video" src="https://www.youtube.com/embed/mdK5Maa0RTI?mute=1&autoplay=1&controls=0&frameborder=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>}
      <div className="wrapper">

         <div className="buttons-area" >
            {arrayForRender}
         </div>
         <div className='interactive-area'>
            <p className='display-tab'>{display}</p>
            <Box sx={{ width: "100%"}}>
               <Stack spacing={2} direction="row" sx={{ mb: 0 }} alignItems="center">
                  <Slider aria-label="Volume" value={value} onChange={handleChanges} />
               </Stack>
            </Box>
            <div className='stop-control'>
               <p>Стоп</p>
               <div onClick={audioFlow} className='stop'>
                  <FontAwesomeIcon icon={faCirclePause} className='stop-icon'/>
               </div>
            </div>
            <div className='control'>
               <p>Зміни набір аудіо</p>
               <div onClick={handleChange} className='select'>
                  <div className='select-inner' style={styles}></div>
               </div>
            </div>
         </div>


      </div>
      </>
   );
}

function Button(props){
   return (
      <button className={`button`} onClick={(e)=>props.clickHandler(props.id)} >{props.keyIndex}</button>
   );
}
export default App;
