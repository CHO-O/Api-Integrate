import React, {useState, useEffect} from 'react';
import axios from 'axios';

//요청에 대한 상태를 관리할 땐 총 3가지 상태를 관리해주어야 함
//1. 요청의 결과 , 2. 로딩 상태, 3. 에러

function Users(){
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async() => { //useEffect에 첫번째 파라미터로 등록하는 함수에는 async를 사용할 수 없어서 함수 내부에서 async사용하는 함수를 새로 선언
        try{
            //요청이 시작되면 error와 users 초기화
            setError(null);
            setUsers(null);
            // loading 상태를 true로 바꿔줌
            setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data); //데이터는 response.data안에 들어있음
        }   catch(e){
            setError(e);
        }
        setLoading(false);
    }; //버튼으로 만들려고 밖으로 꺼냈음. 버튼 만들고 연결해주면 됨

    useEffect(() => {
        fetchUsers();
    }, []);

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