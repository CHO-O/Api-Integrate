import React, {useState} from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';
// useAsync에서는 Promise의 결과를 바로 data에 담기 때문에
// 요청을 한 이후 response에서 data 추출하여 반환하는 함수를 하단에 따로 만들었다
async function getUsers(){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users(){
    const [userId, setUserId] = useState(null);
    const {data:users, error, isLoading, run} = useAsync({
        deferFn: getUsers
    });

    // const {loading, data: users, error} = state; //state.data 를 users 키워드로 조회
    
    if(isLoading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>
    if(!users) return <button onClick={run}>불러오기</button>; //users값이 아직 없을 땐 null을 보여주도록 처리 , !users는 users값이 undefined이거나 null일 때를 뜻함
    return(
        <>
            <ul> 
                {users.map(user => (
                    <li 
                        key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{cursor:'pointer'}}
                    >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={run}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
        //ul > unordered list
    );
}

export default Users;

//refetch 대신 reload
//skip처럼 렌더링하는 시점이 아니라 사용자의 특정 인터랙션에 따라 API를 호출하고 싶을 땐
//promiseFn > deferFn, reload > run