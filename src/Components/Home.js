import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import Concerts from "./Concerts";
import Sports from "./Sports";


const Home = () => {
    
    const [searchCity, setSearchCity] = useState('Seattle');
    const [startDate, setStartDate] = useState('2021-12-18T00:00:00Z');
    const [endDate, setEndDate] = useState('2021-12-20T00:00:00Z');
    
    const changeSearchValues = (newCity, newStartDate, newEndDate) => {
        setSearchCity(newCity);
        setStartDate(newStartDate + 'T00:00:00Z');
        setEndDate(newEndDate + 'T00:00:00Z');
        // console.log(searchCity, startDate, endDate)
    }
    
    useEffect(() => {
        console.log(searchCity, startDate, endDate)
    },[searchCity])
    
    return ( 
        <Container>
            <SearchBar updateSearchValues={(newCity, newStartDate, newEndDate) => {
                // console.log('this works')
                // console.log(newCity);
                changeSearchValues(newCity, newStartDate, newEndDate)
            }} />
            
            <Events>
                <Concerts city={searchCity} startDate={startDate} endDate={endDate} />
                <Sports city={searchCity} startDate={startDate} endDate={endDate} />
            </Events>
        </Container>
     );
}
 

const Container = styled.main`
    background: rgb(5,5,5);
    background: radial-gradient(circle, rgba(5,5,5,0.7651435574229692) 0%,
     rgba(4,78,110,1) 50%, rgba(0,0,0,0.5298494397759104) 100%);
    min-height: calc(100vh);

`;

const Events = styled.div`
    background: white;
    height: 300px;
    width: 500px;
    color: black;
`;
export default Home;

