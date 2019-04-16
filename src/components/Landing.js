import React, { Component } from 'react'
import '../css/ireporter.css';

// handleChange = (event) => {
//     event.preventDefault();
//     setTimeout(()=>{history.push('/signin')}, 3000);
//   }

class Landing extends Component {
    render(){ 
        return(
            <div id="indexBody">
                <div id="indexH1">iReporter</div>
                <div >Corruption is a huge bane to Africa’s development. African countries must develop novel and localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention</div>
                <div id="signIN">Get Started</div>
            </div>
        );
      }
};

export default Landing