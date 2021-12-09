import axios from "axios";
import { useState, useEffect } from "react";
import useEventDataFetch from "./useEventDataFetch";
import styled from 'styled-components';


const Concerts = (props) => {
    console.log('Props ', props);
    const [concertArray, setConcertArray] = useState([]);


    useEffect(() => {
        setTimeout(function(){
            getConcerts()
        }, 2000); 
        
    }, [props]);

    //makes call to ticketmaster API and filters events categorized as music
    const getConcerts = () => { 
        return axios
            .get(`https://app.ticketmaster.com/discovery/v2/events.json?
                classificationName=music
                &city=[${props.city}]
                &startDateTime=${props.startDate}
                &endDateTime=${props.endDate}
                &apikey=VuGevZLFA14RJ1cDz20zVsfKjRbFSVA9`)
            .then((res) => {
                let concerts= res.data._embedded.events;
                let concertsArray = concerts.filter((listing) => { //removes non music events from event list
                    let classifications = listing.classifications;
                    return classifications.some((x) => x.segment.name.toLowerCase() === 'music')
                })
                console.log(concertsArray)
                setConcertArray(concertsArray.slice(0,5)); //Only show first five concerts
            })
            .catch((err) => console.log(err.message))
    };




    
    
    
    return ( 
        <Big>
        <Container>
            <div>{concertArray.length !== 0 && 'jijio'}</div>
            {/* { !concertArray && concertArray.map(concert => { */}

            {concertArray.map(concert => {
                return (
                    <div key={concert.id}>
                        <div>{'Name: ' + concert.name}</div>
                        <div>{'Date: ' + concert.dates.start.localDate}</div>
                        <div>{'Venue: ' + concert._embedded.venues['0'].name}</div>
                    </div>
                )
            })}
        </Container>
        </Big>
     );
}

const Big = styled.div`
    position: fixed;
`;
const Container = styled.div`
    /* background: green; */
    position: relative;
    top: 200px;
    left: 0px;
    height: 100px;
    width: 500px;
    color: black;
`;
export default Concerts;



   