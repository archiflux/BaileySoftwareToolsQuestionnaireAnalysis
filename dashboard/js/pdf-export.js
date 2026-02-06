/**
 * PDF Export functionality for Bailey Partnership Software Survey Dashboard
 * Generates a PDF that looks exactly like the dashboard at 1600px width
 */

(function() {
  'use strict';

  const PDF_WIDTH = 1600; // Target width in pixels
  const PDF_FILENAME = 'Bailey-Partnership-Software-Survey-Report.pdf';

  /**
   * Initialize PDF export functionality
   */
  function init() {
    const downloadBtn = document.getElementById('downloadPdfBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', generatePDF);
    }
  }

  /**
   * Generate PDF from the dashboard
   */
  async function generatePDF() {
    const btn = document.getElementById('downloadPdfBtn');
    const originalBtnText = btn.innerHTML;

    try {
      // Update button state
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
            <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
        Generating PDF...
      `;

      // Get the main content
      const mainContent = document.querySelector('.main-content');
      if (!mainContent) {
        throw new Error('Main content not found');
      }

      // Store original styles
      const originalStyles = {
        sidebar: document.querySelector('.nav-sidebar')?.style.cssText || '',
        metadataBar: document.querySelector('.metadata-bar')?.style.cssText || '',
        mainContent: mainContent.style.cssText || '',
        body: document.body.style.cssText || ''
      };

      // Hide sidebar and metadata bar for PDF
      const sidebar = document.querySelector('.nav-sidebar');
      const metadataBar = document.querySelector('.metadata-bar');

      if (sidebar) sidebar.style.display = 'none';
      if (metadataBar) metadataBar.style.display = 'none';

      // Set fixed width for consistent rendering
      mainContent.style.marginLeft = '0';
      mainContent.style.width = PDF_WIDTH + 'px';
      mainContent.style.maxWidth = PDF_WIDTH + 'px';
      mainContent.style.padding = '40px';
      document.body.style.width = PDF_WIDTH + 'px';

      // Wait for any re-renders
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture the content
      const canvas = await html2canvas(mainContent, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        width: PDF_WIDTH,
        windowWidth: PDF_WIDTH,
        backgroundColor: '#ffffff'
      });

      // Restore original styles
      if (sidebar) sidebar.style.cssText = originalStyles.sidebar;
      if (metadataBar) metadataBar.style.cssText = originalStyles.metadataBar;
      mainContent.style.cssText = originalStyles.mainContent;
      document.body.style.cssText = originalStyles.body;

      // Calculate PDF dimensions (A4 proportions)
      const { jsPDF } = window.jspdf;
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with automatic page breaks
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save(PDF_FILENAME);

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Restore button state
      btn.disabled = false;
      btn.innerHTML = originalBtnText;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
