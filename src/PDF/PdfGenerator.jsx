import React from 'react';
import { jsPDF } from 'jspdf';
import './PdfGenerator.css';
import constructImage from '../images/construct.png'; // Update the path accordingly
import { Button } from '@mui/material';

function PdfGenerator() {
  const jspdf = new jsPDF('p', 'pt', 'letter');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = e.target.txt.value;

    const data = {
      callback: function (jspdf) {
        jspdf.save('demo.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
    };

    const image = new Image();
    image.src = constructImage;

    const h5Content = document.querySelector('h5').innerText.replace(/\n/g, ' ');

    // to display the words headings etc continuous in a line , Use <span> with the properties whitespace nowrap etc.

    const formattedContent = `<div style="font-family: 'Times New Roman'; font-style: italic; font-size: 16px;"><span style="white-space: nowrap;">${h5Content}</span></div><br/><span style="white-space: nowrap;">${val}</span><br/><img src="${image.src}" />`;

    jspdf.html(formattedContent, data);
  };

  return (
    <div>
      <h5>Print Report</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea  className="txt" name="txt" />
        <Button type="submit" variant="contained">
          Generate
        </Button>
      </form>
    </div>
  );
}

export default PdfGenerator;
