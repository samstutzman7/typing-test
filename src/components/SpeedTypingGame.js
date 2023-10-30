import React, { useEffect, useState } from 'react';
import './SpeedTypingGame.css';
import TypingArea from './TypingArea';
import { beginner_paragraphs, intermediate_paragraphs,
advanced_paragraphs, expert_paragraphs, beginner_randomWords,
intermediate_randomWords, advanced_randomWords, expert_randomWords } from './Texts'

const SpeedTypingGame = () => {

    const [typingText, setTypingText] = useState('');
    const [inpFieldValue, setInpFieldValue] = useState('');
    const [maxTime, setMaxTime] = useState(60);
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [timeLimit, setTimeLimit] = useState(60);
    const [typingMode, setTypingMode] = useState('paragraph');
    const [difficulty, setDifficulty] = useState('beginner');
    const [timeIsUp, setTimeIsUp] = useState(false);


    const loadText = () => {
        let text;
        if (typingMode === 'paragraph' && difficulty === 'beginner') {
            const ranIndex = Math.floor(Math.random() * beginner_paragraphs.length);
            text = beginner_paragraphs[ranIndex];
        }
        if (typingMode === 'paragraph' && difficulty === 'intermediate') {
            const ranIndex = Math.floor(Math.random() * intermediate_paragraphs.length);
            text = intermediate_paragraphs[ranIndex]
        }
        if (typingMode === 'paragraph' && difficulty === 'advanced') {
            const ranIndex = Math.floor(Math.random() * advanced_paragraphs.length);
            text = advanced_paragraphs[ranIndex];
        }
        if (typingMode === 'paragraph' && difficulty === 'expert') {
            const ranIndex = Math.floor(Math.random() * expert_paragraphs.length);
            text = expert_paragraphs[ranIndex]
        }

        if (typingMode === 'randomWords' && difficulty === 'beginner') {
            const ranIndex = Math.floor(Math.random() * beginner_randomWords.length);
            text = beginner_randomWords[ranIndex];
        }
        if (typingMode === 'randomWords' && difficulty === 'intermediate') {
            const ranIndex = Math.floor(Math.random() * intermediate_randomWords.length);
            text = intermediate_randomWords[ranIndex]
        }
        if (typingMode === 'randomWords' && difficulty === 'advanced') {
            const ranIndex = Math.floor(Math.random() * advanced_randomWords.length);
            text = advanced_randomWords[ranIndex];
        }
        if (typingMode === 'randomWords' && difficulty === 'expert') {
            const ranIndex = Math.floor(Math.random() * expert_randomWords.length);
            text = expert_randomWords[ranIndex]
        }

        const inputField = document.getElementsByClassName('input-field')[0];
        document.addEventListener("keydown", () => inputField.focus());

        const content = Array.from(text).map((letter, index) => (
            <span key={index} style={{ color: (letter !== ' ') ? 'black' : 'transparent' }}
            className={`char ${index === 0 ? 'active' : ''}`}>
                {(letter !== ' ') ? letter : '_'}
            </span>
        ));
        setTypingText(content);
        setInpFieldValue('');
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
    };

    const handleKeyDown = (event) => {
        const characters = document.querySelectorAll('.char');
        if (event.key === 'Backspace' && charIndex > 0 && charIndex < characters.length && timeLeft > 0) {
            if (characters[charIndex - 1].classList.contains('correct')) {
                characters[charIndex - 1].classList.remove('correct');
            }
            if (characters[charIndex - 1].classList.contains('wrong')) {
                characters[charIndex - 1].classList.remove('wrong');
                setMistakes(mistakes - 1);
            }
            if (characters[charIndex]) {
                characters[charIndex].classList.remove('active');
            }
            if (characters[charIndex - 1]) {
                characters[charIndex - 1].classList.add('active');
            }
            
            setCharIndex(charIndex - 1);
            let cpm = (charIndex - mistakes - 1) * (60 / (maxTime - timeLeft));
            cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
            setCPM(parseInt(cpm, 10));
            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            setWPM(wpm);
        }
    }

    const initTyping = (event) => {
        const characters = document.querySelectorAll('.char');
        let typedChar = event.target.value;
        if (charIndex < characters.length && timeLeft > 0) {
            let currentChar = characters[charIndex].innerText;
            if (currentChar === '_') currentChar = ' ';
            if (!isTyping) {
                setIsTyping(true);
            }
            if (typedChar === currentChar) {
                setCharIndex(charIndex + 1);
        if (charIndex + 1 < characters.length) characters[charIndex + 1].classList.add('active');
                characters[charIndex].classList.remove('active');
                characters[charIndex].classList.add('correct');
            } else {
                setCharIndex(charIndex + 1);
                setMistakes(mistakes + 1);
                characters[charIndex].classList.remove('active');
        if (charIndex + 1 < characters.length) characters[charIndex + 1].classList.add('active');
                characters[charIndex].classList.add('wrong');
            }

            if (charIndex === characters.length - 1) setIsTyping(false);

            let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            setWPM(wpm);

            let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
            cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
            setCPM(parseInt(cpm, 10));
        } else {
            setIsTyping(false);
        }
    };

    const resetGame = () => {
        setIsTyping(false);
        setTimeLeft(maxTime);
        setCharIndex(0);
        setMistakes(0);
        setTypingText('');
        setCPM(0);
        setWPM(0);
        setTimeIsUp(false);
        const characters = document.querySelectorAll('.char');
        characters.forEach(span => {
            span.classList.remove("correct");
            span.classList.remove("wrong");
            span.classList.remove("active");
        });
        characters[0].classList.add('active');
        loadText();
    };

    const TimeLimitSelector = ({ onChange }) => {
        const timeLimits = [120, 90, 60, 30, 15];

        return (
            <div className='time-limit-selector'>
                {timeLimits.map((limit) => (
                    <button key={limit} onClick={() => onChange(limit)}>
                        {limit}s
                    </button>
                ))}
            </div>
        );
    };

    const DifficultySelector = ({ onChange, value }) => {
        return (
            <select onChange={(e) => onChange(e.target.value)} value={value}>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
                <option value='expert'>Expert</option>
            </select>
        )
    }

    const getSelectedText = () => {
        let modeText = typingMode === 'paragraph' ? 'Paragraph' : 'Random Words';
        let difficultyText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        return (`${difficultyText} ${modeText}`)
    }

    const handleTimeLimitChange = (newLimit) => {
        setMaxTime(newLimit);
        setTimeLimit(newLimit);
        setTimeLeft(newLimit);
        resetGame();
    };

    useEffect(() => {
        setTimeLeft(timeLimit);
    }, [timeLimit])

    useEffect(() => {
        loadText();
    }, [typingMode, difficulty]);

    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                let cpm = (charIndex - mistakes) * (60 / (maxTime - timeLeft));
                cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
                setCPM(parseInt(cpm, 10));
                let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(wpm);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            setIsTyping(false);
            setTimeIsUp(true);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isTyping, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsTyping(false);
            setTimeIsUp(true);
        }
    }, [timeLeft])

    useEffect(() => {
        if (timeIsUp) {
            setInpFieldValue("Time's Up! Check out your stats below!")
        }
    }, [timeIsUp]);

    return (
        <div className='container'>
            <p>Time Limit: {timeLimit}s</p>
            <TimeLimitSelector onChange={handleTimeLimitChange} />
            <p>
                Selected Text: {getSelectedText()}
            </p>
            <div className='text-selector'>
                <button onClick={() => setTypingMode('paragraph')}>Paragraph</button>
                <button onClick={() => setTypingMode('randomWords')}>Random Words</button>
                <DifficultySelector 
                onChange={(newDifficulty) => setDifficulty(newDifficulty)} 
                value={difficulty}
            />            
            </div>
            <input
                type='text'
                className='input-field'
                value={inpFieldValue}
                onChange={initTyping}
                onKeyDown={handleKeyDown}
            />

            {(isTyping == false) && timeLeft > 0 &&(
                <p>Congratulations! Check out your stats below!</p>
            )}

            {timeLeft === 0 && <p>Time's Up! Check out your stats below!</p>}

            
            <TypingArea
                typingText={typingText}
                inpFieldValue={inpFieldValue}
                timeLimit={timeLimit}
                timeLeft={timeLeft}
                mistakes={mistakes}
                WPM={WPM}
                CPM={CPM}
                initTyping={initTyping}
                handleKeyDown={handleKeyDown}
                resetGame={resetGame}
            />
            
        </div>
    );
};

export default SpeedTypingGame;