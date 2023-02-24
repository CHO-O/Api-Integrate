import React, {useState, useReducer, useEffect} from 'react';
import axios from 'axios';
import useAsync from './useAsync';
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
    const [state, refetch] = useAsync(getUsers, [], true);

    const {loading, data: users, error} = state; //state.data 를 users 키워드로 조회
    
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>
    if(!users) return <button onClick={refetch}>불러오기</button>; //users값이 아직 없을 땐 null을 보여주도록 처리 , !users는 users값이 undefined이거나 null일 때를 뜻함
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
            <button onClick={refetch}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
        //ul > unordered list
    );
}

export default Users;