import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  right: 10px;
  top: 80px;
  width: 150px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #999999;
  border-top: 2px solid #999999;
  z-index: 99999;
  animation: appearFromTop 0.3s;
  box-shadow: 0px 2px 5px #999999;

  .triangle {
    position: absolute;
    top: -14px;
    right: 0;
  }

  @keyframes appearFromTop {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

export const ModalBox = styled.div`
  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    :hover {
      background-color: #8080804d;
      font-size: 16px;
      font-weight: 700;
    }
  }

  .logout {
    height: calc(100% -1px);

    :hover {
      background-color: #ffc1c1;
    }
  }
`;
