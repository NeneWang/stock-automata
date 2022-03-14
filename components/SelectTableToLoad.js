

import React from 'React';

export default function SelectTableToLoad({ tables }) {
    return (
        <>
            <select class="form-select" aria-label="Select from saved tables">
                <option selected>Unsaved</option>
                {tables && tables.map(table => {
                    return <option value={table["id"]}>{table["name"]}</option>
                })}
            </select>

        </>
    )
}