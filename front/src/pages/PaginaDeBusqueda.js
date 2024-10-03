import React, { useState } from 'react';
import axios from 'axios';
import '../styles/pages/paginaDeBusqueda.css';

function TablaConImagen() { 
  // Estado para la tabla (5 filas y 8 columnas inicialmente)
  const [tableData, setTableData] = useState(Array(5).fill(Array(8).fill('')));
  // Estado para la imagen
  const [image, setImage] = useState(null);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedTableData = tableData.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setTableData(updatedTableData);
  };

  // Maneja la selección de la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('tableData', JSON.stringify(tableData));
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Datos guardados con éxito!');
    } catch (error) {
      console.error(error);
    }

      // Añadir una nueva fila a la tabla
    const addRow = () => {
        const newRow = Array(8).fill(''); // Una nueva fila vacía con 8 columnas
        setTableData([...tableData, newRow]); // Actualizar el estado con la nueva fila
    };



  };

  return (
    <div className='centrar'> 
    <form onSubmit={handleSubmit}>
      <h1 className='h11'>Carga de Acta</h1>
      <hr></hr>

      {/* Input de selección de imagen fuera de la tabla */}
      <div className='subirImagen'>
        <label style={{fontSize:'25px' , color:'#555756'}}> <strong>Subir Imagen del Acta:</strong> </label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{fontSize:'25px' , color:'#555756'}} />
      </div>

      <table style={{ margin: '25px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {/* Encabezados de la tabla */}
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd'}}>Col 1</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd' }}>Col 2</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd' }}>Col 3</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd' }}>Col 4</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd' }}>Col 5</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd'}}>Col 6</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd'}}>Col 7</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid #274d53' , background: '#a4f0fd' }}>Col 8</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{ width: '15px', height: '5px', border: '2px solid #274d53' ,padding:'4px 12px 4px 4px' , background: '#dfdfdf'}}
                >
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
       {/* Botón para añadir una nueva fila */}
      {/* <button type="button" onClick={ addRow} style={{ marginTop: '10px' }}>Añadir Fila</button> */}
      <button type="submit" className='boton'>Guardar Acta</button>

      <hr></hr>
    </form>
    </div>
  );
}

export default TablaConImagen;
