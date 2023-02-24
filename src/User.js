import React, {useEffect} from 'react';
import { useUsersState, useUsersDispatch, getUser } from './UsersContext';

function User({ id }){
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    //id값이 바뀔 때 마다 getUser()함수를 호출해주도록 하는 useEffect
    useEffect(()=>{
        getUser(dispatch, id);
    }, [dispatch, id]);
    
    const {data:user, loading, error} = state.user;

    if(loading) return <div>로딩중..</div>;
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