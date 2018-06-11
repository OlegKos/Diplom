import React from 'react'


export default function DataTable(props) {
    return <div className='table_row'>
        <div className='table_column'>{props.data.time}</div>
        <div className='table_column'>{props.data.turn_type}</div>
        <div className='table_column'>{props.data.type}</div>
    </div>
}
