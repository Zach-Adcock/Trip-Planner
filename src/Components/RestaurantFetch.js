import styled from 'styled-components';
import { useEffect, useState } from 'react';
const RestaurantFetch = (props) => {
    
    const [brewsArr,setBrewsArr] = useState([]);
    const [restaurantArr,setRestaurantArr] = useState([]);
    const [cafesArr,setCafesArr] = useState([]);




    async function images() {
        /* Info being used in FourSquare Fetch
        fields = fsq_id,name,categories, website, verified, rating, menu, photos 
        categories = 13029,13032,13065
        let fourSquareAPIKey = 'fsq3K5g+r46WfVBJdh11USLnzpbXkEzfVhb5GpnNJUdEAkQ='*/
               

        try {
            const options = {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  Authorization: 'fsq3K5g+r46WfVBJdh11USLnzpbXkEzfVhb5GpnNJUdEAkQ='
                }
              };
            //Fetching data from Foursquare.   
            let response = await fetch(`https://api.foursquare.com/v3/places/search?categories=13029%2C13032%2C13065&exclude_chains=true&fields=fsq_id%2Cname%2Ccategories%2Cwebsite%2Cverified%2Crating%2Cmenu%2Cphotos&near=${props.city}&sort=RATING&limit=20`, options)
            let data = await response.json();
            let dataArr = data.results;
            
            let breweriesArr = dataArr.filter((place) => { //separate breweries from data
                let found = place.categories.filter((categories => categories.name.toLowerCase() === 'brewery'));
                if (found.length > 0) return true
            })
            let cafesArr = dataArr.filter((place) => { //separate cafes from data
                let conditions = ['cafe', 'coffee', 'bakery']; //DO include these terms
                let conditionsMet = 0;
                place.categories.forEach((categories) => {
                    let categoryName = categories.name.toLowerCase();
                    if (conditions.some(x => categoryName.includes(x))) conditionsMet ++
                });
                if (conditionsMet > 0) return true
            })
            console.log(cafesArr);
            let restaurantArr = dataArr.filter((place) => { //separate restaurants from data
                let conditions = ['brewery', 'cafe', 'coffee', 'bakery']; //DON'T include these terms
                let conditionsMet = 0;
                let restaurantCount = 0;
                place.categories.forEach((categories) => {
                    let categoryName = categories.name.toLowerCase();
                    if (conditions.some(x => categoryName.includes(x))) conditionsMet ++
                    if (categories.name.toLowerCase().includes('restaurant')) restaurantCount ++;
                });
                if (restaurantCount>0 && conditionsMet < 1) return true
            });
            
            setBrewsArr([...breweriesArr]);
            setRestaurantArr([...restaurantArr.slice(0,7)]);
            setCafesArr([...cafesArr.slice(0,7)]);

            // console.log(dataArr)
            
        } catch(err) {
            console.log(err.message);
        }
            
    }
    setTimeout(() =>{
        // console.log(brewsArr)
    }, 2000)

    useEffect(() => {
        images()
    },[props]);
    
    const brewsRender = (
        <ul>
            {brewsArr.map((brewery) => {
                return (
                    <RestaurantBox key={brewery.id}>
                        <ImageBlock>
                            <a href={brewery.website} target="_blank" rel="noreferrer noopener">
                                <img src={`${brewery.photos[0].prefix}original${brewery.photos[0].suffix}`} alt={brewery.name} />
                            </a>
                        </ImageBlock>
                        <RestaurantCard>
                            <a href={brewery.website}>
                                <div>{brewery.name}</div>
                            </a>
                            <br/>
                            <div>{`${brewery.rating}/10`}</div>
                        </RestaurantCard>
                    </RestaurantBox>
                )
            })
            }   
        </ul>
    );

    const cafesRender = (
        <ul>
            {cafesArr.map((cafe) => {
                return (
                    <RestaurantBox key={cafe.id}>
                        <ImageBlock>
                            <a href={cafe.website} target="_blank" rel="noreferrer noopener">
                                <img src={`${cafe.photos[0].prefix}original${cafe.photos[0].suffix}`} alt={cafe.name} />
                            </a>
                        </ImageBlock>
                        <RestaurantCard>
                            <a href={cafe.website}>
                                <div>{cafe.name}</div>
                            </a>
                            <br/>
                            <div>{`${cafe.rating}/10`}</div>
                        </RestaurantCard>
                    </RestaurantBox>
                )
            })
            }   
        </ul>
    );

    const restaurantsRender = (
        <ul>
            {restaurantArr.map((restaurant) => {
                return (
                    <RestaurantBox key={restaurant.id}>
                        <ImageBlock>
                            <a href={restaurant.website} target="_blank" rel="noreferrer noopener">
                                <img src={`${restaurant.photos[0].prefix}original${restaurant.photos[0].suffix}`} alt={restaurant.name} />
                            </a>
                        </ImageBlock>
                        <RestaurantCard>
                            <a href={restaurant.website}>
                                <div>{restaurant.name}</div>
                            </a>
                            <br/>
                            <div>{`${restaurant.rating}/10`}</div>
                        </RestaurantCard>
                    </RestaurantBox>
                )
            })
            }   
        </ul>
    );


    return ( 
        <Container>
            <FoodandDrink id='breweriesRender'>
                <Title>Breweries</Title>
                {brewsRender}
            </FoodandDrink>
            <FoodandDrink id='cafesRender'>
                <Title>Cafes</Title>
                {cafesRender}
            </FoodandDrink>
            <FoodandDrink id='restaurantsRender'>
                <Title>Restaurants</Title>
                {restaurantsRender}
            </FoodandDrink>
        </Container>
        // <FoodandDrink>
            
        //     <Breweries>
        //     </Breweries>

        // </FoodandDrink>            
     );
}
 

const FoodandDrink = styled.main`
    max-width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    color: white;
    /* height: 300px; */
    z-index: 1;
    ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
`;

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

`;

const Title = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
    border: 2px solid white;
    border-radius: 9px;
    width: 15vw;
    margin-left: auto;
    margin-right: auto;
    background-color: grey;
`;

const RestaurantCard = styled.div``;
const RestaurantBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 0px;
    color: black;
    height: 200px;
    width: 85%;

    border: 5px solid white;
    border-radius: 5px;
    background-color: grey;
    opacity: .85;
    &:hover{
        opacity: 1;
        border: 2px solid white;
        transition: opacity 0.2s ease 0s;

    }
    
`;

const ImageBlock = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 40%;
    height: 50%;
    
    a{
        width: 80%;
        object-fit: cover;
        img {
        display: block;
        
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 75%;
        }
    }
    
`;


export default RestaurantFetch;