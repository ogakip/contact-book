import styled from "styled-components"

export const Container = styled.div`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background-color: rgb(0, 0, 0, 0.1);
z-index: 99999;
display: flex;
justify-content: center;
align-items: center;

> img {
    width: 200px;
    height: 200px;
}
`