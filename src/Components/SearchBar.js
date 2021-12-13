import { useState, createContext } from "react";
import Concerts from "./Concerts";
import styled from 'styled-components';

const SearchBar = (props) => {

    const [formData, setFormData] = useState(
        {city: "Seattle", startDate: "2021-12-18T00:00:00Z", endDate: "2021-12-20T00:00:00Z"}
    )

    //When form input changes... update state
    const handleChange = e => {  
        setFormData(prevFormData => {
            return {...prevFormData, [e.target.name]: e.target.value}
        })
    }
    /*Ticketmaster API doesn't allow start date == end date
    Function to add one day to the end date if the user sets them as equal*/
    function addDays(endDate, days) { 
        var date = new Date(endDate); 
        date.setDate(date.getDate() + days);
        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0];
        console.log('ran');
        setFormData(prevFormData => {
            return {...prevFormData, [endDate]: dateString}
        })
      }

    return ( 
        <Wrap>
            <CityForm onSubmit={(e) => {
                e.preventDefault();
                if (formData.startDate === formData.endDate){
                    addDays(formData.startDate, 2);
                }
                setTimeout(function(){ //allows time for state to be update from function addDays
                    props.updateSearchValues(formData.city, formData.startDate, formData.endDate);
                }, 2000); 
            }}>    
                <label>City:</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    // value={city}
                    name="city"

                />
                <label>Start Date:</label>
                <input
                    type="date"
                    required
                    onChange={handleChange}
                    // value={startDate}
                    name="startDate"
                ></input>
                <label>End date:</label>
                <input
                    type="date"
                    onChange={handleChange}
                    // value={endDate}
                    name="endDate"
                >
                </input>
                <SearchButton type="submit" value="Search" className='btnSearch'>
                    Submit
                </SearchButton>
                {/* { isPending && <button disabled>Loading...</button>} */}
            </CityForm>
        </Wrap>
     );
}
 


const CityForm = styled.form`
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,69,1) 64%, rgba(4,85,113,1) 100%); 
    margin-top: 90px;
    color: white;
    width: 90%;
    height: 50px;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    border: solid rgb(0,0,0);

    input {
        display: flex;
        height: 50%;
        margin: 0px 10px;
        align-content: center;

    }

`;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    z-index:1;
`;


const SearchButton = styled.button`
    width: 20%;
    height: 25px;
`;

export default SearchBar;


