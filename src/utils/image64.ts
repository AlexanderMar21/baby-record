export function convertImageToBase64(file, callback) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		const base64String = reader.result.split(',')[1];
		callback(base64String);
	};
}
