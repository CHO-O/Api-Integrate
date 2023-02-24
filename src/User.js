import React from 'react';
import axios from 'axios';
import {useAsync} from 'react-async';

async function getUser({id}) { //프로미스를 반환하는 함수의 파라미터를 객체 형태로 주어야 함
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

function User({ id }){
    const { data:user, error, isLoading } = useAsync({
        promiseFn: getUser,
        id,
        watch: id
    });

    if(isLoading) return <div>로딩중..</div>;
    if(error) return <div>에러 발생</div>;
    if(!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email:</b> {user.email}
            </p>
        </div>
    );
}

export default User;

//react-async는 useAsync와 비슷한 함수가 들어있는 라이브러리 -> 직접 요청 상태 관리를 위한 커스텀 Hook을 만들기 귀찮을 때 사용
//이 라이브러리 안의 함수 이름도 useAsync긴 한데 사용법이 다름
//만들었던 커스텀 Hook은 결과물을 '배열'로 반환 / react-async의 Hook은 '객체 형태'로 반환