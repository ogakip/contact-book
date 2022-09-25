import styled from "styled-components"

export const Container = styled.div`
width: 100vw;
height: 65px;
box-shadow: 0px 2px 10px #999999;
padding: 10px;
display: flex;
justify-content: space-between;

>div {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        cursor: pointer;
    }
}

h1 {
    font-weight: 700;
    display: flex;
    align-items: center;
    height: 100%;

    span {
        color: blue;
    }
}
`