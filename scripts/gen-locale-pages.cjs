const fs = require('fs');
const path = require('path');

const pages = [
  'platform.astro',
  'about.astro',
  'donate.astro',
  'get-involved.astro',
  'interview.astro',
  'privacy.astro',
  'terms.astro',
  'platform/talk.astro',
  'platform/progress.astro',
  'about/journey.astro',
  'get-involved/volunteer.astro',
  'get-involved/business.astro',
  'events/index.astro',
  'events/subscribe.astro',
];

function convert(rel) {
  let src = fs.readFileSync(path.join('src/pages', rel), 'utf8');
  const nest = rel.includes('/');
  if (nest) {
    src = src.replaceAll("from '../../components", "from '../../../components");
    src = src.replaceAll("from '../../utils", "from '../../../utils");
  } else {
    src = src.replaceAll("from '../components", "from '../../components");
    src = src.replaceAll("from '../utils", "from '../../utils");
  }
  src = src.replaceAll("const locale = 'en' as const;", "const locale = 'zh-HK' as const;");
  const dest = path.join('src/pages/zh-HK', rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, src);
  console.log('wrote', dest);
}

for (const rel of pages) convert(rel);

fs.writeFileSync(
  'src/pages/zh-HK/contact.astro',
  `---
import SilentRedirect from '../../layouts/SilentRedirect.astro';
---
<SilentRedirect to="/zh-HK/platform/talk" />
`,
);

const zhCnMap = [
  ['index.astro', '/zh-HK/', '../../layouts/SilentRedirect.astro'],
  ['contact.astro', '/zh-HK/platform/talk', '../../layouts/SilentRedirect.astro'],
  ['blog/index.astro', '/zh-HK/blog', '../../../layouts/SilentRedirect.astro'],
  ['events/index.astro', '/zh-HK/events', '../../../layouts/SilentRedirect.astro'],
];

for (const [file, to, relImport] of zhCnMap) {
  const dest = path.join('src/pages/zh-CN', file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(
    dest,
    `---
import SilentRedirect from '${relImport}';
---
<SilentRedirect to="${to}" />
`,
  );
  console.log('zh-CN', dest, '->', to);
}
