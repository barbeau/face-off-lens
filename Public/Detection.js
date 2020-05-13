// -----JS CODE-----
// Derived from code presented in https://www.youtube.com/watch?v=viOmxZDan-Y
// @input Component.AudioComponent audio
// @input Component.Text text

var colliders = [];
var lastTrigger = 0;
var counter = 0;

script.api.AddAABB = function (aabb) {
    colliders.push(aabb);    
}

function intersect(a, b) {
    //print("intersect ");
      return (a.api.minX <= b.api.maxX && a.api.maxX >= b.api.minX) &&
                 (a.api.minY <= b.api.maxY && a.api.maxY >= b.api.minY) &&
                 (a.api.minZ <= b.api.maxZ && a.api.maxZ >= b.api.minZ);
}

function CheckCollisions() {
    for (x = 0; x < colliders.length; x++) {
        try {
            colliders[x].api.MinMaxCalculations(); // get fresh data
        } catch (err) {
            colliders.splice(x, 1);
            x--;
        }
    }
    
    for (x = 0; x < colliders.length; x++) {
        for (y = x + 1; y < colliders.length; y++) {
            //print(x + " " + y);
            var colX = colliders[x];
            var colY = colliders[y];
            if (intersect(colX, colY)) {
                // Callbacks
                //colX.api.Intersection(colY);
                //colY.api.Intersection(colX);                
                var currentTime = getTime();
//                print("currentTime=" + currentTime)
//                print("lastTrigger=" + lastTrigger)
                if (lastTrigger == 0 || currentTime - lastTrigger > 5) {
                    lastTrigger = currentTime;
                    counter++;
                    print("X and Y collide - " + counter);      
                    script.audio.play(1);    
                    script.text.text = counter.toString();
                }   
            }
        }
    }
}

var event = script.createEvent("UpdateEvent");
event.bind(CheckCollisions);