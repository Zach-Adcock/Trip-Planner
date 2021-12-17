import styled from 'styled-components';
import { useEffect } from 'react';
const RestaurantFetch = (props) => {
    

/* Info being used in FourSquare Fetch
fields = fsq_id,name,categories, website, verified, rating, menu, photos 
categories = 13029,13032,13065
let fourSquareAPIKey = 'fsq3K5g+r46WfVBJdh11USLnzpbXkEzfVhb5GpnNJUdEAkQ='*/

    async function images() {

        

        try {
            const options = {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: 'fsq3K5g+r46WfVBJdh11USLnzpbXkEzfVhb5GpnNJUdEAkQ='
                }
              };
            //Fetching data from Foursquare.   
            let response = await fetch(`https://api.foursquare.com/v3/places/search?categories=13029%2C13032%2C13065&
            exclude_chains=true&
            fields=fsq_id%2Cname%2Ccategories%2Cwebsite%2Cverified%2Crating%2Cmenu%2Cphotos
            &near=${props.city}&sort=RATING&limit=20`, options)
            let data = await response.json();
            let dataArr = data.results;
            
            let breweriesArr = dataArr.filter((place) => {
                let found = place.categories.filter((categories => categories.name.toLowerCase() === 'brewery'));
                if (found.length > 0) return true
            })
            console.log(breweriesArr)
            
        } catch(err) {
            console.log(err.message);
        }
              
    }
    
    useEffect(() => {
        images()
    },[props])
    
    return ( 
        <div className = 'kayakSearchWidgetContainer'>
            
        </div>
     );
}
 
export default RestaurantFetch;