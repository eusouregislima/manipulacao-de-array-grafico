import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Chart } from "react-google-charts";
import "./style.css";

export const options = {
  title: "População Masc e Fem por Estado",
  chartArea: { width: "50%" },
  hAxis: {
    title: "População",
    minValue: 0,
  },
  vAxis: {
    title: "Estado",
  },
};

export const optionsOne = {
  is3D: true,
};

function App() {
  const [chartData, setChartData] = useState([]);
  const [chartDataTwo, setChartDataTwo] = useState([]);

  const loadData = (data) => {
    const values = _.groupBy(data, (value) => value.manufacturer);

    console.log(values);

    const result = _.map(values, (value, key) => [
      key,
      _.sumBy(values[key], (v) => v.sales),
    ]);

    console.log(result);

    return [["Fabricante", "Vendas"], ...result];
  };

  //Quero mostrar Estado, Popmasc, Popfem
  const loadDataTwo = (data) => {
    const values = _.groupBy(data, (value) => value.Estado); // agrupando por estados
    console.log(values); // vendo no console o novo array separado em estados

    const result = _.map(values, (value, key) => [
      //passando ítem a ítem
      key, // é o nome do estado
      _.sumBy(values[key], (v) => v.PopMasculina), //somando a população masculina
      _.sumBy(values[key], (v) => v.PopFeminina), //somando a população feminina
    ]);
    console.log(result); // vendo no console o array no formato final

    //agora formatando o array para a leitura final e montagem do gráfico

    return [["Estado", "PopMasculina", "PopFeminina"], ...result];
  };

  useEffect(() => {
    const dataTwo = [
      {
        Estado: "São Paulo",
        Cidade: "Teste1",
        PopMasculina: 300000,
        PopFeminina: 3000,
      },
      {
        Estado: "São Paulo",
        Cidade: "Teste2",
        PopMasculina: 150000,
        PopFeminina: 10000,
      },
      {
        Estado: "São Paulo",
        Cidade: "Teste3",
        PopMasculina: 175000,
        PopFeminina: 5000,
      },
      {
        Estado: "Minas Gerais",
        Cidade: "Teste4",
        PopMasculina: 200252,
        PopFeminina: 10000,
      },
      {
        Estado: "Minas Gerais",
        Cidade: "Teste5",
        PopMasculina: 70800,
        PopFeminina: 10000,
      },
      {
        Estado: "Minas Gerais",
        Cidade: "Teste6",
        PopMasculina: 42588,
        PopFeminina: 100000,
      },
      {
        Estado: "Rio de Janeiro",
        Cidade: "Teste7",
        PopMasculina: 200000,
        PopFeminina: 50000,
      },
      {
        Estado: "Rio de Janeiro",
        Cidade: "Teste8",
        PopMasculina: 475000,
        PopFeminina: 700000,
      },
      {
        Estado: "Rio de Janeiro",
        Cidade: "Teste9",
        PopMasculina: 90052,
        PopFeminina: 200000,
      },
      {
        Estado: "Paraná",
        Cidade: "Teste10",
        PopMasculina: 15814,
        PopFeminina: 100000,
      },
      {
        Estado: "Paraná",
        Cidade: "Teste11",
        PopMasculina: 16225,
        PopFeminina: 100000,
      },
      {
        Estado: "Paraná",
        Cidade: "Teste12",
        PopMasculina: 190000,
        PopFeminina: 100000,
      },
      {
        Estado: "Paraná",
        Cidade: "Teste13",
        PopMasculina: 154232,
        PopFeminina: 10000,
      },
      {
        Estado: "Paraná",
        Cidade: "Teste14",
        PopMasculina: 100000,
        PopFeminina: 10000,
      },
    ];

    setChartDataTwo(loadDataTwo(dataTwo));
  }, []);

  useEffect(() => {
    const data = [
      { manufacturer: "Ford", model: "Ka", sales: 3 },
      { manufacturer: "Ford", model: "Fiesta", sales: 10 },
      { manufacturer: "Ford", model: "Focus", sales: 5 },
      { manufacturer: "Ford", model: "Mustang", sales: 1 },
      { manufacturer: "Honda", model: "Civic", sales: 10 },
      { manufacturer: "Honda", model: "Fit", sales: 50 },
      { manufacturer: "Toyota", model: "Corola", sales: 70 },
      { manufacturer: "Toyota", model: "Etios", sales: 20 },
      { manufacturer: "volks", model: "Gol", sales: 100 },
    ];

    setChartData(loadData(data));
  }, []);

  return (
    <>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={chartDataTwo}
        options={options}
      />
      <div>
        <h1>Gráfico de pizza</h1>
        <Chart
          chartType="PieChart"
          data={chartData}
          options={optionsOne}
          width={"80%"}
          height={"400px"}
        />
      </div>
    </>
  );
}

export default App;
