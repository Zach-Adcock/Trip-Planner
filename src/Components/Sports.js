import axios from "axios";
import { useState, useEffect } from "react";
import styled from 'styled-components';


const Sports = (props) => {
    const [sportsArray, setSportsArray] = useState([]);


    useEffect(() => {
        // setTimeout(function(){
        //     getSports()
        // }, 2000); 
        getSports()
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
                setSportsArray(sportsArray.slice(0,5)); //Only show first five sports
                console.log(sports);
            })
            .catch((err) => console.log(err.message))
    };




    
    
    
    return ( 
        <div className='sliderDiv'>
        <Container>
            {/* <div>{sportsArray.length !== 0 && 'jijio'}</div> */}
            {/* { !sportsArray && sportsArray.map(sport => { */}

            {sportsArray.map(sport => {
                return (
                    <SportsSquare key={sport.id}>
                        <a>
                            <img src={sport.images[0].url} alt='concert' />
                        </a>
                        <InfoBlock>
                            <div>{sport.name}</div>
                            <div>{'Date: ' + sport.dates.start.localDate}</div>
                            <div>{'@ ' + sport._embedded.venues['0'].name}</div>
                        </InfoBlock>
                    </SportsSquare>
                )
            })}
        </Container>
        </div>
     );
}

const Container = styled.div`
    width: 100%;
    height: 350px;

    background-color: grey;
    color: rgba(9,9,69,1);
    display: grid;
    grid-template-columns: repeat(5,minmax(0,1fr));
`;

const SportsSquare = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 5px 10px;
    max-height: 325px;
    padding-top: 5px;
    /* border: 2px solid rgb(133 133 156); */

    a {
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

const InfoBlock = styled.div`
    overflow: scroll;
    height: 40%;
    padding: 19px 2px;
    background-color: white;
    border-radius: 9px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    div {
        margin-top: 2px;
    }
`;

export default Sports;
