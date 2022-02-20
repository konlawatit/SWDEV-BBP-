import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Jan.',
//     income: 4000,
//     expense: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Feb.',
//     income: 3000,
//     expense: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Mar.',
//     income: 2000,
//     expense: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'May.',
//     income: 2000,
//     expense: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Apr.',
//     income: 2780,
//     expense: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Jun.',
//     income: 1890,
//     expense: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Jul.',
//     income: 2390,
//     expense: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Aug.',
//     income: 3490,
//     expense: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Sep.',
//     income: 3490,
//     expense: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Oct.',
//     income: 3490,
//     expense: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Nov.',
//     income: 3490,
//     expense: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Dec.',
//     income: 3490,
//     expense: 4300,
//     amt: 2100,
//   },
// ];

export const Linechart= (account) => {
  const data = [];
  var date;
  Object.values(account).forEach(
    (val) => (
      (date = new Date(val.date)),
      (date =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear()),
      val.type === "income"
        ? data.push({
            income: val.amount,
            expense: 0,
            date: date,
          })
        : data.push({
            income: 0,
            expense: val.amount,
            date: date,
          })
    )
  );
    return (
      <div className="border border-secondary rounded" style={{'height':'40vh'}}>
          <div className='d-flex flex-row m-3'>
              <h5>รายรับรายจ่ายรายเดือนล่าสุด</h5>
          </div>
          <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={'100%'}
          height={'100%'}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d"/>
          <Line type="monotone" dataKey="expense" stroke="#FF6962" />
        </LineChart>
      </ResponsiveContainer>
      </div>
    )
  }
