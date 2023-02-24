import React, {useReducer, useEffect} from 'react';

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

function useAsync(callback, deps = [], skip = false){ //두개의 파라미터. callback은 API요청을 시작하는 함수, deps는 해당 함수 안에서 사용하는 useEffect의 deps로 설정됨
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = async () => {
        dispatch({type: 'LOADING'});
        try{
            const data = await callback();
            dispatch({type: 'SUCCESS', data});
        }catch(e){
            dispatch({type: 'ERROR', error:e});
        }
    };

    useEffect(() => {
        if(skip) return; // skip의 기본값은 false. 이 값이 true면 useeffect에서 아무 작업도 안하도록 처리. (아무것도 return하지 않음)

        fetchData();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
}

export default useAsync;