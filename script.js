const AUDIO_BASE_URL = "https://github.com/syedalizain1671-hue/spotify-frontend-UI/releases/download/v1.0/";
let currentSong = new Audio();
let songs;
let currFolder;

// Hardcoded song database for static hosting compatibility
const musicCatalog = {
    "my playlist": {
        title: "My Playlist",
        description: "Quick access to all saved songs",
        cover: "songs/my playlist/cover.jpg",
        songs: [
            "Ali-Janam.Khuda.Razi.mp3",
            "Assalamu.Alaika.mp3",
            "JaanamFida-e-Haideri.mp3",
            "Kon.Anta.mp3",
            "Musnad.e.ahmad.Hadees.no.648.mp3",
            "Sahih.muslim.hadees.panjtan.pak.mp3",
            "Muhammad.Nabina.mp3",
            "Tasbihat-e-Hazrat-Zehra.mp3",
            "The-way-of-the-tears.mp3",
            "Wal-khat-u-hussaini-lyrics.mp3",
            "Ya_Nabi_Salam_Aleyka.mp3",
            "Wedding-Nasheed.mp3"
        ]
    },
    "quran": {
        title: "Quran Recitations",
        description: "Peaceful Recitations",
        cover: "songs/quran/cover.jpg",
        songs: [
            "Surah.Rahman.mp3",
            "Surah.Takasur.mp3",
            "Surah.Al-Adiyat.mp3",
            "Surah.AL-Mominoon.mp3",
            "Surah.Ikhlas.mp3",
            "Surah.Mulk.mp3",
        ]
    },
    "hadees": {
        title: "Al-Hadith",
        description: "Guidance to right way",
        cover: "songs/hadees/cover.jpg",
        songs: [
            "Gadir.e.khum.hadees.mp3",
            "Importance.Of.Namaz.mp3",
            "Musnad.e.ahmad.Hadees.no.648.mp3",
            "Sahih.muslim.hadees.panjtan.pak.mp3",
            "Sahih.muslim.hadess.6217.mp3",
            "Why.youth.is.unpracticed.mp3"
        ]
    },

    "cs": {
        title: "Beautiful Naatts",
        description: "Relax your soul",
        cover: "songs/cs/cover.jpg",
        songs: [
            "Assalamu.Alaika.mp3",
            "Muhammad.Nabina.mp3",
            "Mustafa.jaan-e-rehmat.mp3",
            "Ya_Nabi_Salam_Aleyka.mp3",
        ]
    },
    "nasheed": {
        title: "Nasheed Collection",
        description: "Vocal & Peaceful Nasheeds",
        cover: "songs/nasheed/cover.jpg",
        songs: [
            "Kon.Anta.mp3",
            "Tabsirah.Nasheed.mp3",
            "Taweel.Al.Shawq.mp3",
            "The-way-of-the-tears.mp3",
            "Wedding-Nasheed.mp3"
        ]
    },
    "ertugrul": {
        title: "Ertugrul Gazi",
        description: "Historical Turkish Series Soundtrack",
        cover: "songs/ertugrul/cover.jpg",
        songs: [
            "Ertugrul-theme-song.mp3"
        ]
    },
    "hamid": {
        title: "Sovereign Echoes",
        description: "Imperical Turkish Soundtrack",
        cover: "songs/hamid/cover.jpg",
        songs: [
            "Payithat_Abdul_Hamid.mp3",
            "Plevne_Abdul_Hamid.mp3"
        ]
    },
    "ncs": {
        title: "Pakistan Army Song",
        description: "Patriotics Anthems",
        cover: "songs/ncs/cover.jpg",
        songs: [
            "Hawa-Ka-Sipahi-Hoon.mp3",
            "Pakistan.Army.song.mp3"
        ]
    },
    "noha": {
        title: "Noha Collection",
        description: "Rememberance of Karbala",
        cover: "songs/noha/cover.jpg",
        songs: [
            "Ali-Janam.Khuda.Razi.mp3",
            "JaanamFida-e-Haideri.mp3",
            "Tasbihat-e-Hazrat-Zehra.mp3",
            "Wal-khat-u-hussaini-lyrics.mp3"
        ]
    },
    "osman": {
        title: "Ottoman Dawn",
        description: "Conqueror Anthems",
        cover: "songs/osman/cover.jpg",
        songs: [
            "Kurulu_Osman_muzikleri.mp3"
        ]
    },
    "turkish": {
        title: "Turkish & Instrumental",
        description: "Popular Turkish Tracks",
        cover: "songs/turkish/cover.jpg",
        songs: [
            "Hsn_Enlendirici_Since.mp3",
            "Serhat_Durmus.mp3",
            "Serhat_Durmus_Zerrin.mp3"
        ]
    }
};

// Second to seconds:minutes convert function
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    minutes = String(minutes).padStart(2, "0");
    remainingSeconds = String(remainingSeconds).padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let folderKey = folder.split("/").pop();

    // Retrieve songs array from catalog safely
    songs = musicCatalog[folderKey] ? musicCatalog[folderKey].songs : [];

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";

    for (const song of songs) {
        songUL.innerHTML += `<li> 
            <img src="logo/music.png" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Ali Zain</div>
            </div>
            <div class="playnow">
                <img src="logo/play.png" alt="">
                <span>Play now</span>
            </div>
        </li>`;
    }

    // Attach event listeners to each song item
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });
    });

    return songs;
}

const playMusic = (track, pause = false) => {
    // Relative path fix (removed leading slash)
    currentSong.src = `${AUDIO_BASE_URL}${encodeURIComponent(track)}`;
    // currentSong.src = `${currFolder}/${track}`;

    if (!pause) {
        currentSong.play();
        play.src = "logo/pause.png";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbum() {
    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";

    // Render cards directly from the local catalog structure
    for (const folder in musicCatalog) {
        let album = musicCatalog[folder];
        cardContainer.innerHTML += `
        <div data-folder="${folder}" class="card">
            <div class="play">
                <img src="logo/playbtn.png" alt="">
            </div>
            <img src="${album.cover}" alt="${album.title}">
            <h2>${album.title}</h2>
            <p>${album.description}</p>
        </div>`;
    }

    // Load the playlist whenever a card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

async function main() {
    // Default initial album load
    await getSongs("songs/quran");
    playMusic(songs[0], true);

    // Display all Albums on web page
    await displayAlbum();

    // Play/Pause button event listener
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "logo/pause.png";
        } else {
            currentSong.pause();
            play.src = "logo/play.png";
        }
    });

    // Timeupdate listener
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar listener
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Hamburger menu
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Close menu
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

    // Previous button
    previous.addEventListener("click", () => {
        // 1. Extract the raw filename from the URL
        let rawFileName = currentSong.src.split("/").slice(-1)[0];

        // 2. Decode %20 back into normal spaces
        let currentFileName = decodeURIComponent(rawFileName).trim();

        // 3. Find the index in the songs array
        let index = songs.indexOf(currentFileName);

        // 4. Play the previous song if valid
        if (index !== -1 && (index - 1) >= 0) {
            playMusic(songs[index - 1]);
        } else if (songs.length > 0) {
            // Optional: Loop around to the last song
            playMusic(songs[songs.length - 1]);
        }
    });

    // Next button
    next.addEventListener("click", () => {
        // 1. Extract the raw filename from the URL
        let rawFileName = currentSong.src.split("/").slice(-1)[0];

        // 2. Decode %20 back into normal spaces
        let currentFileName = decodeURIComponent(rawFileName).trim();

        // 3. Find the index in the songs array
        let index = songs.indexOf(currentFileName);

        // 4. Play the next song if valid
        if (index !== -1 && (index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        } else if (songs.length > 0) {
            // Optional: Loop back to the first song
            playMusic(songs[0]);
        }
    });

    // Volume control
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
    });

    // Mute/Unmute toggle
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("logo/volume.png")) {
            e.target.src = e.target.src.replace("logo/volume.png", "logo/mute.png");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("logo/mute.png", "logo/volume.png");
            currentSong.volume = 0.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }
    });
}

main();