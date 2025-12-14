import React, { useState, useEffect } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';

interface MortgageResult {
  monthlyPayment: number;
  principalInterest: number;
  propertyTax: number;
  insurance: number;
}

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30 years');
  const [result, setResult] = useState<MortgageResult | null>(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice.replace(/,/g, '')) || 0;
    const down = parseFloat(downPayment.replace(/,/g, '')) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm);

    if (price <= 0 || rate <= 0) {
      return;
    }

    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;

    // Monthly payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPI =
      principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Estimated property tax (1.2% annually)
    const propertyTax = (price * 0.012) / 12;

    // Estimated insurance (0.5% annually)
    const insurance = (price * 0.005) / 12;

    const totalMonthly = monthlyPI + propertyTax + insurance;

    setResult({
      monthlyPayment: totalMonthly,
      principalInterest: monthlyPI,
      propertyTax: propertyTax,
      insurance: insurance
    });
  };

  const formatCurrency = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num) return '';
    return parseInt(num).toLocaleString();
  };

  const handleHomePrice = (value: string) => {
    const formatted = formatCurrency(value);
    setHomePrice(formatted);
  };

  const handleDownPayment = (value: string) => {
    const formatted = formatCurrency(value);
    setDownPayment(formatted);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white pt-4 pb-6 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          AI Mortgage Calculator
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Calculate monthly payments and compare options
        </p>
      </div>

      {/* Calculator Form */}
      <div className="px-4 py-6 space-y-5">
        {/* Home Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Home Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              type="text"
              placeholder="500,000"
              value={homePrice}
              onChange={(e) => handleHomePrice(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Down Payment
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              type="text"
              placeholder="100,000"
              value={downPayment}
              onChange={(e) => handleDownPayment(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Interest Rate & Loan Term */}
        <div className="grid grid-cols-2 gap-4">
          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interest Rate
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="6.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                %
              </span>
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Term
            </label>
            <div className="relative">
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700"
              >
                <option>15 years</option>
                <option>20 years</option>
                <option>30 years</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateMortgage}
          className="w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Calculate Payment
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="px-4 animate-in fade-in slide-in-from-bottom duration-500">
          {/* Monthly Payment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
            <p className="text-4xl font-bold text-gray-900 mb-6">
              ${result.monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>

            {/* Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Principal & Interest</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${result.principalInterest.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Property Tax</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${result.propertyTax.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Insurance</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${result.insurance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs text-blue-900 font-medium mb-2">💡 Smart Tip</p>
            <p className="text-xs text-blue-800">
              Increasing your down payment can significantly reduce your monthly payments and overall interest paid.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-bottom 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MortgageCalculator;