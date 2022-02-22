import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import Concerts from "./Concerts";
import Sports from "./Sports";
import Welcome from "./Welcome";
import Weather from "./Weather";
import Header from "./Header";
import { mediaQueries } from "./DeviceSizes";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import RestaurantFetch from "./RestaurantFetch";




const Home = () => {
    //Set the default page dates as the current week
    let todayDate = new Date();
    let oneWeekFromToday = new Date();
    oneWeekFromToday.setDate(oneWeekFromToday.getDate() + 7); 
    let initialStartDate = todayDate.toISOString().slice(0,11) + '00:00:00Z';
    let initialEndDate = oneWeekFromToday.toISOString().slice(0,11) + '00:00:00Z';
    const [searchCity, setSearchCity] = useState('Seattle');
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    // date needs to be formatted like: 2022-01-01T00:00:00Z;
    const changeSearchValues = (newCity, newStartDate, newEndDate) => {
        setSearchCity(newCity);
        setStartDate(newStartDate + 'T00:00:00Z');
        setEndDate(newEndDate + 'T00:00:00Z');
    }
    
    //Updates city and dates when any of them are changed via form
    // useEffect(() => { 
    //     console.log(searchCity, startDate, endDate)
    // },[searchCity, startDate, endDate])
    
    let settings = { //settings is for div Carousel
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        initialSlide: 0,
        swipeToSlide: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                swipeToSlide: true,

              }
            },
            {
              breakpoint: 420,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                swipeToSlide: true,

              }
            }
          ]
    }


    return ( 
        <Container>
            <Header city={searchCity}/>
            <SearchBar updateSearchValues={(newCity, newStartDate, newEndDate) => {
                changeSearchValues(newCity, newStartDate, newEndDate)
            }} />
            <CityImg>
                <Welcome city={searchCity}/>
            </CityImg>
            <CarouselContainer>
                <Carousel {...settings}>
                    <Wrap>
                        <Title>Live Music</Title>
                        <Concerts city={searchCity} startDate={startDate} endDate={endDate} />
                    </Wrap>
                    <Wrap>
                        <Title>Sports Events</Title>
                        <Sports city={searchCity} startDate={startDate} endDate={endDate} />
                    </Wrap>
                    {/* Place holder for a third carousel item
                        <Wrap>
                            <Title>Live Music</Title>
                            <Box> empty box</Box>
                        </Wrap> */}
                </Carousel>
            </CarouselContainer>
            <Weather city={searchCity}/>
            <RestaurantFetch city={searchCity} startDate={startDate} endDate={endDate}/>
        </Container>
     );
}


const Container = styled.main`
    overflow-x: clip;
    position: relative;
    background: rgb(5,5,5);
    background: radial-gradient(circle, rgba(5,5,5,0.7651435574229692) 0%,
     rgba(4,78,110,1) 50%, rgba(0,0,0,0.5298494397759104) 100%);
    min-height: calc(100vh);
    padding: 0 calc(5vw);
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    
    ${mediaQueries.phone} {
        flex-direction: column;
        align-items: center;
    }

`;

const CityImg = styled.div`

    position: fixed;
    z-index: 0;
    width:1000px;
    height:1500px;
    margin: 163px auto;
    left: 0;
    right: 0;
    ${mediaQueries.phone} {
        margin: 130px auto;
        width: 90vw;
    }
`;

const CarouselContainer = styled.div`
    max-width: 100vw;
    width: 100%;
`;

const Carousel = styled(Slider)`
    width: 95%;
    margin: 15px auto;
    /* position: absolute; */
    & > button {
        opacity:.5;
        height: 100%;
        width: 6vw;
        z-index: 1;

        &:hover{
            opacity: 1
        }
    }
    ul li button {
        &:before { 
            font-size:12px;
        }
    }

    li.slick-active button::before{
        color: white;
    }
    .slick-list {
        overflow: initial;
    }
    .slick-prev {
        left: -75px;
    }
    .slick-next {
        right: -75px;
    }
    .slick-slide > div {
    margin: 0 10px;
    }
    .slick-list {
    margin: 0 -10px;
    }
`;

const Wrap = styled.div`
    border-radius: 4px;
    /* position: relative; */
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;

    
    .sliderDiv{
        &:hover {
            border: 2px solid white;//rgb(26 81 105);
        }
        border: 5px solid white;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        /* padding: 2px 10px; */
    }
`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
    border: 2px solid white;
    border-radius: 9px;
    width: 40vw;
    margin-left: auto;
    margin-right: auto;
    background-color: grey;

    ${mediaQueries.phone} {
        width: 70vw;
    }
`;

const Box = styled.div`
    width: 100%;
    height: 350px;
    border: 2px solid white;
    border-radius: 9px;
    background-color: grey;
    color: rgba(9,9,69,1);
`;


export default Home;

