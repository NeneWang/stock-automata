import React from 'React';

export default function StockTable({ stocks, settings }) {
    console.log("this is the stocks information")
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
                        {settings && Object.keys(settings).map(
                            // console.log(setting)
                            setting => {
                                return <th scope="col">{settings[setting] &&
                                    <td>{stockData[setting]}</td>}</th>
                            }
                        )}
                    </tr>
                })}
            </tbody>
        </table>

        </>
    );
}