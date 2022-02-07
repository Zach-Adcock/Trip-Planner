import styled from 'styled-components';


const Header = (props) => {
    return ( 
        <Nav>
            <Logo>
                <img src={"/images/airplane.png"} alt="airplane" />
                <div>Trip Planner</div>
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
    width: 100%;
    position: fixed;
    z-index: 3;
    left: 0;

`;

const Logo = styled.a`
    display: flex;
    height: 100%;
    width: 200;
    position: absolute;
    z-index: 0;
    flex-direction: row;
    align-items: center;


    img {
        height: 100%;
        width: auto;
        z-index: 2;
    }

    div {
        margin-left: 5px;
    }
`;


const CityDisplay = styled.div`
    width: 10%;
    height: 50%;
    color: black;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    div {
        display: flex;
        justify-content: center;
        align-content: center;
    }
    
`;
export default Header;