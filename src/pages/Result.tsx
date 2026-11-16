import { useSearchParams } from "react-router";
import { Card, Title, Wrap } from "../components/components.tsx";
import styled from "styled-components";

const Section = styled.section``;

const SectionTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
    border-left: 4px solid #4f46e5;
    padding-left: 10px;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed #ececec;
`;

const Label = styled.span`
    font-weight: 600;
    color: #555;
`;

const Value = styled.span`
    color: #222;
`;

function Result() {
    const [searchParams] = useSearchParams();

    const username = searchParams.get("username");
    const password = searchParams.get("password");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    return (
        <Wrap>
            <Card as={"div"}>
                <Title>회원가입 결과</Title>

                <Section>
                    <SectionTitle>쿼리스트링 결과</SectionTitle>
                    <Item>
                        <Label>사용자 이름 :</Label>
                        <Value>{username}</Value>
                    </Item>
                    <Item>
                        <Label>비밀번호 :</Label>
                        <Value>{password}</Value>
                    </Item>
                    <Item>
                        <Label>이름 :</Label>
                        <Value>{name}</Value>
                    </Item>
                    <Item>
                        <Label>이메일 :</Label>
                        <Value>{email}</Value>
                    </Item>
                </Section>

            </Card>
        </Wrap>
    );
}

export default Result;