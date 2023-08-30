export const decodePopulatity = (popularity: number) => {
	if (popularity >= 90) {
		return "Very Popular";
	} else if (popularity >= 70) {
		return "Popular";
	} else if (popularity >= 50) {
		return "Average";
	} else if (popularity >= 30) {
		return "Unpopular";
	} else {
		return "Very Unpopular";
	}
};
