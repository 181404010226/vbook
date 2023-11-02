

document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoFile = document.getElementById('videoFile');
    const subtitleFile = document.getElementById('subtitleFile');
    const subtitleDisplay = document.getElementById('subtitleDisplay');

    let currentHighlightedSubtitleIndex = 0;
    let subtitles = [];

    videoFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        videoPlayer.src = url;
    });

    subtitleFile.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            subtitles = parseSubtitles(e.target.result); 

            // 创建并触发 'subtitlesLoaded' 事件
            const event = new CustomEvent('subtitlesLoaded', { detail: { subtitles } });
            document.dispatchEvent(event);
        };

        reader.readAsText(file);
    });

    videoPlayer.addEventListener('timeupdate', function() {
        const currentTime = videoPlayer.currentTime;
        highlightSubtitle(currentTime);
    });

    document.addEventListener('keydown', function(e) {
        console.log(videoPlayer.currentTime);
        if (e.key === 'w') {
            const previousSubtitle = getPreviousSubtitle(videoPlayer.currentTime);
            if (previousSubtitle) {
                videoPlayer.currentTime = previousSubtitle.start;
                console.log(`now time: ${videoPlayer.currentTime }`);
                console.log(`subtitle time: ${previousSubtitle.start}`);
            }
        } else if (e.key === 's') {
            const nextSubtitle = getNextSubtitle(videoPlayer.currentTime);
            if (nextSubtitle) {
                videoPlayer.currentTime = nextSubtitle.start;
                console.log(`now time: ${videoPlayer.currentTime }`);
                console.log(`subtitle time: ${nextSubtitle.start}`);
   
            }
        } 
        console.log(`Current Highlighted Subtitle Index: ${currentHighlightedSubtitleIndex}`);
       
    });

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
        console.log(`Subtitles: ${subtitles}`);
        return subtitles;  
    }

    function centerHighlightedSubtitle() {
        const subtitleDisplay = document.getElementById('subtitleDisplay');
        const highlightedSubtitle = subtitleDisplay.querySelector('.highlight');
    
        if (highlightedSubtitle) {
            subtitleDisplay.scrollTop = highlightedSubtitle.offsetTop - subtitleDisplay.offsetHeight / 2 + highlightedSubtitle.offsetHeight / 2;
        }
    }

    function highlightSubtitle(time) {
        let subtitleDisplay = document.getElementById('subtitleDisplay');
        let subtitles = subtitleDisplay.children;
        // 区分运行状态和暂停状态
        if (!videoPlayer.paused) {
            for (let i = 0; i < subtitles.length; i++) {
                if (subtitles[i].start <= time && time < subtitles[i].end) {
                    subtitles[i].classList.add('highlight');
                    centerHighlightedSubtitle(); 
                    currentHighlightedSubtitleIndex=i;
                } else {
                    subtitles[i].classList.remove('highlight');
                }
            }
        }
        else{
            for (let i = 0; i < subtitles.length; i++) {
                subtitles[i].classList.remove('highlight');
            }
            subtitles[currentHighlightedSubtitleIndex].classList.add('highlight');
            centerHighlightedSubtitle(); 
        }
    }

    function getPreviousSubtitle(time) {
        return subtitles[--currentHighlightedSubtitleIndex];
    }

    function getNextSubtitle(time) {
        return subtitles[++currentHighlightedSubtitleIndex];
    }

    function hmsToSeconds(hms) {
        let parts = hms.split(/[:|,]/);
        return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2])+(+parts[3])/1000;
    }

});
