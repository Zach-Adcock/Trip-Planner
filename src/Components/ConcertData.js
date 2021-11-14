import useEventDataFetch from "./useEventDataFetch";

const ConcertData = () => {
    
    const { data, isPending, error } = useEventDataFetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=VuGevZLFA14RJ1cDz20zVsfKjRbFSVA9');
    let mappedArray =[]
    //const eventsObject = data["_embedded"]//['events'];
    // if (data) {
    //     mappedArray = (data._embedded.events).map(line => line.name)
    //     console.log(mappedArray)
    // }
     
    return {data, isPending, error};
}
 
export default ConcertData;






// import { useState, useEffect } from "react";
// import { useEventDataFetch } from "./useEventDataFetch";
// import SearchBar from "./SearchBar";

// const Concerts = (props) => {
//     console.log('Props ', props.city);
//     const [city,setCity] = useState(props.city);
//     const [startDate, setStartDate] = useState(props.startDate);
//     const [endDate, setEndDate] = useState(props.endDate);
//     const [fiveConcerts, setFiveConcerts] = useEffect([]);
//     const [isLoading, setIsLoading] = useEffect(true);
  
//   useEffect(() => {
//      loadData();
//      props.enableBtn();
//   }, [props.refresh]);
    
//     const loadData = async () => {
//           const { data, isPending, error } = await useEventDataFetch(`https://app.ticketmaster.com/discovery/v2/events.json?
//         classificationName=music
//         &city=[${city}]
//         &startDateTime=${startDate}
//         &endDateTime=${endDate}
//         &apikey=VuGevZLFA14RJ1cDz20zVsfKjRbFSVA9`);
//        console.log('Is pending: ', isPending);
//        setIsLoading(isPending);
       
//     // const dates = data._embedded.events.dates.start.localDate
//     let fiveCons, mappedArray;
//     if (!isPending) {
//           mappedArray = (data._embedded.events);          
//           // fiveCons = mappedArray.slice(0,5);          

//           fiveCons = await mappedArray.reduce((acc, concert) => {              
//           if (concert.classifications['0'].segment.name === 'Music'){ //Digs through data for music classification                  
//           acc.push(concert)              
//           }              
//           return acc          
//           }, []).slice(0,5)
//           setFiveConcerts(fiveCons);
//                     // console.log(fiveConcerts);
//     }


//     }
    
    
    
    
//     return ( 
//         <div className="concert-display">
//             <div>{ !isLoading && fiveConcerts.map(concert => {
//                 return (
//                     <div key={concert.id}>
//                         <div>{'Name: ' + concert.name}</div>
//                         <div>{'Date: ' + concert.dates.start.localDate}</div>
//                         <div>{'Venue: ' + concert._embedded.venues['0'].name}</div>
//                     </div>
//                 )
//             })}</div>
//         </div>
//      );
// }
 
// export default Concerts;