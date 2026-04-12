import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const [type, slugArg] = process.argv.slice(2);
const validTypes = new Set(['project', 'service', 'area']);

if (!validTypes.has(type) || !slugArg) {
  console.log('Usage:');
  console.log('  npm run new:project -- my-new-project');
  console.log('  npm run new:service -- custom-kitchens');
  console.log('  npm run new:area -- bondi-junction');
  process.exit(1);
}

const slug = slugArg.trim().toLowerCase();
const config = {
  project: {
    template: path.join(projectRoot, 'src', 'content', 'templates', 'project-template.json'),
    destination: path.join(projectRoot, 'src', 'content', 'projects', `${slug}.json`),
    replacements: [
      ['new-project-slug', slug],
      ['New Project Title', toTitle(slug)],
      ['Suburb or Short Name', toTitle(slug)],
      ['Suburb', toTitle(slug)],
      ['/uploads/project-hero.jpg', `/uploads/${slug}-hero.jpg`],
      ['/uploads/project-after-1.jpg', `/uploads/${slug}-after-1.jpg`],
      ['/uploads/project-before-1.jpg', `/uploads/${slug}-before-1.jpg`],
      ['/uploads/project-space-1.jpg', `/uploads/${slug}-space-1.jpg`],
    ],
  },
  service: {
    template: path.join(projectRoot, 'src', 'content', 'templates', 'service-template.json'),
    destination: path.join(projectRoot, 'src', 'content', 'services', `${slug}.json`),
    replacements: [
      ['new-service-slug', slug],
      ['Service Navigation Label', toTitle(slug)],
      ['Service Title', toTitle(slug)],
      ['/uploads/service-hero.jpg', `/uploads/${slug}-hero.jpg`],
      ['/uploads/service-before.jpg', `/uploads/${slug}-before.jpg`],
      ['/uploads/service-after.jpg', `/uploads/${slug}-after.jpg`],
      ['Service Page Title', `${toTitle(slug)} Sydney`],
    ],
  },
  area: {
    template: path.join(projectRoot, 'src', 'content', 'templates', 'area-template.json'),
    destination: path.join(projectRoot, 'src', 'content', 'areas', `${slug}.json`),
    replacements: [
      ['new-suburb-slug', slug],
      ['Suburb Name', toTitle(slug)],
      ['/uploads/suburb-hero.jpg', `/uploads/${slug}-hero.jpg`],
      ['Custom Joinery & Renovations Suburb', `Custom Joinery & Renovations ${toTitle(slug)}`],
    ],
  },
};

const task = config[type];
if (fs.existsSync(task.destination)) {
  console.error(`That file already exists: ${path.relative(projectRoot, task.destination)}`);
  process.exit(1);
}

let content = fs.readFileSync(task.template, 'utf8');
for (const [searchValue, replaceValue] of task.replacements) {
  content = content.split(searchValue).join(replaceValue);
}
fs.writeFileSync(task.destination, `${content}\n`, 'utf8');
console.log(`Created ${path.relative(projectRoot, task.destination)}`);
console.log('Next steps: update the placeholder text, add your images to public/uploads/, run npm run check:content, then npm run dev.');

function toTitle(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
