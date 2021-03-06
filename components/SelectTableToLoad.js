

import React from 'React';

export default function SelectTableToLoad({ tables, onSelect }) {
    return (
        <>
            <select onChange={onSelect} className="form-select" aria-label="Select from saved tables">
                <option option={-99} selected>Unsaved</option>
                {tables && tables.map(table => {
                    return <option key={table["id"]} value={table["id"]}>{table["name"]}</option>
                })}
            </select>

        </>
    )
}