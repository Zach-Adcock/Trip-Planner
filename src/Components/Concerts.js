import axios from "axios";
import { useState, useEffect } from "react";
import styled from 'styled-components';


const Concerts = (props) => {
    const [concertArray, setConcertArray] = useState([]);

    useEffect(() => {
        // setTimeout(function(){
        //     getConcerts()
        // }, 2000); 
        getConcerts()
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
                setConcertArray(concertsArray.slice(0,5)); //Only show first five concerts
                console.log(concerts);
            })
            .catch((err) => console.log(err.message))
    };




    
    
    
    return ( 
        <div className='sliderDiv'>
        <Container>
            {concertArray.map(concert => {
                return (
                    <ConcertSquare key={concert.id}>
                        <div>
                            <img src={concert.images[0].url} alt='concert' />
                        </div>
                        <InfoBlock>
                            <a href = {concert.url}>
                                <div>{concert.name}</div>
                                <div>{'Date: ' + concert.dates.start.localDate}</div>
                                <div>{'@ ' + concert._embedded.venues['0'].name}</div>
                            </a>
                        </InfoBlock>
                    </ConcertSquare>
                )
            })}
        </Container>
        </div>
     );
}

// const Big = styled.div`
// `;
const Container = styled.div`
    width: 100%;
    height: 350px;

    background-color: grey;
    color: rgba(9,9,69,1);
    display: grid;
    grid-template-columns: repeat(5,minmax(0,1fr));
`;

const ConcertSquare = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 5px 10px;
    max-height: 325px;
    /* border: 2px solid rgb(133 133 156); */

    div {
        display: flex;
        align-items: center;
        height: 60%;
        width: 100%;
        justify-content: center;
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;

            border: 1px solid white;
            z-index: 1;
        }
    }
`;

const InfoBlock = styled.a`
    height: 40%;
    padding: 0px 2px;
    background-color: white;
    border-radius: 9px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    &:hover {
        transform: scale(1.05);

    }
    a {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: black;
        justify-content: space-around; 
        &:hover {
            text-decoration: underline;
        }
        div {
            text-align: center;
            vertical-align: middle;
            line-height: 20px;
        }
    }
`;




export default Concerts;



   