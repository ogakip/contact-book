import * as Styled from "./styles"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrContactInfo } from "react-icons/gr"

export const Header = () => {
    return (
        <Styled.Container>
            <h1><span>C</span>ontactBook<GrContactInfo/></h1>
            <div>
                <GiHamburgerMenu size="30px"/>
            </div>
        </Styled.Container>
    )
}