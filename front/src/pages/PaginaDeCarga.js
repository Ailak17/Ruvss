import React, { useState } from 'react';
import '../styles/pages/paginaDeCarga.css'
import axios from 'axios';

function TablaConImagen() {
  // Estado para almacenar la imagen
  const [image, setImage] = useState(null);
  const [tableData, setTableData] = useState(Array(5).fill(Array(8).fill(''))); // Inicializa la tabla vacía

  // Maneja la selección de la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Maneja los cambios en las celdas de la tabla
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedTableData = tableData.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setTableData(updatedTableData);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', image);
    formData.append('tableData', JSON.stringify(tableData));

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Carga de Acta</h1>
      <table style={{ marginLeft:'135px', borderCollapse: 'collapse', justifyContent:'center'}}>
        <thead>
          <tr>
            {/* Encabezados de la tabla */}
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb'}}>Col 1</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb' }}>Col 2</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb' }}>Col 3</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb' }}>Col 4</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb' }}>Col 5</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb'}}>Col 6</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb'}}>Col 7</th>
            <th style={{ width: '150px', height: '5px', border: '2px solid black' , background: '#61dafb' }}>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{ width: '15px', height: '5px', border: '2px solid black' ,padding:'4px 12px 2px 4px' }}
                >
                  {/* Muestra el campo para subir la imagen solo en la última celda de la primera fila */}
                  {colIndex === 7 && rowIndex === 0 ? (
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  ) : (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <button type="submit" >Guardar Acta</button>
    </form>
  );
}

export default TablaConImagen;
