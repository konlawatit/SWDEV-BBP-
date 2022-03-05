import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export const Linechart= (account) => {
  const thisDate = new Date()
  const data = [
    {
      name: 'Jan.',
      income: 0,
      expense: 0,
      amt: 0,
    },
    {
      name: 'Feb.',
      income: 0,
      expense: 0,
      amt: 2210,
    },
    {
      name: 'Mar.',
      income: 0,
      expense: 0,
      amt: 2290,
    },
    {
      name: 'May.',
      income: 0,
      expense: 0,
      amt: 2290,
    },
    {
      name: 'Apr.',
      income: 0,
      expense: 0,
      amt: 2000,
    },
    {
      name: 'Jun.',
      income: 0,
      expense: 0,
      amt: 2181,
    },
    {
      name: 'Jul.',
      income: 0,
      expense: 0,
      amt: 2500,
    },
    {
      name: 'Aug.',
      income: 0,
      expense: 0,
      amt: 2100,
    },
    {
      name: 'Sep.',
      income: 0,
      expense: 0,
      amt: 2100,
    },
    {
      name: 'Oct.',
      income: 0,
      expense: 0,
      amt: 2100,
    },
    {
      name: 'Nov.',
      income: 0,
      expense: 0,
      amt: 2100,
    },
    {
      name: 'Dec.',
      income: 0,
      expense: 0,
      amt: 2100,
    },
  ];
  Object.values(account).forEach(
    (val) => {

      if(thisDate.getFullYear() == new Date(val.date).getFullYear()){
        if(val.type == 'income'){
        data[new Date(val.date).getMonth()].income += val.amount
        }
        else if(val.type == 'expenses'){
          data[new Date(val.date).getMonth()].expense += val.amount
        }
    }
    }
  );
  console.log(data)
    return (
      <div className="border border-secondary rounded" style={{'height':'40vh'}}>
          <div className='d-flex flex-row m-3'>
              <h5>รายรับรายจ่ายรายเดือนล่าสุด ปี: {thisDate.getFullYear()}</h5>
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
          <XAxis dataKey="name" />
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
