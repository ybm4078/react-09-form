import { type ChangeEvent, type SubmitEvent, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Wrap = styled.div`
    min-height: 100dvh;
    // width는 div가 블록요소이기 때문에 기본적으로 부모 전체(100%)가 이미
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6fa;
    padding: 15px;
`;

const Card = styled.form`
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border-radius: 16px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
`;

const Input = styled.input`
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.5s;

    &:focus {
        outline: none;
        border: 1px solid #6c5ce7;
    }
`;

const Button = styled.button`
    margin-top: 24px;
    padding: 14px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
`;

const ErrorMessage = styled.p`
    font-size: 12px;
    color: #d63031;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setUsername(e.target.value);
        if (username.length > 0) {
            setUsernameError(null);
        }
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setPassword(e.target.value);
        if (password.length > 0) {
            setPasswordError(null);
        }
    };

    const handleChangeName = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setName(e.target.value);
        if (name.length > 0) {
            setNameError(null);
        }
    };

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setEmail(e.target.value);
        if (email.length > 0) {
            setEmailError(null);
        }
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimUsername = username.trim();
        const trimPassword = password.trim();
        const trimName = name.trim();
        const trimEmail = email.trim();

        // 문자열에 대해 이메일 주소가 맞는지를 판별하는 코드
        // 1. split()   : 내가 원하는 문자열을 기준으로 나누어 배열을 만드는 메서드
        // const emailParts = trimEmail.split("@");

        if (!trimUsername) {
            setUsernameError("아이디는 필수 값입니다.");
        }
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{6,}$/;
        if (!passwordRegex.test(trimPassword)) {
            setPasswordError("비밀번호는 영어 대소문자,숫자,특수문자를 1글자 이상 포함해야 합니다.")
        }
        if (trimPassword.length < 6) {
            setPasswordError("비밀번호는 최소 6자리 이상이여야 합니다.");
        }
        if (!trimPassword) {
            setPasswordError("비밀번호는 필수 값입니다.");
        }
        if (!trimName) {
            setNameError("이름은 필수 값입니다.");
        }
        // 이메일 주소 체크
        // string 타입에 includes("글자") 메서드 : "글자"가 string에 포함되어 있는지 여부 체크하여 boolean 반환
        // 이메일 계정 앞자리엔 특수문자 "." 사용 가능 -> includes만으로는 체크가 부족함
        // string에 사용할 수 있는 indexOf("글자") -> 해당 글자가 존재하는 자리수를 반환 (없으면 -1)
        // string에 사용할 수 있는 lastIndexOf("글자") -> 해당 글자가 여러개일 때 마지막 존재의 자리수 반환
        // const atIndex = trimEmail.indexOf("@");
        // const lastDotIndex = trimEmail.lastIndexOf(".");
        // if (!trimEmail.includes("@") || !trimEmail.includes(".") || (atIndex > lastDotIndex)) {
        //     setEmailError("이메일 형식이 잘못되었습니다.");
        // }

        // 이메일 형식처럼, 어떠한 규칙성이 있는 형식에 대해 판별을 해줘야 할 때 "정규식"을 사용할 수 있음
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimEmail)) {
            setEmailError("이메일 형식이 잘못되었습니다.");
        }
        if (!trimEmail) {
            setEmailError("이메일은 필수 값입니다.");
        }

        if (usernameError || passwordError || nameError || emailError) {
            return;
        }

        navigate(
            `/result?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`,
        );
    };

    return (
        <Wrap>
            <Card onSubmit={handleSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        onChange={handleChangeUsername}
                        value={username}
                    />
                    {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        onChange={handleChangePassword}
                        value={password}
                    />
                    {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input placeholder={"이름"} onChange={handleChangeName} value={name} />
                    {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        onChange={handleChangeEmail}
                        value={email}
                    />
                    {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;