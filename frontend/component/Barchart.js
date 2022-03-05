import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export const Barchart = (account) => {
  const thisDate = new Date();
  const day1 =  new Date(thisDate.getTime()- 24*60*60*1000);
  const day2 =  new Date(thisDate.getTime()- (24*60*60*1000*2));
  const day3 =  new Date(thisDate.getTime()- (24*60*60*1000*3));
  const day4 =  new Date(thisDate.getTime()- (24*60*60*1000*4));
  const day5 =  new Date(thisDate.getTime()- (24*60*60*1000*5));
  const day6 =  new Date(thisDate.getTime()- (24*60*60*1000*6));
  const data = [
    {
      name: ("0"+day6.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 0,
    },
    {
      name: ("0"+day5.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2210,
    },
    {
      name: ("0"+day4.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2290,
    },
    {
      name: ("0"+day3.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2290,
    },
    {
      name: ("0"+day2.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2000,
    },
    {
      name: ("0"+day1.getDate()).slice(-2)+"/"+("0"+(day1.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2181,
    },
    {
      name: ("0"+thisDate.getDate()).slice(-2)+"/"+("0"+(thisDate.getMonth()+1)).slice(-2),
      income: 0,
      expense: 0,
      amt: 2181,
    },
  ]
  Object.values(account).forEach(
    (val) => {
      let checkDate = new Date(val.date).getDate()+new Date(val.date).getMonth()+new Date(val.date).getFullYear()
      if(checkDate == thisDate.getDate()+thisDate.getMonth()+thisDate.getFullYear()) {
        if(val.type == 'income'){
        data[6].income += val.amount
        }
        else if(val.type == 'expenses'){
          data[6].expense += val.amount
        }
    }
    else if(checkDate == day1.getDate()+day1.getMonth()+day1.getFullYear()) {
      if(val.type == 'income'){
      data[5].income += val.amount
      }
      else if(val.type == 'expenses'){
        data[5].expense += val.amount
      }
  }
  else if(checkDate == day2.getDate()+day2.getMonth()+day2.getFullYear()) {
    if(val.type == 'income'){
    data[4].income += val.amount
    }
    else if(val.type == 'expenses'){
      data[4].expense += val.amount
    }
}
else if(checkDate == day3.getDate()+day3.getMonth()+day3.getFullYear()) {
  if(val.type == 'income'){
  data[3].income += val.amount
  }
  else if(val.type == 'expenses'){
    data[3].expense += val.amount
  }
}
else if(checkDate == day4.getDate()+day2.getMonth()+day2.getFullYear()) {
  if(val.type == 'income'){
  data[2].income += val.amount
  }
  else if(val.type == 'expenses'){
    data[2].expense += val.amount
  }
}
else if(checkDate == day5.getDate()+day2.getMonth()+day2.getFullYear()) {
  if(val.type == 'income'){
  data[1].income += val.amount
  }
  else if(val.type == 'expenses'){
    data[1].expense += val.amount
  }
}
else if(checkDate == day6.getDate()+day2.getMonth()+day2.getFullYear()) {
  if(val.type == 'income'){
  data[0].income += val.amount
  }
  else if(val.type == 'expenses'){
    data[0].expense += val.amount
  }
}
    }
  );

  

  return (
    <div className="border border-secondary rounded" style={{ height: "40vh" }}>
      <div className="d-flex flex-row m-3">
        <h5>รายรับรายจ่ายรายวัน 7 วันล่าสุด ปี: {thisDate.getFullYear()}</h5>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={"100%"}
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
          <YAxis domain={[0, 1000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#82ca9d" />
          <Bar dataKey="expense" fill="#FF6962" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
