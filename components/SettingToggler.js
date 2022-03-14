

import React from 'React';

export default function SettingToggler({ settings, setting, toggleSetting }) {
    const color = settings[setting]?"secondary":"danger"
    return (
        <>
            <button type="button" onClick={() => toggleSetting(setting)} class={`btn btn-outline-${color}`} >{setting}</button>
        </>
    )
}