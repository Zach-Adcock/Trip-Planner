import axios from "axios";
import { useState, useEffect } from "react";
import useEventDataFetch from "./useEventDataFetch";
import styled from 'styled-components';


const Sports = (props) => {
    console.log('Props ', props);
    const [sportsArray, setSportsArray] = useState([]);


    useEffect(() => {
        setTimeout(function(){
            getSports()
        }, 2000); 
        
    }, [props]);

    //makes call to ticketmaster API and filters events categorized as music
    const getSports = () => { 
        return axios
            .get(`https://app.ticketmaster.com/discovery/v2/events.json?
                classificationName=sports
                &city=[${props.city}]
                &startDateTime=${props.startDate}
                &endDateTime=${props.endDate}
                &apikey=VuGevZLFA14RJ1cDz20zVsfKjRbFSVA9`)
            .then((res) => {
                let sports= res.data._embedded.events;
                let sportsArray = sports.filter((listing) => { //removes non music events from event list
                    let classifications = listing.classifications;
                    return classifications.some((x) => x.segment.name.toLowerCase() === 'sports')
                })
                console.log(sportsArray)
                setSportsArray(sportsArray.slice(0,5)); //Only show first five sports
            })
            .catch((err) => console.log(err.message))
    };




    
    
    
    return ( 
        <Container>
            <div>{sportsArray.length !== 0 && 'jijio'}</div>
            {/* { !sportsArray && sportsArray.map(sport => { */}

            {sportsArray.map(sport => {
                return (
                    <div key={sport.id}>
                        <div>{'Name: ' + sport.name}</div>
                        <div>{'Date: ' + sport.dates.start.localDate}</div>
                        <div>{'Venue: ' + sport._embedded.venues['0'].name}</div>
                    </div>
                )
            })}
        </Container>
     );
}
const Container = styled.div`
    /* background: green; */
    height: 100px;
    width: 500px;
    color: black;
`;
export default Sports;
