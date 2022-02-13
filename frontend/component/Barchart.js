import React from 'react'


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'วันที่ 1',
    income: 200,
    expense: 150,
    amt: 150,
  },
  {
    name: 'วันที่ 2',
    income: 200,
    expense: 100,
    amt: 500,
  },
  {
    name: 'วันที่ 3',
    income: 200,
    expense: 120,
    amt: 500,
  },
  {
    name: 'วันที่ 4',
    income: 200,
    expense: 180,
    amt: 500,
  },
  {
    name: 'วันที่ 5',
    income: 200,
    expense: 200,
    amt: 500,
  },
  {
    name: 'วันที่ 6',
    income: 20,
    expense: 200 ,
    amt: 500,
  },
  {
    name: 'วันนี้',
    income: 200,
    expense: 150,
    amt: 500,
  },
];


export const Barchart = () => {
  return (
    <div className="border border-secondary rounded" style={{'height':'40vh'}}>
        <div className='d-flex flex-row m-3'>
            <h5>รายรับรายจ่ายรายวันล่าสุด</h5>
        </div>
        <ResponsiveContainer width="100%" height="80%">
            <BarChart
                width={'100%'}
                height={300}
                data={data}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey="name" />
                <YAxis  domain={[0,300]}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expense" fill="#FF6962" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
