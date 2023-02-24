import React, {useState} from 'react';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
import User from './User';

function Users(){
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const {data:users, error, loading} = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러 발생</div>;
    if(!users) return <button onClick={fetchData}>불러오기</button>; //users값이 아직 없을 땐 null을 보여주도록 처리 , !users는 users값이 undefined이거나 null일 때를 뜻함
    
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
            <button onClick={fetchData}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
        //ul > unordered list
    );
}

export default Users;

//refetch 대신 reload
//skip처럼 렌더링하는 시점이 아니라 사용자의 특정 인터랙션에 따라 API를 호출하고 싶을 땐
//promiseFn > deferFn, reload > run