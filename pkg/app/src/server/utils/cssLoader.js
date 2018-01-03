import { normalize } from 'path';

// eslint-disable-next-line import/no-unresolved
import allStyles from '../../styles.json';

const root = normalize(`${__dirname}/../../../`);

const relativeStyles = {};
Object.keys(allStyles).forEach(fullPath => {
	relativeStyles[fullPath.replace('src/', '')] = allStyles[fullPath];
});

require.extensions['.css'] = function cssLoader(m, fileName) {
	const relativePath = fileName.replace(root, '').replace('dist/', '');
	const styles = relativeStyles[relativePath];

	// eslint-disable-next-line no-underscore-dangle
	return m._compile(`module.exports = ${JSON.stringify(styles)}`, fileName);
};
