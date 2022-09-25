import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #00000061;
  z-index: 999999;
  position: absolute;
  top: 0;
  left: 0;
`;

export const DataContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 65px);
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    width: 90vw;
    border-radius: 5px;
    padding: 0px 5px;
    border: 1px solid #999999;
    box-shadow: 1px 2px 5px #0000009e;
    background-color: white;

    .table-header {
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px;
      font-size: 18px;
      font-weight: 700;

      .filter-box {
        display: flex;
        gap: 10px;
        align-items: center;
      }
    }

    .close-box {
        display: flex;
        gap: 10px;
        align-items: center;
    }
  }
`;
