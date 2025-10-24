import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          newValue = currentValue / inputValue;
          break;
        case "%":
          newValue = (currentValue * inputValue) / 100;
          break;
        default:
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-3xl bg-card shadow-2xl border border-border backdrop-blur-sm">
      <div className="mb-6 p-6 rounded-2xl bg-[hsl(var(--calculator-display))] min-h-[120px] flex flex-col justify-end">
        <div className="text-right text-5xl font-light text-foreground break-all">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <Button
          variant="secondary"
          onClick={clear}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          AC
        </Button>
        <Button
          variant="secondary"
          onClick={toggleSign}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          +/-
        </Button>
        <Button
          variant="secondary"
          onClick={percentage}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          %
        </Button>
        <Button
          onClick={() => performOperation("÷")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          ÷
        </Button>

        {["7", "8", "9"].map((digit) => (
          <Button
            key={digit}
            onClick={() => inputDigit(digit)}
            className="bg-[hsl(var(--calculator-number))] hover:bg-[hsl(var(--calculator-number-hover))] text-foreground font-medium text-xl h-16 rounded-2xl transition-all"
          >
            {digit}
          </Button>
        ))}
        <Button
          onClick={() => performOperation("×")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          ×
        </Button>

        {["4", "5", "6"].map((digit) => (
          <Button
            key={digit}
            onClick={() => inputDigit(digit)}
            className="bg-[hsl(var(--calculator-number))] hover:bg-[hsl(var(--calculator-number-hover))] text-foreground font-medium text-xl h-16 rounded-2xl transition-all"
          >
            {digit}
          </Button>
        ))}
        <Button
          onClick={() => performOperation("-")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          -
        </Button>

        {["1", "2", "3"].map((digit) => (
          <Button
            key={digit}
            onClick={() => inputDigit(digit)}
            className="bg-[hsl(var(--calculator-number))] hover:bg-[hsl(var(--calculator-number-hover))] text-foreground font-medium text-xl h-16 rounded-2xl transition-all"
          >
            {digit}
          </Button>
        ))}
        <Button
          onClick={() => performOperation("+")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          +
        </Button>

        <Button
          onClick={() => inputDigit("0")}
          className="col-span-2 bg-[hsl(var(--calculator-number))] hover:bg-[hsl(var(--calculator-number-hover))] text-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-[hsl(var(--calculator-number))] hover:bg-[hsl(var(--calculator-number-hover))] text-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          .
        </Button>
        <Button
          onClick={() => performOperation("=")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xl h-16 rounded-2xl transition-all"
        >
          =
        </Button>
      </div>
    </div>
  );
};
