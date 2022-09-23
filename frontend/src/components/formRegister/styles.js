import styled from "styled-components"

export const Container = styled.div`
width: 90%;
max-width: 500px;
padding: 30px;
gap: 25px;
display: flex;
flex-direction: column;
background-color: white;
box-shadow: 1px 2px 10px #0000009e;
border-radius: 10px;

.btn-box {
    width: 90%;
    display: flex;
    justify-content: space-evenly;
}

h2 {
    align-self: center;
    color: #0000009e;
}
`

export const InputContainer = styled.form`
display: flex;
flex-direction: column;
gap: 25px;

.form-icon {
    margin-right: 10px;
}

.eye-icon {
    cursor: pointer;
}
`