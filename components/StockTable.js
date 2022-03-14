import React from 'React';

export default function StockTable({ stocks }) {
    console.log(stocks)
    return (
        <>
            {stocks && Object.values(stocks).map(stock => {
                const stockData = Object.values(stock)[0];
                return <tr>
                    <th scope="row">{stockData.symbol}</th>
                    <td>{stockData["Market Cap"]}</td>
                </tr>
            })}

        </>
    );
}