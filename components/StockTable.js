import React from 'React';

export default function StockTable({ stocks }) {
    console.log(stocks)
    return (
        <>
            {stocks && stocks.map(stock => {
                return <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                </tr>
            })}

        </>
    );
}