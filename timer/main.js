
function main() {
    new Timer();
}

class Timer {
    running = false;
    endsAt = 0;
    totalSeconds = 180;
    intervalTimer = null;
    readoutDiv = null;
    controlButton = null;

    constructor() {
        this.readoutDiv = document.querySelector("#readout");
        this.controlButton = document.querySelector("#start-stop");
        this.controlButton.addEventListener('click', this.controlButtonPress.bind(this));
        this.setReadout();
    }

    controlButtonPress() {
        if(this.running) {
            this.stopTimer();
        } else {
            this.running = true;
            this.controlButton.value = "Stop";
            this.intervalTimer = setInterval(this.setReadout.bind(this), 100);
            const now = Math.floor(Date.now()/1000);
            this.endsAt = now + this.totalSeconds;
        }
    }

    setReadout() {
        const currentTime = Math.floor(Date.now() / 1000);
        const difference = this.endsAt - currentTime;
        if(difference <= 0){
            this.readoutDiv.innerHTML = "0:00";
            this.stopTimer();
        } else {
            let minutes = Math.floor(difference / 60);
            let seconds = difference % 60;
            if(seconds < 10)
                seconds = "0" + seconds;
            this.readoutDiv.innerHTML = `${minutes}:${seconds}`;
        }

    }

    stopTimer() {
        this.running = false;
        this.controlButton.value = "Start";
        clearInterval(this.intervalTimer);
    }

    setControlButtonLabel() {

    }
}


document.addEventListener('DOMContentLoaded', main);