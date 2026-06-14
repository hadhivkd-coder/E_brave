import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';
import { createRoot } from 'react-dom/client';
import PremiumDossierTemplate from './PremiumDossierTemplate';

/**
 * Generates a Premium Counselor Dossier PDF using html2canvas and jsPDF.
 * Returns a strict HTML5 Blob (ArrayBuffer backed) suitable for Supabase Storage.
 */
export const generateDossierPDF = async (studentInfo, assessmentData) => {
  return new Promise((resolve, reject) => {
    const executeGeneration = async () => {
      try {
      // 1. Create a temporary container
      const container = document.createElement('div');
      // Hide it completely from viewport
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.zIndex = '-1000';
      document.body.appendChild(container);

      // 2. Mount the Premium React Template
      const root = createRoot(container);
      
      // We wrap the render in a Promise to wait for React to flush to DOM
      await new Promise((renderResolve) => {
        root.render(
          <div id="pdf-render-root">
            <PremiumDossierTemplate studentInfo={studentInfo} assessmentData={assessmentData} />
          </div>
        );
        // Give React a moment to render the DOM nodes
        setTimeout(renderResolve, 300);
      });

      // 3. Initialize jsPDF (A4)
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const a4WidthMm = 210;
      const a4HeightMm = 297;

      // 4. Capture pages sequentially
      const pages = ['dossier-page-1', 'dossier-page-2', 'dossier-page-3', 'dossier-page-4', 'dossier-page-5'];
      
      for (let i = 0; i < pages.length; i++) {
        const pageElement = document.getElementById(pages[i]);
        
        if (!pageElement) {
          console.error(`Page element ${pages[i]} not found.`);
          continue;
        }

        // Capture with high scale for premium print quality
        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        if (i > 0) {
          doc.addPage();
        }

        doc.addImage(imgData, 'JPEG', 0, 0, a4WidthMm, a4HeightMm);
      }

      // 5. Cleanup DOM
      root.unmount();
      document.body.removeChild(container);

      // 6. Generate the robust HTML5 Blob (Bypassing the jsPDF Blob serialization bug)
      const arrayBuffer = doc.output('arraybuffer');
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });

      resolve(pdfBlob);

    } catch (err) {
      console.error("Fatal error generating PDF:", err);
      reject(err);
    }
    };
    
    executeGeneration();
  });
};

/**
 * Generates the premium 30-page Student & Parent Report PDF using html2canvas and jsPDF.
 */
import StudentReportTemplate from './StudentReport/StudentReportTemplate';

export const generateStudentPDF = async (studentInfo, assessmentData, progressCallback) => {
  return new Promise((resolve, reject) => {
    const executeGeneration = async () => {
      try {
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '-9999px';
        container.style.left = '-9999px';
        container.style.zIndex = '-1000';
        document.body.appendChild(container);

        const root = createRoot(container);
        
        await new Promise((renderResolve) => {
          root.render(
            <div id="student-pdf-render-root">
              <StudentReportTemplate studentInfo={studentInfo} assessmentData={assessmentData} />
            </div>
          );
          setTimeout(renderResolve, 500); // Need slightly longer for 30 pages
        });

        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const widthMm = 210;
        const heightMm = 297;

        const totalPages = 31;
        
        for (let i = 1; i <= totalPages; i++) {
          const pageId = `student-page-${i}`;
          const pageElement = document.getElementById(pageId);
          
          if (!pageElement) {
            console.error(`Page element ${pageId} not found.`);
            continue;
          }

          if (progressCallback) {
            progressCallback({ current: i, total: totalPages, status: `Rendering page ${i} of ${totalPages}...` });
          }

          const canvas = await html2canvas(pageElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FAFAFA'
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95);

          if (i > 1) {
            doc.addPage();
          }

          doc.addImage(imgData, 'JPEG', 0, 0, widthMm, heightMm);
        }

        if (progressCallback) {
          progressCallback({ current: totalPages, total: totalPages, status: 'Finalizing PDF...' });
        }

        root.unmount();
        document.body.removeChild(container);

        const arrayBuffer = doc.output('arraybuffer');
        const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });

        resolve(pdfBlob);

      } catch (err) {
        console.error("Fatal error generating Student PDF:", err);
        reject(err);
      }
    };
    
    executeGeneration();
  });
};
