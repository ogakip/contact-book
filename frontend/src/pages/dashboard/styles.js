import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DataContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 60vw;
    border-radius: 5px;
    padding: 10px 5px;
    border: 1px solid #999999;
    box-shadow: 1px 2px 5px #0000009e;
  }
`;
