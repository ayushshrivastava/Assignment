import { useEffect, useState } from "react";
import data from "../data/data.json";
import QuizeCard from "../components/QuizeCard";
import { saveScore } from "../utlis/indexedDB"
export default function Quize() {
    const [currentQuestion, setCurrentQuestion] = useState(data[0]);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const[history,setHistory] = useState([]);
    const[showHistory,setShowHistory] = useState(false);
    const [timer, setTimer] = useState(30);

    

   useEffect(() =>{
    let interval;
        
    if (timer > 0 && !quizEnded) {
        interval = setInterval(() => {
            setTimer((prevTime) => prevTime - 1);
        }, 1000);
    } else if (timer === 0) {
        clickHandler();
        setTimer(30); 
    }

   
    return () => clearInterval(interval);
   },[])

    const clickHandler = () => {
        const nextIndex = data.indexOf(currentQuestion) + 1;
        if (nextIndex < data.length) {
            setCurrentQuestion(data[nextIndex]);
            setTimer(30)
        } else {
            setQuizEnded(true);

            //  save score to IndexedDB
            saveScore(score,data.length)
        }
    };

    const handleOptionClick = (selectedOption) => {
       
        //  store the attempted question in history

        setHistory((prevHistory) => [
            ...prevHistory,
            {
              question: currentQuestion.question,
              selectedAnswer: selectedOption,
              correctAnswer: currentQuestion.answer,
              isCorrect: selectedOption === currentQuestion.answer,
            },
          ]);



        let isCorrect = false;

        if (currentQuestion.type === "integer") {
            isCorrect = parseInt(currentQuestion.answer) === parseInt(selectedOption);
        } else {
            isCorrect = selectedOption === currentQuestion.answer;
        }

        if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
        }

        clickHandler();
    };

    useEffect(() => {
        
    }, [score]); // Runs whenever score changes


    if (quizEnded) {
        const incorrect = data.length - score; 
        return (
            <div className="w-2/4 mx-auto mt-10 text-center">
                <h1 className="text-3xl font-bold text-white">Quiz Completed 🎉</h1>
                <p className="text-xl mt-4 text-white">Your Score: <span className="text-green-500">{score} / {data.length}</span></p>
                <p className="text-xl mt-4 text-white">
                Your Incorrect: <span className="text-red-500">{incorrect} / {data.length}</span>
            </p>

            <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setShowHistory(!showHistory)}
        >
           {showHistory ? "Hide History" : "View Correct Answers"}
           </button>
           {showHistory && (
         <div className="mt-2 p-4 border border-gray-300 rounded-lg text-left bg-white">
         <h2 className="text-xl font-bold mb-4">Previous Attempt History</h2>
         {history.map((item, index) => (
           <div key={index} className="p-2 border-b border-gray-200">
             <p className="text-md font-semibold">{item.question}</p>
             <p className={`text-sm ${item.isCorrect ? "text-green-500" : "text-red-500"}`}>
               Your Answer: <span className="font-medium">{item.selectedAnswer}</span>
             </p>
             <p className="text-sm text-gray-700">
               Correct Answer: <span className="font-medium">{item.correctAnswer}</span>
             </p>
           </div>
         ))}
       </div>
       
        )}
            </div>
        );
    }

    return (
        <div className="w-2/4 mx-auto mt-20">
            <QuizeCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                typeQuestion={currentQuestion.type}
                handleOptionClick={handleOptionClick}
                clickHandler={clickHandler}
                timer={timer}
            />
        </div>
    );
}
