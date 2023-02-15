import React, {useReducer, useEffect} from 'react';
import axios from 'axios';

//요청에 대한 상태를 관리할 땐 총 3가지 상태를 관리해주어야 함
//1. 요청의 결과 , 2. 로딩 상태, 3. 에러

function reducer(state, action) {
    switch (action.type){
        case 'LOADING':
            return{
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return{
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return{
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error('Unhandled action type: ${action.type}');
    }
}

function Users(){
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchUsers = async() => { //useEffect에 첫번째 파라미터로 등록하는 함수에는 async를 사용할 수 없어서 함수 내부에서 async사용하는 함수를 새로 선언
        dispatch({ type: 'LOADING' }); //에러와 유저값 초기화, 로딩상태를 true로 바꾸는 걸 reducer로 묶은 것
        try{
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data: response.data }); //데이터는 response.data안에 들어있음
        }   catch(e){
            dispatch({ type: 'ERROR', error: e });
        }
    }; //버튼으로 만들려고 밖으로 꺼냈음. 버튼 만들고 연결해주면 됨

    useEffect(() => {
        fetchUsers();
    }, []);

    const {loading, data: users, error} = state; //state.data 를 users 키워드로 조회
    
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>
    if(!users) return null; //users값이 아직 없을 땐 null을 보여주도록 처리 , !users는 users값이 undefined이거나 null일 때를 뜻함
    return(
        <>
            <ul> 
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
        //ul > unordered list
    );
}

export default Users;