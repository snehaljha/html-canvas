$(document).ready(function() {
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d');

    var colorShades = ['#699A33', '#28784D', '#96A637', '#7BEC00', '#3B472E', '#333C29',
    '#DAFA00', '#4A4D32', '#7BE804', '#00C45B', '#202F27'];
    // var colorShades = ['rgb(255,0,0)'];
    var gRadius=7;
    var trail=20;

    var mouseX = canvas.width/2;
    var mouseY = canvas.height/2;

    $('#canvas').on('mousemove', function(event) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    });

    var animators = [];

    class Circle {

        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
        }

        draw() {
            c.beginPath();
            c.arc(this.x, this.y, gRadius, 0, 2*Math.PI);
            c.strokeStyle = this.color;
            c.fill();
            c.fillStyle = this.color;
            console.log(this.color);
        }
    }

    class Animator {
        
        constructor(radius, color, initAngle, speed) {
            this.radius = radius;
            this.color = color;
            this.initAngle = initAngle;
            this.deltaR = speed/this.radius;
            this.circles = [];
        }

        populateCircles() {
            const pos = this.getPosFromAngle(this.initAngle);
            const nc = new Circle(pos[0], pos[1], this.color);

            this.initAngle += this.deltaR;
            this.initAngle %= 2*Math.PI;
            nc.color = this.color + 'ff';
            let nCircles = [];
            let dalpha = 1/(trail+1);
            nCircles.push(nc);
            for(let i=0; i<this.circles.length && i<trail; i++) {
                let cir = this.circles[i];
                cir.color = this.color + (parseInt((1-dalpha*(i+1))*255)).toString(16);
                nCircles.push(cir);
            }
            
            this.circles = nCircles;
            console.log('populated circles');
        }

        getPosFromAngle(angle) {
            if(angle == 0) {
                return [mouseX + this.radius, mouseY];
            }
            if(angle == Math.PI/2) {
                return [mouseX, mouseY - this.radius];
            }
            if(angle == Math.PI) {
                return [mouseX - this.radius, mouseY];
            }
            if(angle == 3*Math.PI/2) {
                return [mouseX, mouseY + this.radius];
            }
            if(angle > 0 && angle < Math.PI) {
                let sq = false;
                if(angle > Math.PI/2) {
                    sq = true;
                    angle = Math.PI - angle;
                }
                let dx = Math.cos(angle)*this.radius;
                let dy = Math.sin(angle)*this.radius;
                if(sq) {
                    dx *= -1;
                }

                return [mouseX + dx, mouseY + dy];
            }

            let tq = false;
            if(angle > 3*Math.PI/2) {
                angle = 2*Math.PI - angle;
            } else {
                angle -= Math.PI;
                tq = true;
            }

            let dx = Math.cos(angle)*this.radius;
            let dy = Math.sin(angle)*this.radius;
            if(tq) {
                dx *= -1;
            }

            return [mouseX + dx, mouseY - dy];
        }

        drawAll() {
            for(let cr of this.circles) {
                cr.draw();
            }
        }
    }

    for(let i=0; i<10; i++) {
        let radius = Math.random()*5*gRadius+15*gRadius;
        let color = colorShades[parseInt(Math.random()*colorShades.length)];
        let angle = Math.random()*2*Math.PI;
        let speed = Math.random()*3;
        let animator = new Animator(radius, color, angle, speed);
        animators.push(animator);
    }

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        for(let animator of animators) {
            animator.populateCircles();
            animator.drawAll();
        }
    }

    animate();

});