import { useState, useMemo } from 'react';

// Exchange rates
const rates = {
   USD: 1,
   EUR: 0.92,
   GBP: 0.78,
   JPY: 156.7,
};

// Map currency codes to emoji flags
const currencyFlags = {
   USD: '🇺🇸',
   EUR: '🇪🇺',
   GBP: '🇬🇧',
   JPY: '🇯🇵',
};

export function CurrencyConverter() {
   const [amount, setAmount] = useState('');
   const [fromCurrency, setFromCurrency] = useState('');
   const [toCurrency, setToCurrency] = useState('');

   // Memoize base amount so changes to toCurrency do not recalculate
   const baseAmount = useMemo(() => {
      const numericAmount = parseFloat(amount);
      if (!fromCurrency || !rates[fromCurrency] || isNaN(numericAmount))
         return 0;
      return numericAmount / rates[fromCurrency];
   }, [amount, fromCurrency]);

   // Calculate converted amount
   const convertedAmount =
      toCurrency && rates[toCurrency]
         ? (baseAmount * rates[toCurrency]).toFixed(2)
         : '';

   return (
      <div className='min-h-[100dvh] flex items-center justify-center bg-gray-900 text-white p-4'>
         <div className='w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
               💱 Currency Converter
            </h1>

            {/* Amount input */}
            <input
               type='number'
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               className='w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
               placeholder='Enter amount'
            />

            {/* From currency select */}
            <div className='mb-4'>
               <label className='block mb-1'>From:</label>
               <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
               >
                  <option value=''>Select currency</option>
                  {Object.keys(rates).map((cur) => (
                     <option key={cur} value={cur}>
                        {currencyFlags[cur]} {cur}
                     </option>
                  ))}
               </select>
            </div>

            {/* To currency select */}
            <div className='mb-6'>
               <label className='block mb-1'>To:</label>
               <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className='w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
               >
                  <option value=''>Select currency</option>
                  {Object.keys(rates).map((cur) => (
                     <option key={cur} value={cur}>
                        {currencyFlags[cur]} {cur}
                     </option>
                  ))}
               </select>
            </div>

            {/* Converted amount display */}
            {toCurrency && convertedAmount && (
               <div className='text-center text-xl font-semibold p-4 bg-gray-700 rounded-lg shadow-inner'>
                  {currencyFlags[toCurrency]} {convertedAmount} {toCurrency}
               </div>
            )}
         </div>
      </div>
   );
}
