$(document).ready(function() {
    var canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext('2d');

    var headColor="#ff0000";
    var torsoColor="#00ff00";
    var legColor="#0000ff";
    var headSize=40;

    let torsoSize = headSize*1.3;
    let legSize = headSize*1.5;
    let initY = canvas.height*0.6;
    let initX = canvas.width*0.3;
    let handYFactor = 0.2;

    // function getPosFromAngle(angle, startX, startY, length) {
    //     if(angle == 0) {
    //         return [startX + length, startY];
    //     }
    //     if(angle == Math.PI/2) {
    //         return [startX, startY - length];
    //     }
    //     if(angle == Math.PI) {
    //         return [startX - length, startY];
    //     }
    //     if(angle == 3*Math.PI/2) {
    //         return [startX, startY + length];
    //     }
    //     if(angle > 0 && angle < Math.PI) {
    //         let sq = false;
    //         if(angle > Math.PI/2) {
    //             sq = true;
    //             angle = Math.PI - angle;
    //         }
    //         let dx = Math.cos(angle)*length;
    //         let dy = Math.sin(angle)*length;
    //         if(sq) {
    //             dx *= -1;
    //         }
    
    //         return [startX + dx, startY + dy];
    //     }
    
    //     let tq = false;
    //     if(angle > 3*Math.PI/2) {
    //         angle = 2*Math.PI - angle;
    //     } else {
    //         angle -= Math.PI;
    //         tq = true;
    //     }
    
    //     let dx = Math.cos(angle)*length;
    //     let dy = Math.sin(angle)*length;
    //     if(tq) {
    //         dx *= -1;
    //     }
    
    //     return [startX + dx, startY - dy];
    // }

    // function buildStatic() {
    //     //head
    //     c.beginPath();
    //     c.strokeStyle=headColor;
    //     c.arc(initX, initY-legSize-torsoSize-headSize/2, headSize/2, 0, 2*Math.PI);
    //     c.fillStyle=headColor;
    //     c.fill();

    //     //torso
    //     c.beginPath();
    //     c.moveTo(initX, initY-legSize-torsoSize);
    //     c.lineTo(initX, initY-legSize);
    //     c.lineWidth=7;
    //     c.strokeStyle=torsoColor;
    //     c.stroke();

    //     //right hand
    //     c.beginPath();
    //     let handStartY = initY-legSize-torsoSize*(1-handYFactor);
    //     c.moveTo(initX, handStartY);
    //     c.lineTo(initX + torsoSize/2, handStartY);
    //     c.lineTo(initX + torsoSize/2 + torsoSize/4, handStartY-torsoSize/4);
    //     c.stroke();

    //     //left hand
    //     c.beginPath();
    //     c.moveTo(initX, handStartY);
    //     c.lineTo(initX - torsoSize/2, handStartY);
    //     c.lineTo(initX - torsoSize/2 - torsoSize/4, handStartY-torsoSize/4);
    //     c.stroke();

    // }

    // class Leg {
        
    //     constructor(startX, startY, length, speed, initPos, mirror=false) {
    //         this.startX = startX;
    //         this.startY = startY;
    //         this.length = length;
    //         this.av = speed/this.length;
    //         this.initPos = initPos;
    //         this.lastAngle=undefined;
    //         this.mirror=mirror;
    //     }

    //     drawAndShift() {
    //         c.beginPath();
    //         //range = 225-315;
    //         let end;
    //         if(this.lastAngle) {
                
    //             if(this.lastAngle > 3*Math.PI/4) {
    //                 this.av *= -1;
    //             } else if(this.lastAngle < Math.PI/4) {
    //                 this.av *= -1;
    //             }
    //             this.lastAngle += this.av;
    //             end = getPosFromAngle(this.lastAngle, this.startX, this.startY, this.length);
    //         } else {
    //             this.lastAngle = Math.PI/2 + Math.PI*this.initPos/4;
    //             end = getPosFromAngle(this.lastAngle, this.startX, this.startY, this.length);

    //         }
    //         c.moveTo(this.startX, this.startY);
    //         c.lineTo(end[0], end[1]);
    //         c.strokeStyle=legColor;
    //         c.stroke();
    //         if(this.mirror) {
    //             c.moveTo(this.startX, this.startY);
    //             c.lineTo(this.startX*2 - end[0], end[1]);
    //             c.strokeStyle=legColor;
    //             c.stroke();
    //         }
    //     }

    //     getLegEnd(mirrored=false) {
    //         let pos = getPosFromAngle(this.lastAngle, this.startX, this.startY, this.length);
    //         if(!mirrored) {
    //             return pos;
    //         }
    //         return [this.startX*2-pos[0], pos[1]];
    //     }

    //     getFootAngle(mirrored=false) {

    //         let angle = this.lastAngle;
    //         if(mirrored) {
    //             angle = Math.PI - this.lastAngle;
    //         }
    //         if(!mirrored && this.av > 0) {
    //             return this.lastAngle;
    //         }

    //         if(mirrored && this.av < 0) {
    //             return angle;
    //         }

    //         if(angle == Math.PI/2) {
    //             return 3*Math.PI/4;
    //         }

    //         let deviation = Math.abs(angle - Math.PI/2);
    //         return angle + (Math.PI/2 - deviation*2);

    //     }
    // }

    // let legs = new Leg(initX, initY-legSize, legSize/2, 1, 1, true);

    // function visualizeMotion(deltaX, deltaY) {
    //     let center = [canvas.width*0.75, canvas.height*0.5];
    //     c.beginPath();
    //     c.arc(center[0], center[1], 5, 0, Math.PI*2);
    //     c.fillStyle='rgb(255, 0, 0)';
    //     c.fill();

    //     c.beginPath();
    //     c.arc(center[0] + deltaX, center[1]+deltaY, 5, 0, Math.PI*2);
    //     c.fill();
    // }

    // function animate() {
    //     requestAnimationFrame(animate);
    //     c.clearRect(0, 0, canvas.width, canvas.height);
    //     buildStatic();
    //     legs.drawAndShift();
    //     let footStart = legs.getLegEnd();
    //     // footStart = normalize(footStart);
    //     let footAngle = legs.getFootAngle();
    //     let footEnd = getPosFromAngle(footAngle, footStart[0], footStart[1], legSize/2);
    //     // footEnd = normalize(footEnd);
    //     c.beginPath();
    //     c.moveTo(footStart[0], footStart[1]);
    //     // c.lineTo(200,200);
    //     c.lineTo(footEnd[0], footEnd[1]);
    //     c.strokeStyle = legColor;
    //     c.stroke();
    //     visualizeMotion(footEnd[0]-footStart[0], footEnd[1]-footStart[1]);
    //     footStart = legs.getLegEnd(true);
    //     // footStart = normalize(footStart);
    //     footAngle = legs.getFootAngle(true);
    //     footEnd = getPosFromAngle(footAngle, footStart[0], footStart[1], legSize/2);
    //     // footEnd = normalize(footEnd);
    //     c.beginPath();
    //     c.moveTo(footStart[0], footStart[1]);
    //     // c.lineTo(200,200);
    //     c.lineTo(footEnd[0], footEnd[1]);
    //     c.strokeStyle = legColor;
    //     c.stroke();

    // }

    // // buildStatic();
    // // rightLeg.drawAndShift();
    // // leftLeg.drawAndShift();

    // animate();

    // Mathematical Approach
    let w=.05;
    let t=0;

    // f = 2w
    function getInitY() {
        let deltaH = legSize-legSize/(Math.sqrt(2));
        return deltaH*Math.abs(Math.cos(w*t));
    }

    // f = w;
    function getKneePos(groinPos, mirrored=false) {
        let theta = w*t;
        if(mirrored) {
            theta -= Math.PI;
        }
        let x = groinPos[0]+legSize/(2*Math.sqrt(2)) * Math.cos(theta);
        let y = groinPos[1] + legSize/(2*Math.sqrt(2))*Math.abs(Math.sin(theta));
        return [x,y];
    }

    // f = w;
    function getLegEnd(kneePos, mirrored=false) {
        let theta=w*t;
        if(mirrored) {
            theta -= Math.PI;
        }
        let x = kneePos[0] + Math.ceil(Math.sin(theta))*(legSize/(2*Math.sqrt(2)) * Math.cos(theta)) - Math.floor(Math.sin(theta))*((legSize/2)*Math.cos(theta-Math.PI/4));

        let y = kneePos[1] + Math.ceil(Math.sin(theta))*((legSize/2)*(1-1/Math.sqrt(2))*Math.sin(theta)+legSize/(2*Math.sqrt(2)))
        - Math.floor(Math.sin(theta))*((legSize/2)*Math.abs(Math.sin(theta-Math.PI/4)));

        return [x,y];
    }

    function buildStatic(initX, initY) {
        //head
        c.beginPath();
        c.strokeStyle=headColor;
        c.arc(initX, initY-legSize-torsoSize-headSize/2, headSize/2, 0, 2*Math.PI);
        c.fillStyle=headColor;
        c.fill();

        //torso
        c.beginPath();
        c.moveTo(initX, initY-legSize-torsoSize);
        c.lineTo(initX, initY-legSize);
        c.lineWidth=7;
        c.strokeStyle=torsoColor;
        c.stroke();

        //right hand
        c.beginPath();
        let handStartY = initY-legSize-torsoSize*(1-handYFactor);
        c.moveTo(initX, handStartY);
        c.lineTo(initX + torsoSize/2, handStartY);
        c.lineTo(initX + torsoSize/2 + torsoSize/4, handStartY-torsoSize/4);
        c.stroke();

        //left hand
        c.beginPath();
        c.moveTo(initX, handStartY);
        c.lineTo(initX - torsoSize/2, handStartY);
        c.lineTo(initX - torsoSize/2 - torsoSize/4, handStartY-torsoSize/4);
        c.stroke();

        return [initX, initY-legSize];

    }

    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        let groinPos = buildStatic(initX, initY+getInitY());
        let kneePos1 = getKneePos(groinPos);
        let kneePos2 = getKneePos(groinPos, true);
        let legEnd1 = getLegEnd(kneePos1);
        let legEnd2 = getLegEnd(kneePos2, true);
        c.beginPath();
        c.moveTo(groinPos[0], groinPos[1]);
        c.lineTo(kneePos1[0], kneePos1[1]);
        c.moveTo(groinPos[0], groinPos[1]);
        c.lineTo(kneePos2[0], kneePos2[1]);
        c.moveTo(kneePos1[0], kneePos1[1]);
        c.lineTo(legEnd1[0], legEnd1[1]);
        c.moveTo(kneePos2[0], kneePos2[1]);
        c.lineTo(legEnd2[0], legEnd2[1]);
        c.strokeStyle=legColor;
        c.stroke();
        updateTime();
    }

    function updateTime() {
        t++;
        let rd = (w*t)/(Math.PI*2);
        let ad = Math.round(rd);

        let diff = Math.abs(rd-ad);
        if(diff < 0.0001) {
            t=0;
        }
    }

    animate();

});