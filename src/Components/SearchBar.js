import { useState, createContext } from "react";
import Concerts from "./Concerts";
import styled from 'styled-components';

const SearchBar = (props) => {

    const [formData, setFormData] = useState(
        {city: "Seattle", startDate: "2021-12-18T00:00:00Z", endDate: "2021-12-20T00:00:00Z"}
    )

    // console.log(formData);

    const handleChange = e => {
        setFormData(prevFormData => {
            return {...prevFormData, [e.target.name]: e.target.value}
        })
    }
    
    return ( 
        <Wrap>
            <CityForm onSubmit={(e) => {
                e.preventDefault();
                props.updateSearchValues(formData.city, formData.startDate, formData.endDate);
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
    margin-top: 5px;
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

`;


const SearchButton = styled.button`
    width: 20%;
    height: 25px;
`;

export default SearchBar;
// import { useState } from "react";
// import Concerts from "./Concerts";

// const SearchBar = () => {
//     const [city,setCity] = useState('Seattle');
//     const [startDate, setStartDate] = useState('2021-11-18T00:00:00Z');
//     const [endDate, setEndDate] = useState('2021-11-21T00:00:00Z');
//     const [isPending, setIsPending] = useState(false);
//     const [submitted, setSubmitted] = useState(false);

    
//     const onSearch = (e) => {
//       e.preventDefault();
//       setSubmitted(true);
//       setIsPending(true);
//     };
    
//     return ( 
//         <div className="search">
//             {/* {
//               submitted ? <Concerts city={city} startDate={startDate} endDate={endDate} /> :
//               <Concerts city={'Seattle'} startDate={'2021-11-18T00:00:00Z'} endDate={'2021-11-21T00:00:00Z'} /> 
//             } */}
            
//             <form onSubmit={onSearch}>
//                 <label>City:</label>
//                 <input
//                     type="text"
//                     required
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                 />
//                 <label>Start Date:</label>
//                 <input
//                     type="date"
//                     required
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                 ></input>
//                 <label>End date:</label>
//                 <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                 >
//                 </input>
//                 { !isPending && <button>Search</button>}
//                 { isPending && <button disabled>Loading...</button>}
//             </form>
//         </div>
//      );
// }
 
// export default SearchBar;