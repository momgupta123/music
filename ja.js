

    let now_playing = document.querySelector(".now-playing");
    let track_art = document.querySelector(".track-art");
    let track_name = document.querySelector(".track-name");
    let track_artist = document.querySelector(".track-artist");

    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");

    let seek_slider = document.querySelector(".seek_slider");
    let volume_slider = document.querySelector(".volume_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create new audio element
    let curr_track = document.createElement('audio');

    // Define the tracks that have to be played
    let track_list = [
      {
        name: "Night Owl",
        artist: "Broke For Free",
        image: "https://lh3.googleusercontent.com/c5RVbnAczuIzu3oaoMEhl9q4rB1sWSDlsc6DNEvOOOErLKn7_KYAbPTZQjdZoENt59fhAHoa56Hj9oFyeIba5rUsW76JkViZnGcGyNTNPduNKv2M8_AHn6aU45X3MnY_j51vYJ0AH-SKwLS0UFWU6XmiX1WrAYFUip8PXQU98K-zaRqVQZg_Jrn3B8X2-eze5aad7QzwfrgUtUsaJqBl6CAQ6M9NFmsuMeC9NahaxpXh5m2bv4ko9JdOkQqWzfnqF7SN2cbXRHzmd8jlHuwCVohyw9CTQsGTwVQCZxS6XrwD4Tw_7ikcRnwKafV58Q0a8RldmpM4puL6Pcm_0mTlFXFn5tb-g_LV_PKwj7YcWkZYnFJBpzJJbWptvhXbEQI4uLY9nia3sb9jSN_Aaq4ztFT-naYpGkE3uMn6Y9l539uJYpluDwwSZrg4l_z3gOpthBmicbSWWApQ1gpHGVJDghsnUgah8PjH0ntdmzF5wl-CMuUhHTEftWLzHEc1StsOoXXKBrBEibABwCPq2MRMtRBycuJ4QVw4IhxbWdR-MaR-LEbx-IFSvwypCWQe2DSB29lzTW4AqnyDNZoWQsocPiR0krZWqrKEM2RapL90r1cQS3ilo0CngyCJiOnmoYYNrqRPh19dgYUxoftRhjcwmwd3UdmcpkgdKcd_iiBH0gFUzYCmmH6sj_SUrPlpmR6GScpFChITzNSEasdTikaRES5N=w640-h592-no?authuser=0",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
      },
      {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://lh3.googleusercontent.com/DowuLIS-N5HYV9-pGiSVHzJs4IDMeodY67jSuaZk-fRg852iVphhM0x-T6pBVwKrhMjr3KBGIHMc3brvgfNmkXRQZyN1o5OM0NyI9PNCgFZfxlgbThQvtAwFwuyepT3-gKtuCXu_HpUrKio2pM9rnrpojQjPyovew_xKfQTMcPjZ2uNRPOm5rJPDpeHRWAaE62gdXwP2nGlpWrWHM0ytmuUrRJl3y0sE7WwU_jE618f3WEGv1GPtX9e8ZArA3W5Xypc7P4OwMBTiAJvbQsrZ3mfLyQdOda_s0HPWLpyKCv-mdi3wrLkAqu-4zCgHvXC1c4YztqE26sfV86srbAcx5asrQmrOjghHBX4U5Y0WdwkYvRyRjsUw0L0Dx0GHlH1MB5trxMUeK5v23NDLfF99ZdL80uaWVK8RZlSz1fGJouPwjgm5sSRXq6dpi-o3AM3aqRk4OnU_eoF1IiVWeWxF0fS6gxc59G1DsBGf1Xc158Q2-HnHUhsMeZtV2ndiEUCV3NxQG1EVfifPIvQmt86d0AmPeU16ZzAKQhFPgaTs0QVLfutjRBwsSYQ87xSUlagbnLC78w_JFvziCgnW3z7K9WYjLEH3xRQnEkqgNwF5R9NB-XFzZGGuP8R4PdNara5ny3lFLiRWgZBeT9txKYCChkN_i41kMlDtXryr9EVtWTvH9nr-Hj0_Hs9i5Zd1rzQnaWjFK56k-EZNkdzZsMyiSJ2I=w359-h657-no?authuser=0",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
      },
      {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        image: "https://lh3.googleusercontent.com/7-niMHY_NUrGe7hUBsi4YPELsnw4suVdfEVfvVNvrtknd4Uc59vFmNa7nECeFqeVWVu_0BfummZK3D4SuxZnzSoNMTQ88ino1KYmkALqOFWcAZizlm9VBhlR8Jr3_YoAP4srh57EmVEzh743omP8FwS31bzP7e-Xh4_cukgF8UffmYlcJv93S3ttEKKwC9lSTlo1Z_Q0Q0h01bhA1MMsHD7vF4Nh8FO3uoe5av1N98QdyPmipdqNNnr-8zhWGufqbm0lvOuOIwVl2wL-J764-dAr-r939baLBPTr2-x1U_1DgRoqxNR_fHPgNlA4anb1eXjbD2y98a_gxRK1B_tldbKnaBhQvhBmao3C8T9eUdier1kVz7y68CAI0KaHKUTYeqsTiw_su5lPezRZ5pKv6lE0mrAGU2J85ELGF61k69BARUTNYM_3Y6fVWO9aVCGIEKQFkiSDene76u4EMoqMaajpHEGtZeIgX0RLS6d511oJrZZoomKG5nkuoRY2FsS5lWDga4DgG2JWGYOEvczYrOzfoalV-oRxDirkhHoOggt_23spkxQgdgAbojFlG-RmcTC9UuozxOL91vs1P4hPQJeJntgIBZemC51hvwALdbDf6j4Ain12yb5eCjBKbHgWXHYhIoeagylKlZ7Uo9PYdkMR8ZomJ3GuKdOHfwRkDbZdBfXFblW0c7X2aTl077qaev2ANfjZpSKE156aJT_drmur=w493-h657-no?authuser=0",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
      },
    ];

    function loadTrack(track_index) {
      clearInterval(updateTimer);
      resetValues();

      // Load a new track
      curr_track.src = track_list[track_index].path;
      curr_track.load();

      // Update details of the track
      track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
      track_name.textContent = track_list[track_index].name;
      track_artist.textContent = track_list[track_index].artist;
      now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

      // Set an interval of 1000 milliseconds for updating the seek slider
      updateTimer = setInterval(seekUpdate, 1000);

      // Move to the next track if the current one finishes playing
      curr_track.addEventListener("ended", nextTrack);

      // Apply a random background color
      random_bg_color();
    }

    function random_bg_color() {

      // Get a random number between 64 to 256 (for getting lighter colors)
      let red = Math.floor(Math.random() * 256) + 64;
      let green = Math.floor(Math.random() * 256) + 64;
      let blue = Math.floor(Math.random() * 256) + 64;
      let pink = Math.floor(Math.random() * 256) + 64;


      // Construct a color withe the given values
      let bgColor = "rgb(" + red + "," + green + "," + blue + "," + pink + ")";

      // Set the background to that color
      document.body.style.background = bgColor;
    }

    // Reset Values
    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
    }

    function playpauseTrack() {
      if (!isPlaying) playTrack();
      else pauseTrack();
    }

    function playTrack() {
      curr_track.play();
      isPlaying = true;

      // Replace icon with the pause icon
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }

    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;

      // Replace icon with the play icon
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
    }

    function nextTrack() {
      if (track_index < track_list.length - 1)
        track_index += 1;
      else track_index = 0;
      loadTrack(track_index);
      playTrack();
    }

    function prevTrack() {
      if (track_index > 0)
        track_index -= 1;
      else track_index = track_list.length;
      loadTrack(track_index);
      playTrack();
    }

    function seekTo() {
      seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
    }

    function setVolume() {
      curr_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
      let seekPosition = 0;

      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }

    // Load the first track in the tracklist
    loadTrack(track_index);
