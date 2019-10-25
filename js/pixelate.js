let canvas = document.getElementById("displayCanvas");
let display = new Display(canvas);

let players = [];

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("connect").addEventListener("click", () => {
        players.push(new Player());
    });
});

class Player {
    constructor() {
        this.controller = new BleController();
        this.cursor = new Cursor(display);

        this.controller.connect()
        .then(() => {
            console.log("Connected to BLE controller");
            this.controller.addEventListener('touch', (event) => {
                switch(event.touchedKey) {
                    case 'R': this.cursor.move_right(); break;
                    case 'L': this.cursor.move_left(); break;
                    case 'U': this.cursor.move_up(); break;
                    case 'D': this.cursor.move_down(); break;
                    case 'X':
                        this.cursor.change_color({r:200, g:0, b:0});
                        this.cursor.colorize();
                        break;
                    case 'A':
                        this.cursor.change_color({r:0, g:200, b:0});
                        this.cursor.colorize();
                        break;
                    case 'B':
                        this.cursor.change_color({r:0, g:0, b:200});
                        this.cursor.colorize();
                        break;
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    }
}