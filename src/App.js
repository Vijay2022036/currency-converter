import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState();

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1800')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-6 backdrop-blur-sm bg-white/30 shadow-xl ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Currency Converter</h1>
            <p className="text-gray-700">Easily convert between currencies</p>
          </div>
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(Number(amount))}
            />
          </div>
          <div className="relative w-full h-0.5 mb-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white px-3 py-1 shadow-md hover:bg-blue-700 transition-colors"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
            <p className="text-center mt-4 text-gray-700">
              1 {from.toUpperCase()} = {currencyInfo[to]} {to.toUpperCase()}
            </p>
        </form>
      </div>
    </div>
  );
}

export default App;
