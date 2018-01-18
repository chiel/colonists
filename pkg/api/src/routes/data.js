import chits from '../chits';

export function dataChitsHandler(req, res) {
	res.json(chits);
}
