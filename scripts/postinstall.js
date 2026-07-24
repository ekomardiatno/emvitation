const fs = require('fs');
const path = require('path');

// Patch react-native-navigation-bar-color to remove jcenter() (removed in Gradle 9.x)
const navBarGradle = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-navigation-bar-color',
  'android',
  'build.gradle',
);

if (fs.existsSync(navBarGradle)) {
  let content = fs.readFileSync(navBarGradle, 'utf8');
  if (content.includes('jcenter()')) {
    content = content.replace(
      /buildscript\s*\{[\s\S]*?\n\}\n*/,
      '',
    );
    content = content.replace('lintOptions', 'lint');
    fs.writeFileSync(navBarGradle, content);
    console.log('Patched react-native-navigation-bar-color: removed jcenter()');
  }
}
