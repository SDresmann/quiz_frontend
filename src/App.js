import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import img1 from './images/unnamed.png';
import img2 from './images/unnamed2.png';
import img3 from './images/unnamed3.png';
import img4 from './images/unnamed4.png';
import img5 from './images/unnamed5.png';
import img6 from './images/unnamed6.png';
import img7 from './images/unnamed7.png';
import img8 from './images/unnamed8.png';
import img9 from './images/unnamed9.png';
import img10 from './images/unnamed10.png';

/** =========================
 *  QUESTIONS
 *  ========================= */
const SECTION_2_QUESTIONS = [
  { id: 101, category: 'logical', question: `Tanya is older than Eric.
Cliff is older than Tanya.
Eric is older than Cliff.
If the first two statements are true, the third statement is`, options: ['True', 'False', 'Uncertain'], correctIndex: 1 },
  { id: 102, category: 'logical', question: `All the tulips in Zoe's garden are white.
All the pansies in Zoe's garden are yellow.
All the flowers in Zoe's garden are either white or yellow
If the first two statements are true, the third statement is`, options: ['True', 'False', 'Uncertain'], correctIndex: 2 },
  { id: 103, category: 'logical', question: `Rover weighs less than Fido.
Rover weighs more than Boomer.
Of the three dogs, Boomer weighs the least.
If the first two statements are true, the third statement is`, options: ['True', 'False', 'Uncertain'], correctIndex: 0 },
  { id: 104, category: 'logical', question: `All the trees in the park are flowering trees.
Some of the trees in the park are dogwoods.
All dogwoods in the park are flowering trees.
If the first two statements are true, the third statement is`, options: ['True', 'False', 'Uncertain'], correctIndex: 0 },
  { id: 105, category: 'logical', question: `Cloudy days tend to be more windy than sunny days.
Foggy days tend to be less windy than cloudy days.
Sunny days tend to be less windy than foggy days.
If the first two statements are true, the third statement is`, options: ['True', 'False', 'Uncertain'], correctIndex: 2 },
  { id: 106, category: 'logical', question: `Fact 1: Jessica has four children
Fact 2: Two of the children have blue eyes and two of the children have brown eyes.
Fact 3: Half of the children are girls.

If the first three statements are facts, which of the following statements must also be a fact?
I: At least one girl has blue eyes.
II: Two of the children are boys.
III: The boys have brown eyes.`, options: ['I only', 'II only', 'II and III only', 'None of the statements are a known fact.'], correctIndex: 1 },
  { id: 107, category: 'logical', question: `Fact 1: All chickens are birds.
Fact 2: Some chickens are hens.
Fact 3: Female birds lay eggs.

If the first three statements are facts, which of the following statements must also be a fact?
I: All birds lay eggs.
II: Some Hens are birds.
III: Some chickens are not hens.`, options: ['I only', 'II only', 'II and III only', 'None of the statements are a known fact.'], correctIndex: 1 },
  { id: 108, category: 'logical', question: `At the baseball game, Henry was sitting in seat 253. Marla was sitting to the right of Henry in seat 254. In the seat to the left of Henry was George. Inez was sitting to the left of George. Which seat is Inez sitting in?`, options: ['251', '254', '255', '256'], correctIndex: 0 },
  { id: 109, category: 'logical', question: `A four-person crew from Classic Colors is painting Mr. Field's house. Michael is painting the front of the house. Ross is in the alley behind the house painting the back. Jed is painting the window frames on the north side, Shawn is on the south. If Michael switches places with Jed, and Jed then switches places with Shawn, where is Shawn?`, options: ['in the alley behind the house', 'on the north side of the house', 'in front of the house', 'on the south side of the house'], correctIndex: 2 },
  { id: 110, category: 'logical', question: `Ms. Forest likes to let her students choose who their partners will be; however, no pair of students may work together more than seven class periods in a row. Adam and Baxter have studied together seven class periods in a row. Carter and Dennis have worked together three class periods in a row. Carter does not want to work with Adam. Who should be assigned to work with Baxter?`, options: ['Carter', 'Adam', 'Dennis', 'Forest'], correctIndex: 0 },
];

const SECTION_3_QUESTIONS = [
  { id: 201, category: 'verbal', question: `Arrange the words given below in a meaningful sequence.

1. Key
2. Door
3. Lock
4. Room
5. Switch on`, options: ['5, 1, 2, 4, 3', '4, 2, 1, 5, 3', '1, 3, 2, 4, 5', '1, 2, 3, 5, 4'], correctIndex: 2 },
  { id: 202, category: 'verbal', question: `Arrange the words given below in a meaningful sequence.

1. Word
2. Paragraph
3. Sentence
4. Letters
5. Phrase`, options: ['4, 1, 5, 2, 3', '4, 1, 3, 5, 2', '4, 2, 5, 1, 3', '4, 1, 5, 3, 2'], correctIndex: 3 },
  { id: 203, category: 'verbal', question: `Choose the word which is different from the rest.`, options: ['Tricycle', 'Trident', 'Trifle', 'Tricolor', 'Trilogy'], correctIndex: 2 },
  { id: 204, category: 'verbal', question: `Choose the word which is different from the rest.`, options: ['Valley', 'Tower', 'Sea', 'Mountain', 'River'], correctIndex: 1 },
  { id: 205, category: 'verbal', question: `Paw : Cat :: Hoof : ?`, options: ['Lamb', 'Elephant', 'Lion', 'Horse'], correctIndex: 3 },
  { id: 206, category: 'verbal', question: `Melt : Liquid :: Freeze : ?`, options: ['Ice', 'Condense', 'Solid', 'Force'], correctIndex: 2 },
  { id: 207, category: 'verbal', question: `Pointing to a photograph of a boy Robert said, "He is the son of the only son of my mother." How is Robert related to that boy?`, options: ['Brother', 'Uncle', 'Cousin', 'Father'], correctIndex: 3 },
  { id: 208, category: 'verbal', question: `Introducing a boy, a girl said, "He is the son of the daughter of the father of my uncle." How is the boy related to the girl?`, options: ['Brother', 'Nephew', 'Uncle', 'Son-in-law'], correctIndex: 0 },
  { id: 209, category: 'verbal', question: `Despite his best efforts to conceal his anger...`, options: ['we could detect that he was very happy', 'he failed to give us an impression of his agony', 'he succeeded in camouflaging his emotions', 'he could succeed in doing it easily', 'people came to know that he was annoyed'], correctIndex: 4 },
  { id: 210, category: 'verbal', question: `It is not easy to remain tranquil when those around you...`, options: ['behave in a socially acceptable manner', 'exhibit pleasant mannerism', 'are losing their heads', 'agree to whatever you say', 'exhibit generous and magnanimous gestures'], correctIndex: 2 },
];

const SECTION_4_QUESTIONS = [
  { id: 301, category: 'numerical', question: 'Find out from amongst the four alternatives as to how the pattern would appear when the transparent sheet is folded at the dotted line.', image: img1, options: ['1', '2', '3', '4'], correctIndex: 2 },
  { id: 302, category: 'numerical', question: 'Find out from amongst the four alternatives as to how the pattern would appear when the transparent sheet is folded at the dotted line.', image: img2, options: ['1', '2', '3', '4'], correctIndex: 1 },
  { id: 303, category: 'numerical', question: 'Identify the figure that completes the pattern.', image: img3, options: ['1', '2', '3', '4'], correctIndex: 1 },
  { id: 304, category: 'numerical', question: 'Identify the figure that completes the pattern.', image: img4, options: ['1', '2', '3', '4'], correctIndex: 1 },
  { id: 305, category: 'numerical', question: 'Identify the figure that completes the pattern.', image: img5, options: ['1', '2', '3', '4'], correctIndex: 2 },
  { id: 306, category: 'numerical', question: 'Identify the figure that completes the pattern.', image: img6, options: ['1', '2', '3', '4'], correctIndex: 0 },
  { id: 307, category: 'numerical', question: `Choose the set of figures which follows the given rule.
Rule: The series becomes complex as it proceeds.`, image: img7, options: ['1', '2', '3', '4'], correctIndex: 1 },
  { id: 308, category: 'numerical', question: `Choose the set of figures which follows the given rule.
Rule: Closed figures losing their sides and open figures gaining their sides.`, image: img8, options: ['1', '2', '3', '4'], correctIndex: 0 },
  { id: 309, category: 'numerical', question: 'Choose the correct mirror image of the given figure (X) from amongst the four alternatives.', image: img9, options: ['1', '2', '3', '4'], correctIndex: 0 },
  { id: 310, category: 'numerical', question: 'Choose the correct mirror image of the given figure (X) from amongst the four alternatives.', image: img10, options: ['1', '2', '3', '4'], correctIndex: 3 },
];

const QUESTIONS = [...SECTION_2_QUESTIONS, ...SECTION_3_QUESTIONS, ...SECTION_4_QUESTIONS];

const API_BASE = 'http://localhost:4000';
const QUIZ_API = `${API_BASE}/api/quiz`;
const LS_KEY = 'kable_quiz_state_v2';

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function App() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const saveTimerRef = useRef(null);
  const currentQuestion = QUESTIONS[currentIndex];

  const clearLocal = () => localStorage.removeItem(LS_KEY);
  const persistLocal = (state) => localStorage.setItem(LS_KEY, JSON.stringify(state));

  // --- API helpers (single source of truth) ---
  const getAttempt = (email) =>
    fetch(`${QUIZ_API}/quiz-attempt?email=${encodeURIComponent(email)}`);

  const saveProgress = (payload) =>
    fetch(`${QUIZ_API}/quiz-progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

  const submitQuiz = (payload) =>
    fetch(`${QUIZ_API}/quiz-submission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

  const redeemRetake = (token) =>
    fetch(`${QUIZ_API}/retake/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

  const scheduleSaveProgress = (nextIndex, nextAnswers, nextUserInfo) => {
    const email = nextUserInfo?.email?.trim();
    if (!email) return;

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveProgress({ user: nextUserInfo, currentIndex: nextIndex, answers: nextAnswers }).catch(
        () => {}
      );
    }, 350);
  };

  // Restore local state (instant resume)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);

      if (saved?.userInfo) setUserInfo(saved.userInfo);
      if (typeof saved?.hasStarted === 'boolean') setHasStarted(saved.hasStarted);
      if (typeof saved?.currentIndex === 'number') setCurrentIndex(saved.currentIndex);
      if (saved?.answers && typeof saved.answers === 'object') setAnswers(saved.answers);
      if (typeof saved?.showResults === 'boolean') setShowResults(saved.showResults);
    } catch {}
  }, []);

  // Persist locally
  useEffect(() => {
    persistLocal({ userInfo, hasStarted, currentIndex, answers, showResults });
  }, [userInfo, hasStarted, currentIndex, answers, showResults]);

  // Redeem retake token from URL (?retake=TOKEN)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('retake');
    if (!token) return;

    (async () => {
      try {
        const res = await redeemRetake(token);
        if (!res.ok) return;

        clearLocal();
        setAnswers({});
        setCurrentIndex(0);
        setShowResults(false);
        setHasStarted(false);

        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {}
    })();
  }, []);

  const handleAnswer = (optionIndex) => {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionIndex };
    setAnswers(nextAnswers);
    scheduleSaveProgress(currentIndex, nextAnswers, userInfo);
  };

  const getSectionScores = () => {
    const result = { logical_reasoning: 0, numerical_reasoning: 0, verbal_reasoning: 0 };

    for (const q of QUESTIONS) {
      const userAnswer = answers[q.id];
      if (userAnswer === undefined) continue;

      if (userAnswer === q.correctIndex) {
        if (q.category === 'logical') result.logical_reasoning += 1;
        if (q.category === 'verbal') result.verbal_reasoning += 1;
        if (q.category === 'numerical') result.numerical_reasoning += 1;
      }
    }

    return result;
  };

  const submitResultsToBackend = async () => {
    const sectionScores = getSectionScores();

    try {
      const res = await submitQuiz({
        user: userInfo,
        logical_reasoning: sectionScores.logical_reasoning,
        numerical_reasoning: sectionScores.numerical_reasoning,
        verbal_reasoning: sectionScores.verbal_reasoning,
        totalQuestions: QUESTIONS.length,
        answers,
      });

      if (res.status === 403) {
        setShowResults(true);
        setHasStarted(false);
      }
    } catch (error) {
      console.error('Failed to submit quiz results to backend:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scheduleSaveProgress(nextIndex, answers, userInfo);
      return;
    }

    submitResultsToBackend();
    setShowResults(true);
    setHasStarted(false);
  };

  const handlePrevious = () => {
    if (currentIndex <= 0) return;
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    scheduleSaveProgress(nextIndex, answers, userInfo);
  };

  const startQuiz = async () => {
    const email = userInfo.email?.trim();
    if (!email) return;

    try {
      const res = await getAttempt(email);
      const data = await safeJson(res);

      if (data?.exists && data.status === 'completed') {
        setHasStarted(false);
        setShowResults(true);
        return;
      }

      if (data?.exists && data.status === 'in_progress') {
        if (data.answers && typeof data.answers === 'object') setAnswers(data.answers);
        if (typeof data.currentIndex === 'number') setCurrentIndex(data.currentIndex);
        setHasStarted(true);
        return;
      }

      setHasStarted(true);
      scheduleSaveProgress(0, answers, userInfo);
    } catch {
      setHasStarted(true);
    }
  };

  const isAnswered = answers[currentQuestion?.id] !== undefined;

  const isUserFormValid =
    userInfo.firstName.trim() !== '' &&
    userInfo.lastName.trim() !== '' &&
    userInfo.email.trim() !== '' &&
    userInfo.phone.trim() !== '';

  return (
    <div className="quiz-app">
      <div className={`quiz-card ${currentQuestion?.category || ''}`}>
        <h1 className="quiz-title">Kable Quiz</h1>

        {!hasStarted && !showResults && (
          <div className="user-form">
            <p className="user-form-intro">Enter your details to start the quiz.</p>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  className="text-input"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>

              <div className="input-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  className="text-input"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="text-input"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="text-input"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>

            <div className="quiz-footer">
              <span />
              <button className="nav-button primary" onClick={startQuiz} disabled={!isUserFormValid}>
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {hasStarted && !showResults && (
          <>
            <div className={`section-label ${currentQuestion.category}`}>
              {currentQuestion.category.toUpperCase()} SECTION
            </div>

            <div className="quiz-progress">
              Question {currentIndex + 1} of {QUESTIONS.length}
            </div>

            <div className="quiz-question">
              <p style={{ whiteSpace: 'pre-line' }}>{currentQuestion.question}</p>

              {currentQuestion.image && (
                <div style={{ marginTop: 12 }}>
                  <img
                    src={currentQuestion.image}
                    alt={`Question ${currentQuestion.id}`}
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                  />
                </div>
              )}
            </div>

            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === index;
                return (
                  <button
                    key={`${currentQuestion.id}-${index}`}
                    className={`quiz-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="quiz-footer">
              <button className="nav-button secondary" onClick={handlePrevious} disabled={currentIndex === 0}>
                Previous
              </button>

              <button className="nav-button primary" onClick={handleNext} disabled={!isAnswered}>
                {currentIndex === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </>
        )}

        {showResults && (
          <div className="quiz-results">
            <h2>Submitted</h2>
            <p>Thanks — your assessment has been recorded.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
