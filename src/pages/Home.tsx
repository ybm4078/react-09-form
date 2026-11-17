import styled from "styled-components";
import {useNavigate} from "react-router";
import {Card, Title, Wrap} from "../components/components.tsx";
import {useForm} from "react-hook-form";

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

// react-hook-form을 사용하려면,
// 이 컴포넌트에서 react-hook-form이 연결해야 하는 input의 갯수와 이름을 알려줘야 함
// 그렇게 타입을 하나 만들고 그걸 useForm<FormValues>() 제네릭을 통해 넣어줌
type FormValues = {
    username: string;
    password: string;
    name: string;
    email: string;
}

function Home() {
    const navigate = useNavigate();

    // 순수 리액트를 통해 input이나 select 등 사용자의 입력을 받아서 (어디든) 제출하려면
    // 1. 화면에 사용자가 입력해야 할 폼을 작성
    // 2. 각 input에 대한 state를 생성
    // 3. input과 state를 연결 (onChange 핸들러를 작성해서)
    // 4. input에 입력 규칙이 존재한다면 제출 시 규칙 체크    (onSubmit 핸들러를 통해)
    // 5. 에러 메세지가 추가로 존재해아 한다면 그에 대한 state 또한 필요

    // 모든 state와 input들에 대해 내가 수동으로 작업을 함으로서 복잡해지는 코드를
    // react-hook-form은 간략하고 규칙적으로 작성할 수 있도록 해줌

    // react-hook-form을 사용하기 위해서는 useForm() 메서드를 import하여
    // 실행하여 반환되는 도구들을 객체 구조 분해를 통해 준비함

    const {
        register,   // 화면에 존재하는 input과 react-hook-form을 연결하는 기능
        handleSubmit,   // react-hook-form에서 기재한 유효성 검사를 포함하여 submit 처리할 때 사용하는 기능
        formState: {errors}, // formState라는 도구는 또다시 상자임. form에서 사용하는 상태값들이 여기서 객채로 들어옴
                             // formState 안에 errors는 유효성 검사 시 오류 값이 저장되는 state 묶음
    } = useForm<FormValues>();   // react-hook-form 패키지를 내 프로젝트에 걸맞게 맞춰 펼쳐놓는 행위
    // 여러개의 도구가 포함된 상자(객체)를 돌려줌
    // 그 도구들을 지칭해서 사용하기 위해 객체 구조 분해함

    // react-hook-form이 제공한 handleSubmit 함수는 handleSubmit(우리가쓰는 함수) 로 inSubmit에 넣어줘야 되고
    // onSubmit이 발동되면, 유효성 검사를 진행하고 문제가 없으면 매개변수로 넣어준 핸들러 함수를 실행함

    const submitHandler = (data: FormValues) => {
        // 쿼리스트링으로 2개 이상의 값이 전달 되어야 되는 거라면
        // 각각 encodeURIComponent를 매 번 써줄게 아니라
        // new URLSearchParams(객체).toString() 을 통해 한 번에 만들어주는게 이치에 맞음
        const queryString = new URLSearchParams(data).toString();
        navigate(`/result?${queryString}`);
    }

    return (
        <Wrap>
            <Card onSubmit={handleSubmit(submitHandler)}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        {...register("username", {required: "아이디는 필수 값입니다"})}
                    />
                    {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        {...register("password",{
                            required:"비밀번호는 필수 값입니다",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6자 이상이여야 합니다."
                            },
                            maxLength: {
                                value: 50,
                                message: "비밀번호는 최대 50자 이하여야 합니다."
                            }})}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input placeholder={"이름"} {...register("name",{required: "이름은 필수 값입니다"})} />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        {...register("email",{
                            required: "이메일은 필수 값입니다",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "올바른 이메일 형식이 아닙니다."
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;