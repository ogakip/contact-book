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
    width: 500px;
    height: 350px;
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

export const BodyModal = styled.form`
height: calc(300px - 1px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;

.form-icon {
    margin-right: 10px;
}

>div {
    width: 90%;
}

.btn-box {
    display: flex;
    justify-content: space-evenly;
}
`