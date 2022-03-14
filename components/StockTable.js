import React from 'React';

export default function StockTable({ stocks, settings }) {
    console.log(stocks)
    return (
        <><table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Symbol</th>
                    {settings && Object.keys(settings).map(
                        // console.log(setting)
                        setting => {
                            return <th scope="col">{settings[setting] && setting}</th>
                        }
                    )}
                </tr>
            </thead>
            <tbody>

                {stocks && Object.values(stocks).map(stock => {
                    const stockData = Object.values(stock)[0];
                    return <tr>
                        <th scope="row">{stockData.symbol}</th>
                        <td>{stockData["Market Cap"]}</td>
                    </tr>
                })}
            </tbody>
        </table>

        </>
    );
}