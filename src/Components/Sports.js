import axios from "axios";
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import { mediaQueries } from "./DeviceSizes";


const Sports = (props) => {
    const [sportsArray, setSportsArray] = useState([]);

    useEffect(() => { 
        getSports()
    },[props.city, props.startDate, props.endDate ]);

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




    
    let sportsRender = (
        <ul>
            {sportsArray.map(sport => {
                return (
                    <SportsSquare key={sport.id}>
                        <ImageBlock>
                            <img src={sport.images[0].url} alt='concert' />
                        </ImageBlock>
                        <InfoBlock>
                            <a href = {sport.url}>
                                <div>{sport.name}</div>
                                <div>{'Date: ' + sport.dates.start.localDate}</div>
                                <Venue>
                                    <div>{'@ ' + sport._embedded.venues['0'].name}</div>
                                </Venue>
                            </a>
                        </InfoBlock>
                    </SportsSquare>
                )
            })} 
        </ul>
    );  
    
    let sportsArrayDetails= {
        containerHeight: `${sportsArray.length * 200}`, //extends container height as events get added
        numberOfEvents: `${sportsArray.length}`, //extends amount of rows in container as events added
    }
    if (sportsArray.length < 1){
        sportsRender = 'No games scheduled between these dates.'
    }
    

    return ( 
        <div className='sliderDiv'>
        <Container>
            {sportsRender}
        </Container>
        </div>
     );
}

const Container = styled.div`
    width: 100%;
    height: 350px;

    background-color: grey;
    color: rgba(9,9,69,1);
    ${mediaQueries.phone} {
        
        margin: 0;
        height: 800px;
        height: (${(sportsArrayDetails) => sportsArrayDetails.containerHeight});
    }
    ul{
        padding: 0px;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5,minmax(0,1fr));
        ${mediaQueries.phone} {
            height: 100%;
            /* grid-template-rows: repeat((${(sportsArrayDetails) => sportsArrayDetails.numberOfEvents}),minmax(0,1fr)); */
            grid-template-columns: 1fr;
        }
    }
    
`;

const SportsSquare = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0px 10px;
    max-height: 325px;
    /* border: 2px solid rgb(133 133 156); */
    ${mediaQueries.phone} {
        flex-direction: row;
        height: 150px;   
        align-items: center;
 
    }
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

const ImageBlock = styled.div`
    width: 80%;
    img{
        ${mediaQueries.phone}{
            width: 80%;
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

const Venue = styled.div`
    ${mediaQueries.phone} {
        display: none !important;
    }
`;

export default Sports;
