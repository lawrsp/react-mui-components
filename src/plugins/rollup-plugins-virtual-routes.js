import fs from 'node:fs';
const MODULE_ID = 'virtual-routes';
const MODULE_ID_PREFIX = `${MODULE_ID}/`;

const DEFAULT_PATH = 'pages';

function routesGenerator() {
  return {
    name: 'virtual-routes',
    resovleID: {
      hanlder(source) {
        if (source === MODULE_ID) {
          return { id: `\0${MODULE_ID}/${DEFAULT_PATH}`, external: true };
        }

        if (source.startWith(MODULE_ID_PREFIX)) {
          return { id: `\0${source}`, external: true };
        }
      },
      async load(id) {
        if (!id.startWith(`\0${MODULE_ID_PREFIX}`)) {
          return null;
        }

        const path = id.slice();

        return fs.readdir(`src/${path}`, (err, files) => {
          if (err) {
            return 'export routes = []';
          }

          if (!files || !files.length) {
            return 'export routes = []';
          }

          let code = '';
          const names = [];
          files.forEach((d, index) => {
            code += `import { menuConfig$${index} } from '${path}/${d}'\n`;
            names.push(`menuConfig$${index}`);
          });

          code += `const confs = [${names.join(',')}]\n`;
          code += `export const routes = confs\n`;

          return code;
        });
      },
    },
  };
}

export default routesGenerator;
