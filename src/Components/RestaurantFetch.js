import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {mediaQueries} from './DeviceSizes';
const RestaurantFetch = (props) => {
    
    const [brewsArr,setBrewsArr] = useState([]);
    const [restaurantArr,setRestaurantArr] = useState([]);
    const [cafesArr,setCafesArr] = useState([]);



    async function restaurants() {
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
            let response = await fetch(`https://api.foursquare.com/v3/places/search?categories=13029%2C13032%2C13065&exclude_chains=true&fields=fsq_id%2Cname%2Ccategories%2Cwebsite%2Cverified%2Crating%2Cmenu%2Cphotos&near=${props.city}&sort=RATING&limit=50`, options)
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
            console.log('restaurantARR', restaurantArr)

            
        } catch(err) {
            console.log(err.message);
        }
            
    }
    setTimeout(() =>{
        // console.log(brewsArr)
    }, 2000)

    useEffect(() => {
        restaurants()
    },[props.city]);
    
    const brewsRender = (
        <ul>
            {brewsArr.map((brewery) => {
                return (
                    <RestaurantBox key={brewery.fsq_id}>
                        <ImageBlock>
                            <div>
                                <img src={`${brewery.photos[0].prefix}original${brewery.photos[0].suffix}`} alt={brewery.name} />
                            </div>
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
                    <RestaurantBox key={cafe.fsq_id}>
                        <ImageBlock>
                            <div>
                                <img src={`${cafe.photos[0].prefix}original${cafe.photos[0].suffix}`} alt={cafe.name} />
                            </div>
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
                    <RestaurantBox key={restaurant.fsq_id}>
                        <ImageBlock>
                            <div>
                                <img src={`${restaurant.photos[0].prefix}original${restaurant.photos[0].suffix}`} alt={restaurant.name} />
                            </div>
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
     );
}
 

const FoodandDrink = styled.main`
    width: 60vw;
    max-width: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding: 0px;
    color: white;
    /* height: 300px; */
    z-index: 1;
    ul{
        padding: 0px;
        width: 90vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        ${mediaQueries.phone} {
        max-width: 100vw;
    }
    }
    ${mediaQueries.phone} {
        width: 90vw;
        max-width: 100vw;
    }
`;

const Container = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

    ${mediaQueries.phone} {
        flex-direction: column;
    }
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

    ${mediaQueries.phone} {
        width: 70vw;
    }
`;

const RestaurantCard = styled.div`
    text-decoration: none;
    color: rgb(7 77 107);
    font-weight: bold;
    &:hover{
        text-shadow: 1px 1px rgba(0,0,0, 0.5);
        text-decoration: underline;
        transition: opacity 0.2s ease 0s;

    }
    a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2vw;//minmax(1.5vw, 50px);
        color: rgb(7 77 107);
        ${mediaQueries.phone} {
            font-size: 4vw;
        }

    }

`;

const RestaurantBox = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 10px 0px;
    color: black;
    height: 200px;
    width: 25vw;

    border: 5px solid white;
    border-radius: 5px;
    background-color: grey;
    opacity: .85;
    &:hover{
        opacity: 1;
        border: 2px solid white;
        transition: opacity 0.2s ease 0s;

    }
    ${mediaQueries.phone} {
        opacity: 1;
        width: 75vw;
    }
`;

const ImageBlock = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 40%;
    height: 50%;

    ${mediaQueries.phone} {
        max-width: 40vw;
        max-height: 100%;
    }
    div{
        max-height: 100%;
        max-width: 100%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        img {
            /* display: flex; */
            margin-left: auto;
            margin-right: auto;
            width: 70%;
            height: auto;
            max-height: 100% !important;
            max-width: 100% !important;
            overflow:hidden;
            ${mediaQueries.phone} {
                max-width: 100px;
                max-height: 100px;
                width: 100%;
                height: 100%;
            }

        }
    }
    
    
`;


export default RestaurantFetch;