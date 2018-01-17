export default function renameId({ _id, ...doc }) {
	return { id: _id, ...doc };
}
