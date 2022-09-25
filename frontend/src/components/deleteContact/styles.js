import styled from "styled-components"

export const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #00000061;
position: absolute;
top: 0;
left: 0;
z-index: 99999;

>div {
    width: 300px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
}
`

export const HeaderModal = styled.div`
height: 50px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;
`

export const BodyModal = styled.div`
height: calc(150px - 1px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;

>div {
    display: flex;
    gap: 10px;
}
`