import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const deleteDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(String(inputValue));
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const currentValue = parseFloat(previousValue);
      let result = currentValue;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
      }

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
          <div className="bg-slate-900/50 rounded-2xl p-6 mb-6 min-h-[120px] flex items-end justify-end border border-white/10">
            <div className="text-right w-full overflow-hidden">
              {operation && previousValue && (
                <div className="text-sm text-slate-400 mb-1 truncate">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-5xl font-light text-white tracking-tight truncate">
                {display}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Button
              onClick={clear}
              className="col-span-2 h-16 text-lg font-medium bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-2xl transition-all active:scale-95"
            >
              C
            </Button>
            <Button
              onClick={deleteDigit}
              className="h-16 text-lg font-medium bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 border border-white/10 rounded-2xl transition-all active:scale-95"
            >
              <Icon name="Delete" size={20} />
            </Button>
            <Button
              onClick={() => performOperation('÷')}
              className="h-16 text-2xl font-light bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-2xl transition-all active:scale-95"
            >
              ÷
            </Button>

            {['7', '8', '9'].map((num) => (
              <Button
                key={num}
                onClick={() => inputDigit(num)}
                className="h-16 text-2xl font-light bg-slate-700/50 hover:bg-slate-600/50 text-white border border-white/10 rounded-2xl transition-all active:scale-95"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => performOperation('×')}
              className="h-16 text-2xl font-light bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-2xl transition-all active:scale-95"
            >
              ×
            </Button>

            {['4', '5', '6'].map((num) => (
              <Button
                key={num}
                onClick={() => inputDigit(num)}
                className="h-16 text-2xl font-light bg-slate-700/50 hover:bg-slate-600/50 text-white border border-white/10 rounded-2xl transition-all active:scale-95"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => performOperation('-')}
              className="h-16 text-2xl font-light bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-2xl transition-all active:scale-95"
            >
              −
            </Button>

            {['1', '2', '3'].map((num) => (
              <Button
                key={num}
                onClick={() => inputDigit(num)}
                className="h-16 text-2xl font-light bg-slate-700/50 hover:bg-slate-600/50 text-white border border-white/10 rounded-2xl transition-all active:scale-95"
              >
                {num}
              </Button>
            ))}
            <Button
              onClick={() => performOperation('+')}
              className="h-16 text-2xl font-light bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 rounded-2xl transition-all active:scale-95"
            >
              +
            </Button>

            <Button
              onClick={() => inputDigit('0')}
              className="col-span-2 h-16 text-2xl font-light bg-slate-700/50 hover:bg-slate-600/50 text-white border border-white/10 rounded-2xl transition-all active:scale-95"
            >
              0
            </Button>
            <Button
              onClick={inputDot}
              className="h-16 text-2xl font-light bg-slate-700/50 hover:bg-slate-600/50 text-white border border-white/10 rounded-2xl transition-all active:scale-95"
            >
              .
            </Button>
            <Button
              onClick={calculateResult}
              className="h-16 text-2xl font-light bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/50"
            >
              =
            </Button>
          </div>
        </div>

        <div className="text-center mt-6 text-slate-400 text-sm">
          Минималистичный калькулятор
        </div>
      </div>
    </div>
  );
};

export default Index;
