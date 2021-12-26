import styled from 'styled-components';
import { useEffect, useState } from 'react';


const Welcome = (props) => {

    const [imgObj, setImgObj] = useState(
        {farm: 66,
        id: "51739580084",
        isfamily: 0,
        isfriend: 0,
        ispublic: 1,
        owner: "9702100@N08",
        secret: "599221e2c6",
        server: "65535",
        title: "Let the Kraken Play Hockey"}
        );
    //Uses Flickr API to get image of the searched city    
    async function images() {

        try {
            let city = props.city.toLowerCase();
            const res = await fetch(`https://www.flickr.com/services/rest/?
            method=flickr.photos.search&api_key=29e6e5e10429f9cf84ebccc0fe41c963&
            tags=${city + 'skyline'}&min_upload_date=1%2F1%2F2021&format=json&nojsoncallback=1extras=url_o`);
            
            const data = await res.json();
            setImgObj(data.photos.photo[1]);
        } catch(err) {
            console.log('Please enter a valid city');
            console.log(err.message);
            setImgObj({farm: 66,
                id: "51739580084",
                isfamily: 0,
                isfriend: 0,
                ispublic: 1,
                owner: "9702100@N08",
                secret: "599221e2c6",
                server: "65535",
                title: "Let the Kraken Play Hockey"}
                );
        }
    }



    useEffect(() => {
        images()
    }, [props.city])


    if (!imgObj) {
        return (
            <Container>
            <CityBox>
                <CityImg>
                    <img src={`https://live.staticflickr.com/` + 
                    `65535/51759193502_e51945a1e2_b.jpg`} alt='city skyline' />
                </CityImg>
            </CityBox>
            </Container>
        )
    }
    return (  
        <Container>
            <CityBox>
                <CityImg>
                    <img src={`https://live.staticflickr.com/` + 
                    `${imgObj.server}/${imgObj.id}_${imgObj.secret}_b.jpg`} alt='city skyline' />
                </CityImg>
            </CityBox>
        </Container>
        
    );
}

const Container = styled.div`
    img {
        /* border: 2px solid white;
        border-radius: 50%; */
    }
`;
 
const CityBox = styled.div`
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
`;
const CityImg = styled.div`
    
    img {
        border: 2px solid white;
        border-radius: 50%; 
        max-width: 100%;
        max-height: 100%;
    }
`;

export default Welcome;