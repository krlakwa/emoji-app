Hi there! 😃

The React application is very simple with basic styling. The main logic of the application is in `getMatchingEmojis` function. It gets a string and emojis data and returned emojis that corresponds to searched query.
The data format looks like:

```json
{
  "😀": {
    "name": "grinning face",
    "category": "Smileys & Emotion"
  },
  "😃": {
    "name": "grinning face with big eyes",
    "category": "Smileys & Emotion"
  }
}
```

Each emoji is an object key and it's value consist name and category. The data corresponds to official Unicode docucumentation which you can find [there](https://unicode.org/Public/emoji/15.0/emoji-test.txt).

At first function sanitizes inputString and the result is array of inputed words. All of them are lowercase, comas are removed so user is allowed to type search quary in both ways with and without comas. At this point `sanitizeSearchQuery` function checks if there are any smiles/faces (e.g. :) or :P) in the string and converts it to corresponding word description.

Then there is matching emojis search. Function iterates through input words array inside of it there are two another iterations through to look for a fitted words in emoji names and categories. I am not proud of using tested loops and if I had more time I would look for a solution to get rid of that. Function counts how much matching words are in emoji name and category and based on that accuration rate is calculated.

Matching emojis are returned as an array of objects which contains emoji, unicode, and accuration rate. And the end function returns `matchingEmojis` array sorted by accurationRate
