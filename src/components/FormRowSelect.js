const FormRowSelect = ({labelText,name,value,handleChange,list}) =>{
    return(
        <div className='form-row'>
            <lable htmlFor={name} className='form-label'>
                {labelText||name}
            </lable>
            <select 
            name={name}
            id={name}
            // id + htmlFor in label both combine give select outline css
            value={value}
            onChange={handleChange}
            className="form-select"
            >
                {list.map((itemValue,index)=>{
                    return(
                        <option key={index} value={itemValue}>
                            {itemValue}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}

export default FormRowSelect;