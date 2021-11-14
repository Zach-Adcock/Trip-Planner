import { useState } from "react";
import Concerts from "./Concerts";

const SearchBar = () => {
    const [city,setCity] = useState('Seattle');
    const [startDate, setStartDate] = useState('2021-11-18T00:00:00Z');
    const [endDate, setEndDate] = useState('2021-11-21T00:00:00Z');
    const [isPending, setIsPending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const [refresh, setRefresh] = useState(1);

    const enableBtn = () => {
      setSubmitted(false);
      setIsPending(false);
    }
    
    const onSearch = (e) => {
        e.preventDefault();

        if (city==='' ||startDate==='' || endDate===''){
            alert ('Please fill in all fields')
        } else {
            setCity('');
            setStartDate('');
            setEndDate('');
        } 
        
    
    //   setRefresh(refresh+1);
    //   setSubmitted(true);
    //   setIsPending(true);
    }
    
    return ( 
        <div className="search">
            {/* <Concerts city={city} startDate={startDate} endDate={endDate}  enableBtn={enableBtn} refresh={refresh}/>  */}
            <form onSubmit={onSearch}>
                <label>City:</label>
                <input
                    type="text"
                    required
                    onChange={(e) => setCity(e.target.value)}
                    value={city}

                />
                <label>Start Date:</label>
                <input
                    type="date"
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                ></input>
                <label>End date:</label>
                <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                >
                </input>
                <input type="submit" value="Search"
                className='btnSearch'/>
                {/* { isPending && <button disabled>Loading...</button>} */}
            </form>
        </div>
     );
}
 
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