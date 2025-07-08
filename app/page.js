"use client";

import { useState } from 'react';

const questions = [
  "I frequently feel isolated or disconnected from the people around me, even when I'm with others.",
  "I have trouble creating or maintaining close and meaningful relationships.",
  "I constantly experience a feeling of emotional emptiness or abandonment, regardless of who I'm with.",
  "I feel like I have no one with whom I can share my deepest thoughts, feelings, or concerns.",
  "My self-esteem and self-confidence are affected by the persistent feeling of loneliness.",
  "Recently, I've seriously thought that my life isn't worth living or that no one would care if something bad happened to me.", // FLAG
  "I often avoid social situations or interaction opportunities due to fear of rejection or inadequacy.",
  "I have significant difficulty opening up emotionally and trusting other people.",
  "I've resorted to unhealthy or harmful ways of coping with loneliness, such as excessive alcohol or drug use, or extreme isolation.",
  "My emotional, physical, or mental health has deteriorated due to frequent feelings of loneliness."
];

export default function LonelinessTest() {
  const [responses, setResponses] = useState(Array(10).fill(0));
  const [result, setResult] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const recordResponse = (value) => {
    const newResponses = [...responses];
    newResponses[currentIndex] = value;
    setResponses(newResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateResult(newResponses);
    }
  };

  const calculateResult = (responses) => {
    if (responses[5] >= 3) { // FLAG
      setResult("RED");
    } else {
      const total = responses.reduce((a, b) => a + b, 0);
      if (total <= 20) setResult("GREEN");
      else if (total <= 35) setResult("YELLOW");
      else setResult("RED");
    }
  };

  const resetTest = () => {
    setResponses(Array(10).fill(0));
    setResult(null);
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md text-gray-900 dark:text-gray-100">
      {!result ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Loneliness Test</h2>
          <p className="mb-4">{questions[currentIndex]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => recordResponse(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Question {currentIndex + 1} of {questions.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Result: {result}</h2>
          {result === "GREEN" && <p>You handle this topic very well and are emotionally well-adjusted. You could greatly help others in need.</p>}
          {result === "YELLOW" && <p>There are clear signs of emotional difficulties that need attention but can be overcome with determination and help.</p>}
          {result === "RED" && <p>Your emotional issues with this topic require professional assistance. Please promptly seek help from a doctor or psychologist.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={resetTest}
          >
            Retake Test
          </button>
        </>
      )}
    </div>
  );
}
