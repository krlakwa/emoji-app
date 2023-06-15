function sanitizeSearchQuery(search) {
  const emotions = {
    ':)': 'slightly smiling face',
    ';)': 'wink',
    ':d': 'smile',
    ':p': 'tongue',
    ';p': 'tongue wink',
  }
  return Boolean(emotions[search]) ? emotions[search] : search
}

export function getMatchingEmojis(inputString, emojisData) {
  const inputWords = inputString
    .toLowerCase()
    .split(' ')
    .map(sanitizeSearchQuery)
    .join(' ')
    .split(' ')

  const matchingEmojis = Object.entries(emojisData).reduce(
    (acc, [emoji, params]) => {
      const desctiptionMatchingWords = inputWords.reduce((acc, word) => {
        return params.name.toLowerCase().includes(word) ? acc + 1 : acc
      }, 0)
      const categoryMatchingWords = inputWords.reduce((acc, word) => {
        return params.category.toLowerCase().includes(word) ? acc + 1 : acc
      }, 0)

      return desctiptionMatchingWords + categoryMatchingWords > 0
        ? [
            ...acc,
            {
              emoji: emoji,
              unicode: `0x${emoji.codePointAt(0).toString(16)}`,
              accurationRate:
                (desctiptionMatchingWords * 0.75 +
                  categoryMatchingWords * 0.25) /
                inputWords.length,
            },
          ]
        : acc
    },
    []
  )
  return matchingEmojis.sort((a, b) => b.accurationRate - a.accurationRate)
}
