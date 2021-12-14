import styled from 'styled-components';
import { useEffect } from 'react';
const YelpEvents = (props) => {
    




    async function images() {
        try {
        fetch("https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=chicago&lang=en_US&units=km",
        {
            "method": "GET",
            "headers": {
                'Content-Type': 'application/json',
                "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
                "x-rapidapi-key": "095dcd531emsh21726b1419b7923p15631cjsn9eb8617747d1"
            }
        })
        .then(response => {
            console.log(response);
        })
        } catch(err) {
            console.log(err.message);
        }
    }
    
    useEffect(() => {
        images()
    },[props])
    
    return ( 
        <div className = 'kayakSearchWidgetContainer'>
            
        </div>
     );
}
 
export default YelpEvents;