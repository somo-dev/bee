// Copy buttons for code blocks in README
document.addEventListener('DOMContentLoaded', function() {
  // Add copy buttons to all code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((codeBlock, index) => {
    const pre = codeBlock.parentElement;
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      Copy
    `;
    
    // Style the copy button
    copyButton.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: #1f2937;
      color: #f9fafb;
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 12px;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 10;
    `;
    
    // Hover effects
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.background = '#374151';
    });
    
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.background = '#1f2937';
    });
    
    // Copy functionality
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        
        // Show success state
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          Copied!
        `;
        copyButton.style.background = '#059669';
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalText;
          copyButton.style.background = '#1f2937';
        }, 2000);
        
      } catch (err) {
        console.error('Failed to copy: ', err);
        
        // Show error state
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Failed
        `;
        copyButton.style.background = '#dc2626';
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalText;
          copyButton.style.background = '#1f2937';
        }, 2000);
      }
    });
    
    // Make pre container relative for absolute positioning
    pre.style.position = 'relative';
    
    // Show copy button on hover
    pre.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });
    
    pre.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0';
    });
    
    // Add copy button to pre container
    pre.appendChild(copyButton);
  });
});

// Add CSS for better code block styling
const style = document.createElement('style');
style.textContent = `
  pre {
    position: relative;
    background: #1f2937;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    overflow-x: auto;
  }
  
  pre code {
    color: #f9fafb;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .copy-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .copy-button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(style);



