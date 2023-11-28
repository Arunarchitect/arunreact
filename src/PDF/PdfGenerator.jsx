// PdfGenerator.js

import React from 'react';
import { jsPDF } from 'jspdf';
import './PdfGenerator.css';
import constructImage from '../images/construct.png'; // Update the path accordingly
import { Button } from '@mui/material';

function PdfGenerator({ displayedValue }) {
  const jspdf = new jsPDF('p', 'pt', 'letter');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      callback: function (jspdf) {
        jspdf.save('demo.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
    };

    const image = new Image();
    image.src = constructImage;

    const h5Element = document.querySelector('h5');
    const h5Content = h5Element ? h5Element.innerText.replace(/\n/g, ' ') : '';

    // Rest of the code...


    // Include the displayedValue in the formatted content
    const formattedContent = `<div style="font-family: 'Times New Roman'; font-style: italic; font-size: 16px;"><span style="white-space: nowrap;">${h5Content}</span></div><br/><p>Project Gist: ${displayedValue}</p><img src="${image.src}" />`;

    jspdf.html(formattedContent, data);
  };

  return (
    <div>
      {/* Removed unnecessary elements */}
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Generate PDF
      </Button>
    </div>
  );
}

export default PdfGenerator;
