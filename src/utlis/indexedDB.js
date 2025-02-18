

// Open a connection to the IndexedDB
const openDB = () => {
    const request = indexedDB.open("QuizScoresDB", 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("scores")) {
        db.createObjectStore("scores", { keyPath: "id", autoIncrement: true });
      }
    };

  
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result); // DB instance
      };
  
      request.onerror = (event) => {
        reject(event);
      };
    });
  };
  
  // Function to save score data
  const saveScore = async (score, totalQuestions) => {
    try {
      const db = await openDB();
      const transaction = db.transaction("scores", "readwrite");
      const store = transaction.objectStore("scores");
  
      const scoreData = {
        score: score,
        totalQuestions: totalQuestions,
        timestamp: new Date(),
      };
  
      store.add(scoreData);
  
      transaction.oncomplete = () => {
        console.log("Score saved successfully.");
      };
  
      transaction.onerror = (event) => {
        console.error("Error saving score", event);
      };
    } catch (error) {
      console.error("Error accessing IndexedDB", error);
    }
  };
  
  // Function to retrieve all scores
  const getScores = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction("scores", "readonly");
      const store = transaction.objectStore("scores");
  
      const request = store.getAll();
  
      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = (event) => {
          reject(event);
        };
      });
    } catch (error) {
      console.error("Error retrieving scores", error);
    }
  };
  
  export { saveScore, getScores };
  