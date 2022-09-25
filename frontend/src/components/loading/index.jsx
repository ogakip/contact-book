import * as Styled from "./styles";
import loading from "../../assets/img/loading_circle.gif"

export const Loading = () => {
  return (
    <Styled.Container>
      <img src={loading} alt="Loading icon"/>
    </Styled.Container>
  );
};
