import React from 'react'

// Komponenten som returnerar fundamental data om vald aktie
export default function FundamentalsTable(props) {
    return (
        <div className="container">
            <table className="table table-striped mt-4">
                <tbody>
                    { props.fundamentals.map((item) =>
                    <tr key={item.key}>
                        <th>{item.name}</th>
                        <td>{item.key}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
