import { useCallback, useState } from "react";


function AI() {
    const [target, setTarget] = useState("default");
    const [resultVisible, setResultVisible] = useState(undefined);
    const [result, setResult] = useState(undefined);

    const __eva = useCallback(()=>{
        if(target){
            console.log(target);
            let url = '/api/aiAPItest';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({target, 'dumy': 'aaa'})
            })
            .then((res) => res.json()
            )
            .then((data)=> {
                const {result} = data;
                console.log(data);
                setResult(result); // Set the parsed JSON data to the result state
                setResultVisible(true);
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert(target);
        }
    }, [target]);
    
  return (
    <div className="AI">
      <h1>AI페이지 입니다.</h1>
      <form
        className=""
        onSubmit={(e) =>{
            e.preventDefault();
            __eva();
        }}>
            <input
                id="target"
                type="text"
                onChange={(e) => {
                    setTarget(e.target.value)
                    console.log(target)
                }}
            />
            <button type="submit">
                제출
            </button>
        </form>
        {resultVisible ?
            <div>{result}</div>
        :
            <div>안보인는 거임</div> 
        }
    </div>
  );
}

export default AI;
