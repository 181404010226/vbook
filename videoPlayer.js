```javascript
// This function should parse the subtitle file and return an array of subtitles.
// Each subtitle should be an object with 'start', 'end', and 'text' properties.
function parseSubtitles(data) {
    let subtitles = [];
    let lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let time = lines[i].split(' --> ');
        if (time.length == 2) {
            let start = hmsToSeconds(time[0]);
            let end = hmsToSeconds(time[1]);
            let text = lines[i + 1];
            subtitles.push({start, end, text});
            i++;
        }
    }
    return subtitles;
}

// This function should find the subtitle for the current time and highlight it in the subtitle display.
function highlightSubtitle(time) {
    let subtitleDisplay = document.getElementById('subtitleDisplay');
    let subtitles = subtitleDisplay.children;
    for (let i = 0; i < subtitles.length; i++) {
        if (subtitles[i].start <= time && time <= subtitles[i].end) {
            subtitles[i].classList.add('highlight');
        } else {
            subtitles[i].classList.remove('highlight');
        }
    }
}

// This function should return the previous subtitle for the given time.
function getPreviousSubtitle(time) {
    let subtitles = document.getElementById('subtitleDisplay').children;
    for (let i = 1; i < subtitles.length; i++) {
        if (subtitles[i].start > time) {
            return subtitles[i - 1];
        }
    }
    return null;
}

// This function should return the next subtitle for the given time.
function getNextSubtitle(time) {
    let subtitles = document.getElementById('subtitleDisplay').children;
    for (let i = 0; i < subtitles.length - 1; i++) {
        if (subtitles[i].start > time) {
            return subtitles[i];
        }
    }
    return null;
}

// Helper function to convert h:m:s to seconds
function hmsToSeconds(hms) {
    let parts = hms.split(':');
    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
}
```
