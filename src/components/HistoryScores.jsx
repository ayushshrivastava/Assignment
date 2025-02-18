import { useEffect, useState } from "react";
import { getScores } from "../utlis/indexedDB"
import Card from "./Card";

export default function HistoryScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch history of scores from IndexedDB
    const fetchScores = async () => {
      try {
        const fetchedScores = await getScores();
        setScores(fetchedScores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);



  return (
    <div className="max-w-5xl
     mt-4 p-4 text-left">
      <h2 className="font-mono text-3xl font-bold items-center text-white">Previous Attempt Scores</h2>
      <div className="flex gap-4 mt-4 flex-wrap">
      {scores.length === 0 ? (
        <p className="text-sm text-white">No previous scores available.</p>
      ) : (
        scores.map((score, index) => (
          <Card key={index} >
            <p className="text-lg font-bold  text-white">Attempt #{index + 1}</p>
            <p className="text-md text-white ">Score: {score.score +1} / {score.totalQuestions}</p>
            <p className="text-md text-white">
              Date: {new Date(score.timestamp).toLocaleDateString()}
            </p>
          </Card>
        ))
      )}
      </div>
    </div>
  );
}
