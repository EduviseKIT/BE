import { useCallback, useState } from "react";


function AI() {
    const [grade, setGrade] = useState("")
    const [subject, setSubject] = useState("");
    const [resultVisible, setResultVisible] = useState(false);
    const [result, setResult] = useState(undefined);

    const __eva = useCallback(()=>{
        if(grade && subject){
            let url = '/api/aiAPItest';
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({grade, subject})
            })
            .then((res) => res.json()
            )
            .then((data)=> {
                console.log(data.result);
                const {result_row} = data;
                console.log(result_row);
                setResult(result_row); // Set the parsed JSON data to the result state
                console.log(result);
                if(!result_row){
                    setResult("값이 없습니다.")
                }
                setResultVisible(true);
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert("안 보내짐");
        }
    }, [grade, subject]);
    
  return (
    <div className="AI">
      <h1>AI 서버입니다.</h1>
      <form
        className=""
        onSubmit={(e) =>{
            e.preventDefault();
            __eva();
        }}>
            <input
                id="grade"
                type="text"
                onChange={(e) => {
                    setGrade(e.target.value.split(","))
                    console.log(grade)
                }}
            />
            <input
                id="sudject"
                type="text"
                onChange={(e) => {
                    setSubject(e.target.value.split(","))
                    console.log(subject)
                }}
            />
            <button type="submit">
                제출
            </button>
        </form>
        {resultVisible ?
            <div>{result}</div>
        :
            <div>안보임ㅋ</div> 
        }
    </div>
  );
}

export default AI;
