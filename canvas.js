$(document).ready(function() {
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d');
    // c.fillStyle = "yellow"
    // c.fillRect(100, 100, 100, 100);
    
    // c.beginPath();
    // c.moveTo(80, 80);
    // c.lineTo(220, 80);
    // c.lineTo(220, 220);
    // c.lineTo(80, 220);
    // c.lineTo(80, 80);
    // c.strokeStyle = "red";
    // c.stroke();

    // for(var i=0; i<100; i++) {
    //     var x = Math.random()*canvas.width;
    //     var y = Math.random()*canvas.height;
    //     var r = Math.random()*255;
    //     var g = Math.random()*255;
    //     var b = Math.random()*255;
    //     var a = Math.random();
    //     c.beginPath();
    //     c.arc(x, y, 50, 0, 2*Math.PI);
    //     c.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    //     c.stroke();

    //     x = Math.random()*canvas.width;
    //     y = Math.random()*canvas.height;
    //     r = Math.random()*255;
    //     g = Math.random()*255;
    //     b = Math.random()*255;
    //     a = Math.random();

    //     c.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    //     c.fillText("SJ", x, y);
    // }

    // c.beginPath();
    // c.arc(100, 100, 50, 0, 2*Math.PI);
    // c.strokeStyle = "red";
    // c.stroke();

    let animators;

    var mouseX;
    var mouseY;
    var nearbyExpand;
    var velocityMod;
    var follow=false;
    var coolDown=0;

    function unhideFollowButton() {
        $('#follow-btn').css('display', 'block');
    }

    $('#follow-btn').click(function() {
        if($('#follow-btn').prop('innerText') == 'Follow Me') {
            follow = true;
            $('#follow-btn').prop('innerText', 'Stop Following');
        } else {
            follow = false;
            $('#follow-btn').prop('innerText', 'Follow Me');
        }
    });
    
    $('#submit-btn').click(function() {
        unhideFollowButton();
        animators = [];
        c.clearRect(0, 0, canvas.width, canvas.height);
        const radius = parseInt($('#radius').val());
        const expand = parseInt($('#expand').val());
        const trails = parseInt($('#trails').val());
        const dx = parseInt($('#dx').val());
        const dy = parseInt($('#dy').val());
        const circleCount = parseInt($('#circleCount').val());
        const fill = $('#fill').is(':checked');
        const fillColor = $('#fill-color').val();
        nearbyExpand = $('#nearby-expand').is(':checked');
        velocityMod = Math.sqrt(dx*dx + dy*dy);
        
        for(let i=0; i<circleCount; i++) {
            let x = Math.random()*window.innerWidth;
            let y = Math.random()*window.innerHeight;
            let animator = new Animator(radius, expand, trails, dx, dy, c, x, y, fill, fillColor);
            animators.push(animator);
        }
        console.log('created animators');
        animate();
    });

    $('#canvas').on('mousemove', function(event) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        // console.log(event.clientX + " " + event.offsetX);
        c.beginPath();
        c.arc(mouseX, mouseY, 2, 0, 2*Math.PI);
        c.strokeStyle = 'rgba(255, 255, 255, 1)';
        c.fillStyle = 'rgb(a255, 255, 255, 1)';
    });

    $('#canvas').on('click', function(event) {
        for(let animator of animators) {
            let dirX = Math.random()-0.5;
            let dirY = Math.random()-0.5;

            let initMag = Math.sqrt(animator.dx*animator.dx + animator.dy*animator.dy);
            let magnitude = Math.sqrt(dirX*dirX + dirY*dirY);
            animator.dx = dirX*initMag/magnitude;
            animator.dy = dirY*initMag/magnitude;
        }
        coolDown = 1000;
    });

    function animate() {
        requestAnimationFrame(animate);
        console.log('running animator');
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for(let animator of animators) {
            animator.populateCircles();
            animator.drawAll();
        }
        if(coolDown > 0) {
            coolDown--;
        }
    }
    
    
    class Animator {
        constructor(radius, expansionCoeff, trailingLength, dx, dy, c, initX, initY, fill, fillColor) {
            this.radius = radius;
            this.expansionCoeff = expansionCoeff;
            this.trailingLength = trailingLength;
            this.dx = dx;
            this.dy = dy;
            this.circles = [];
            this.initX = initX;
            this.initY = initY;
            this.c = c;
            this.fill = fill;
            this.fillColor = fillColor;
        }

        drawAll() {
            for(let cr of this.circles) {
                if(this.fill) {
                    cr.draw(this.c, this.fillColor);
                } else {
                    cr.draw(this.c);
                }
            }
            console.log('drawn circles');
        }
        
        populateCircles() {
            const nc = new Circle(this.initX, this.initY, this.radius);
            if(!follow || !mouseX || !mouseY || coolDown>0) {
                if(this.initX >= window.innerWidth-this.radius) {
                    this.dx *= -1;
                }
                if(this.initX <= this.radius) {
                    this.dx *= -1;
                }
                
                if(this.initY >= window.innerHeight-this.radius) {
                    this.dy *= -1;
                }
                if(this.initY <= this.radius) {
                    this.dy *= -1;
                }
            } else {
                let dirX = mouseX - this.initX;
                let dirY = mouseY - this.initY;

                let initMag = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
                let magnitude = Math.sqrt(dirX*dirX + dirY*dirY);
                this.dx = dirX*Math.sqrt(2)/magnitude;
                this.dy = dirY*Math.sqrt(2)/magnitude;
            }

            this.initX += this.dx;
            this.initY += this.dy;
            const r = Math.random()*255;
            const g = Math.random()*255;
            const b = Math.random()*255;
            nc.setColor(r, g, b, 1);
            let nCircles = [];
            const dalpha = 1/(this.trailingLength+1);
            nCircles.push(nc);
            for(let i=0; i<this.circles.length && i<this.trailingLength; i++) {
                let cir = this.circles[i];
                cir.a -= dalpha;
                cir.radius += this.expansionCoeff;
                nCircles.push(cir);
            }
            
            this.circles = nCircles;
            console.log('populated circles');
        }
        
        printAnimator() {
            console.log('radius: ' + this.radius);
            console.log('expansionCoeff: ' + this.expansionCoeff);
            console.log('trailingLength: ' + this.trailingLength);
            console.log('dx: ' + this.dx);
            console.log('dy: '  + this.dy);
        }
    }

    class Circle {

        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 1;
        }

        setColor(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        
        draw(context, fillColor) {
            context.beginPath();
            if(nearbyExpand && (Math.abs(mouseX-this.x) < 100 && Math.abs(mouseY-this.y) < 100)) {
                context.arc(this.x, this.y, this.radius*2.5, 0, 2*Math.PI);    
            } else {
                context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
            }
            context.strokeStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
            context.stroke();
            if(fillColor != undefined) {
                context.fill();
                context.fillStyle = fillColor;
            }
        } 
    }
});