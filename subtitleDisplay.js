```javascript
// subtitleDisplay.js

document.addEventListener('DOMContentLoaded', function() {
    const subtitleDisplay = document.getElementById('subtitleDisplay');

    function displaySubtitles(subtitles) {
        // Clear the subtitle display
        while (subtitleDisplay.firstChild) {
            subtitleDisplay.removeChild(subtitleDisplay.firstChild);
        }

        // Add each subtitle to the display
        for (let i = 0; i < subtitles.length; i++) {
            let subtitle = document.createElement('div');
            subtitle.textContent = subtitles[i].text;
            subtitle.start = subtitles[i].start;
            subtitle.end = subtitles[i].end;
            subtitleDisplay.appendChild(subtitle);
        }
    }

    // Listen for the 'subtitlesLoaded' event, which is dispatched by main.js
    // when the subtitles have been loaded and parsed.
    document.addEventListener('subtitlesLoaded', function(e) {
        displaySubtitles(e.detail.subtitles);
    });
});
```
