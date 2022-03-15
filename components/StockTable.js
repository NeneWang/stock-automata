import React from 'React';

export default function StockTable({ stocks, settings }) {
    console.log("this is the stocks information")
    console.log(stocks)
    return (
        <><table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Symbol</th>
                    {settings && Object.keys(settings).map(
                        // console.log(setting)
                        setting => {
                            return <th key={settings[setting]} scope="col">{settings[setting] && setting}</th>
                        }
                    )}
                </tr>
            </thead>
            <tbody>

                {stocks && Object.values(stocks).map(stock => {
                    const stockData = Object.values(stock)[0];
                    return <tr key={stock} >
                        <th scope="row">{stockData.symbol}</th>
                        {settings && Object.keys(settings).map(
                            // console.log(setting)
                            setting => {
                                return <th key={stockData.symbol} scope="col">
                                    {settings[setting] &&
                                    <td key={settings[setting]+stockData.symbol}>{stockData[setting]}</td>}</th>
                            }
                        )}
                    </tr>
                })}
            </tbody>
        </table>

        </>
    );
}