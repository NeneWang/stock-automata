

import React from 'React';

export default function SettingToggler({ setting, toggleSetting }) {
    return (
        <>
            <button type="button" onClick={() => toggleSetting(setting)} class="btn btn-outline-secondary" >{setting}</button>
        </>
    )
}