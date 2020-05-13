// -----JS CODE-----
// Derived from code presented in https://www.youtube.com/watch?v=viOmxZDan-Y
//@input float width = 8
//@input float height = 8
//@input float breadth = 8
//@input Component.ScriptComponent detect

script.api.minX = 0;
script.api.minY = 0;
script.api.minZ = 0;
script.api.maxX = 0;
script.api.maxY = 0;
script.api.maxZ = 0;

function Register() {
    if (script.detect.api) {
        script.detect.api.AddAABB(script);
    }
}

script.api.MinMaxCalculations = function() {
    var position = script.getSceneObject().getTransform().getWorldPosition();
    var halfW = script.width / 2.0;
    var halfH = script.height / 2.0;
    var halfB = script.breadth / 2.0;
    
    script.api.minX = position.x - halfW;
    script.api.minY = position.y - halfH;
    script.api.minZ = position.z - halfB;
    
    script.api.maxX = position.x + halfW;
    script.api.maxY = position.y + halfH;
    script.api.maxZ = position.z + halfB;
}

Register();