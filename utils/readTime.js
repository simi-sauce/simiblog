const readingTime = (post) => {
	const noOfWords = post.split(' ').length;

	// if the avg person read 150 words in a minute.
	const WPM = noOfWords / 150;
	return Math.round(WPM) === 0 ? 1 : Math.round(wordsPerMinute);
};

module.exports = { readingTime };
