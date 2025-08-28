// Test CSS import from @bee-ui/core
const path = require('path');

try {
  // Test importing styles.css
  const stylesPath = require.resolve('@bee-ui/core/styles.css');
  console.log('✅ styles.css import works:', stylesPath);
  
  // Test importing index.css
  const indexPath = require.resolve('@bee-ui/core/index.css');
  console.log('✅ index.css import works:', indexPath);
  
  // Test importing components
  const { Button, Input } = require('@bee-ui/core');
  console.log('✅ Components import works:', { Button, Input });
  
  console.log('\n🎉 All imports working correctly!');
  
} catch (error) {
  console.error('❌ Import failed:', error.message);
}
