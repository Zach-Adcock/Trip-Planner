import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import Concerts from "./Concerts";
import Sports from "./Sports";
import Welcome from "./Welcome";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const Home = () => {
    
    const [searchCity, setSearchCity] = useState('Seattle');
    const [startDate, setStartDate] = useState('2021-12-18T00:00:00Z');
    const [endDate, setEndDate] = useState('2021-12-19T00:00:00Z');
    
    const changeSearchValues = (newCity, newStartDate, newEndDate) => {
        console.log(newEndDate)
        setSearchCity(newCity);
        setStartDate(newStartDate + 'T00:00:00Z');
        setEndDate(newEndDate + 'T00:00:00Z');
        // console.log(searchCity, startDate, endDate)
    }
    
    //Updates city and dates when any of them are changed via form
    useEffect(() => { 
        console.log(searchCity, startDate, endDate)
    },[searchCity, startDate, endDate])
    
    let settings = { //settings is for div Carousel
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    }


    return ( 
        <Container>
            <SearchBar updateSearchValues={(newCity, newStartDate, newEndDate) => {
                changeSearchValues(newCity, newStartDate, newEndDate)
            }} />
            <CityImg>
                <Welcome city={searchCity}/>
            </CityImg>
            <Carousel {...settings}>
                <Wrap>
                    <Title>Live Music</Title>
                    <Concerts city={searchCity} startDate={startDate} endDate={endDate} />
                </Wrap>
                <Wrap>
                    <Title>Sports Events</Title>
                    <Sports city={searchCity} startDate={startDate} endDate={endDate} />
                </Wrap>
                <Wrap>
                    <Title>Live Music</Title>
                    <Box> empty box</Box>
                </Wrap>
            </Carousel>
            <EmptyDiv />
            <EmptyDiv />
            <EmptyDiv />
            <EmptyDiv />

        </Container>
     );
}

const EmptyDiv = styled.div`
    width: 1000px;
    height: 400px;
    border: 5px solid grey;
`;


const Container = styled.main`
    position: relative;
    background: rgb(5,5,5);
    background: radial-gradient(circle, rgba(5,5,5,0.7651435574229692) 0%,
     rgba(4,78,110,1) 50%, rgba(0,0,0,0.5298494397759104) 100%);
    min-height: calc(100vh);
    padding: 0 calc(5vw);
    display: flex;
    flex-direction: column;
    

`;

const CityImg = styled.div`

    position: fixed;
    z-index: 0;
    width:1000px;
    height:1500px;
    margin: 90px auto;
    left: 0;
    right: 0;
`;

const Carousel = styled(Slider)`
    margin-top: 15px;
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

