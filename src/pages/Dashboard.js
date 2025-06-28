
import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-blue-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Painel BrasilPay</h1>
      <div className="bg-green-500 p-6 rounded-lg shadow-lg">
        <p className="text-2xl">Saldo: <span className="font-bold">R$ 0,00</span></p>
      </div>
    </div>
  );
};

export default Dashboard;
