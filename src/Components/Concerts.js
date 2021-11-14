import { useState } from "react";
import useEventDataFetch from "./useEventDataFetch";
import SearchBar from "./SearchBar";

const Concerts = (props) => {
    console.log('Props ', props.city);
    const [city,setCity] = useState('Seattle');
    const [startDate, setStartDate] = useState('2021-11-18T00:00:00Z');
    const [endDate, setEndDate] = useState('2021-11-19T00:00:00Z');

    // setCity(props.city)

    const { data, isPending, error } = useEventDataFetch(`https://app.ticketmaster.com/discovery/v2/events.json?
        classificationName=music
        &city=[${city}]
        &startDateTime=${startDate}
        &endDateTime=${endDate}
        &apikey=VuGevZLFA14RJ1cDz20zVsfKjRbFSVA9`);
    console.log('Is pending: ', isPending);
    // const dates = data._embedded.events.dates.start.localDate
    let fiveConcerts, mappedArray;
    if (!isPending) {
        mappedArray = (data._embedded.events);
        // fiveConcerts = mappedArray.slice(0,5);

        fiveConcerts = mappedArray.reduce((acc, concert) => {
            if (concert.classifications['0'].segment.name === 'Music'){ //Digs through data for music classification
                acc.push(concert)
            }
            return acc
        }, []).slice(0,5)
        // console.log(fiveConcerts);
    }
    
    
    
    return ( 
        <div className="concert-display">
            <div>{ !isPending && fiveConcerts.map(concert => {
                return (
                    <div key={concert.id}>
                        <div>{'Name: ' + concert.name}</div>
                        <div>{'Date: ' + concert.dates.start.localDate}</div>
                        <div>{'Venue: ' + concert._embedded.venues['0'].name}</div>
                    </div>
                )
            })}</div>
        </div>
     );
}
 
export default Concerts;