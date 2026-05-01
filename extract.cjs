const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

try {
  console.log('Extracting frames using ffmpeg:', ffmpeg);
  execSync(`"${ffmpeg}" -y -i "C:/Users/geosi/Downloads/frames/frame_%03d.jpg" -filter_complex "tile=8x6" "C:/Users/geosi/Downloads/collage.jpg"`, { stdio: 'inherit' });
  console.log('Extraction complete');
} catch(e) {
  console.error(e);
}
