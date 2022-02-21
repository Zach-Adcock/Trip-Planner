import styled from 'styled-components';
import { mediaQueries } from './DeviceSizes';


const Header = (props) => {
    return ( 
        <Nav>
            <Logo>
                <div>
                    <img src={"/images/airplane.png"} alt="airplane" />
                </div>
                <Title>Trip Planner</Title>
            </Logo>
            <CityDisplay>
                <div>{props.city}</div>
            </CityDisplay>
        </Nav>
     );
}
 
const Nav = styled.nav`
    background: rgb(255 255 255);
    /* background: linear-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,69,1) 64%, rgba(4,85,113,1) 100%); */
    display: flex;
    color: rgb(21 74 96);
    font-size: 28px;
    letter-spacing: 2px;
    height: 80px;
    width: 100vw;
    position: fixed;
    z-index: 3;
    left: 0;

    ${mediaQueries.phone}{
        justify-content: space-between;
    }
`;

const Logo = styled.div`
    display: flex;
    height: 100%;
    width: 400px;
    position: absolute;
    z-index: 0;
    flex-direction: row;
    align-items: center;

    ${mediaQueries.phone}{
        font-size: 10px;
        width: 85%;
    }

    

    div {
        margin-left: 5px;
        width: 40px;
        height: 100%;
        display: flex;
        align-items: center;
        img {
        height: 100%;
        width: 100px;
        z-index: 2;
        }
        ${mediaQueries.phone}{
        width: 20%;
        font-size: 20px;
    }
    }
`;
const Title = styled.h2`
    width: 400px;
    height: 100%;
    margin: 0px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 30px;
    display: flex;
    align-items: center;

    ${mediaQueries.phone}{
        flex: .6;
        font-size: 20px;
        margin-left: 30px;
    }
`;

const CityDisplay = styled.div`
    width: 10%;
    height: 100%;
    color: black;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(21 74 96);
    font-weight: bold;

    ${mediaQueries.phone}{
        flex: .4;
        font-size: 20px;
        margin: auto 5px auto 75%;
        width: 40%;
    }
    div {
        display: flex;
        justify-content: center;
        align-content: center;
    }
    
`;
export default Header;