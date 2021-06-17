var play = 1;



// find the canvas from the html page
var canvas = document.querySelector('canvas');
// initialize the 3d engine
var engine = new BABYLON.Engine(canvas, true);
// create a new scene
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0, 0, 0);
// create a camera
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
// move camera so you can see
camera.setPosition(new BABYLON.Vector3(0, 15, 600));
// move camera with mouse
camera.attachControl(canvas);
// reduce wheel sensitivity
camera.wheelPrecision = 2;
// lighting
var light = new BABYLON.HemisphericLight('Light1', new BABYLON.Vector3(0, 1, 0), scene);
// create the sun
var sun = new BABYLON.Mesh.CreateSphere('sun', 32, 69.57, scene);
// create a sun material
var sunMaterial = new BABYLON.StandardMaterial('sunMaterial', scene);
// change texture
sunMaterial.emissiveTexture = new BABYLON.Texture('images/sun.jpg', scene);
sunMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
sun.material = sunMaterial;
// sunlight
var sunLight = new BABYLON.PointLight('sunLight', new BABYLON.Vector3.Zero(), scene);
sunLight.intensity = 15;


// planet creation
function createPlanet(planet) {
    var internalPlanet = new BABYLON.Mesh.CreateSphere(planet.name, planet.resolution, planet.diameter, scene);
    internalPlanet.position.x = planet.position.x;
    internalPlanet.position.y = planet.position.y;
    internalPlanet.position.z = planet.position.z;

    var internalPlanetMaterial = new BABYLON.StandardMaterial(planet.materialName, scene);
    internalPlanetMaterial.diffuseTexture = new BABYLON.Texture(planet.pathMaterial, scene);
    internalPlanetMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    internalPlanet.material = internalPlanetMaterial;
    internalPlanet.orbit = {
        radius: internalPlanet.position.x,
        speed: planet.speed,
        angle: 0
    };

    // Discs around planets
    if (planet.disc) {
        planet.disc.createDisc(internalPlanet);
    }

    // Planet Moons
    if (planet.moons) {
        for (let prop in planet.moons) {
            var moon = planet.moons[prop];
            var planetMoon = new BABYLON.Mesh.CreateSphere(moon.name, moon.resolution, moon.diameter, scene);
            planetMoon.parent = internalPlanet;
            planetMoon.position.x = moon.position.x;
            planetMoon.position.y = moon.position.y;
            planetMoon.position.z = moon.position.z;
            var moonMaterial = new BABYLON.StandardMaterial(moon.materialName, scene);
            moonMaterial.diffuseTexture = new BABYLON.Texture(moon.pathMaterial, scene);
            moonMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            planetMoon.material = moonMaterial;
        }
    }

    planets.push(internalPlanet);
    return internalPlanet;
};

// Planets Objects
var planets = [];
var mercury = {
    name: 'mercury',
    materialName: 'materialMercury',
    info: {
        name: 'Mercury',
        diameter: '4.880 Km',
        distance: '57,910,000 Km',
        day: '58.6 days',
        orbit: '87.97 days',
        moons: '0'
    },
    resolution: 32,
    diameter: 0.488,
    position: {
        x: 75.7,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/mercury.jpg',
    speed: 0.009
};

var venus = {
    name: 'venus',
    materialName: 'materialVenus',
    info: {
        name: 'Venus',
        diameter: '12,104 Km',
        distance: '108,200,000 Km',
        day: '243 days',
        orbit: '224.7 days',
        moons: '0'
    },
    resolution: 32,
    diameter: 1.21,
    position: {
        x: 80.8,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/venus.jpg',
    speed: 0.007
};

var earth = {
    name: 'earth',
    materialName: 'materialEarth',
    info: {
        name: 'Earth',
        diameter: '12.756 Km',
        distance: '149.600.000 Km',
        day: '23.93 hours',
        orbit: '365.256 days',
        moons: '1'
    },
    resolution: 32,
    diameter: 1.27,
    position: {
        x: 84.9,
        y: 0,
        z: 0
    },
    moons: {
        moon: {
            name: 'moon',
            materialName: 'materialMoon',
            resolution: 32,
            diameter: 0.2,
            position: {
                x: 2,
                y: 0,
                z: 0
            },
            pathMaterial: 'images/moon.jpg',
            speed: 0.01
        }
    },
    pathMaterial: 'images/earth.jpg',
    speed: 0.005
};

var mars = {
    name: 'mars',
    materialName: 'materialMars',
    info: {
        name: 'Mars',
        diameter: '6.794 Km',
        distance: '250,140,000 Km',
        day: '1d 0h 37m',
        orbit: '687 days',
        moons: '2'
    },
    resolution: 32,
    diameter: 0.67,
    position: {
        x: 92.7,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/mars.jpg',
    speed: 0.003
};

var jupiter = {
    name: 'jupiter',
    materialName: 'materialJupiter',
    info: {
        name: 'Jupiter',
        diameter: '142.984 Km',
        distance: '778.330.000 Km',
        day: '9.84 hours',
        orbit: '11.86 years',
        moons: '79'
    },
    resolution: 32,
    diameter: 14.2,
    position: {
        x: 147.8,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/jupiter.jpg',
    speed: 0.001
};

var saturn = {
    name: 'saturn',
    materialName: 'materialSaturn',
    info: {
        name: 'Saturn',
        diameter: '108.728 Km',
        distance: '1.429.400.000 Km',
        day: '10.23 hours',
        orbit: '29.46 years',
        moons: '18'
    },
    resolution: 32,
    diameter: 10.8,
    position: {
        x: 212.9,
        y: 0,
        z: 0
    },
    disc: {
        createDisc: function (parentPlanet) {
            var torus = BABYLON.Mesh.CreateTorus("torus", 18, 6, 64, scene, false, BABYLON.Mesh.DEFAULTSIDE);
            var discMaterial = new BABYLON.StandardMaterial('discMaterial', scene);
            discMaterial.diffuseTexture = new BABYLON.Texture('images/rings.jpg', scene);
            discMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            torus.position.z = 0;
            torus.scaling.y = 0.1;
            torus.parent = parentPlanet;
            torus.material = discMaterial;
        }
    },
    pathMaterial: 'images/saturn.jpg',
    speed: 0.0009
};

var uranus = {
    name: 'uranus',
    materialName: 'materialUranus',
    info: {
        name: 'Uranus',
        diameter: '51.118 Km',
        distance: '2.870.990.000 Km',
        day: '17.9 hours',
        orbit: '84.01 years',
        moons: '15'
    },
    resolution: 32,
    diameter: 5.1,
    position: {
        x: 350,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/uranus.jpg',
    speed: 0.0007
};

var neptune = {
    name: 'neptune',
    materialName: 'materialNeptune',
    info: {
        name: 'Neptune',
        diameter: '49.532 Km',
        distance: '4.504.300.000 Km',
        day: '16.11 hours',
        orbit: '164.8 years',
        moons: '8'
    },
    resolution: 32,
    diameter: 4.9,
    position: {
        x: 520.4,
        y: 0,
        z: 0
    },
    pathMaterial: 'images/neptune.jpg',
    speed: 0.0005
};

var planetMercury = createPlanet(mercury);
var planetVenus = createPlanet(venus);
var planetEarth = createPlanet(earth);
var planetMars = createPlanet(mars);
var planetJupiter = createPlanet(jupiter);
var planetSaturn = createPlanet(saturn);
var planetUranus = createPlanet(uranus);
var planetNeptune = createPlanet(neptune);

// animations
scene.beforeRender = function () {
    if (play != 0) {
        for (let counter = 0; counter <= planets.length - 1; counter++) {
            planets[counter].position.x = planets[counter].orbit.radius * Math.sin(planets[counter].orbit.angle);
            planets[counter].position.z = planets[counter].orbit.radius * Math.cos(planets[counter].orbit.angle);
            planets[counter].orbit.angle += planets[counter].orbit.speed;
            planets[counter].rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
            sun.rotate(BABYLON.Axis.Y, 0.001, BABYLON.Space.LOCAL);
        }
    }
};








// render the scene
engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener('resize', function () {
    engine.resize();
});

// buttons
var createText = function (scene) {
    var buttonPlanetWidth = 30;
    var buttonPlanetHeight = 30;
    var buttonPlanetTextSize = '10pt Futura-Bold';

    var buttonRect = new BABYLON.Rectangle2D(
        {
            parent: canvas, id: "button", x: 120, y: 80, width: 120, height: 50, fill: "#0040F0FF",
            roundRadius: 10,
            children:
                [
                    new BABYLON.Text2D("Stop Animation", { fontName: "12pt Futura-Bold", marginAlignment: "h: center, v: center" })
                ]
        });
    var buttonCamera = new BABYLON.Rectangle2D(
        {
            parent: canvas, id: "button", x: 25, y: 80, width: 80, height: 50, fill: "#0040F0FF",
            roundRadius: 10,
            children:
                [
                    new BABYLON.Text2D("Reset", { fontName: "12pt Futura-Bold", marginAlignment: "h: center, v: center" })
                ]
        });

    var bmercury = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "mercuryButton", x: 25, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.9, .2, .2, 1)),
            children:
                [
                    new BABYLON.Text2D("Me", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bvenus = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "venusButton", x: 60, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.8, .3, .3, 1)),
            children:
                [
                    new BABYLON.Text2D("Ve", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bearth = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "earthButton", x: 95, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.2, .2, .7, 1)),
            children:
                [
                    new BABYLON.Text2D("Ea", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bmars = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "marsButton", x: 130, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.8, .2, .2, 1)),
            children:
                [
                    new BABYLON.Text2D("Ma", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bjupiter = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "jupiterButton", x: 165, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.5, .5, .5, 1)),
            children:
                [
                    new BABYLON.Text2D("Ju", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bsaturn = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "saturnButton", x: 200, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.7, .5, .4, 1)),
            children:
                [
                    new BABYLON.Text2D("Sa", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var buranus = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "uranusButton", x: 235, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.2, .5, .9, 1)),
            children:
                [
                    new BABYLON.Text2D("Ur", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bneptune = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "neptuneButton", x: 270, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.2, .5, .8, 1)),
            children:
                [
                    new BABYLON.Text2D("Ne", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var bsun = new BABYLON.Ellipse2D(
        {
            parent: canvas, id: "sunButton", x: 305, y: 25, width: buttonPlanetWidth, height: buttonPlanetHeight, subdivisions: 32,
            fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(.9, .0, .0, 1)),
            children:
                [
                    new BABYLON.Text2D("Su", { fontName: buttonPlanetTextSize, marginAlignment: "h: center, v: center" })
                ]
        });

    var canvas = new BABYLON.ScreenSpaceCanvas2D(scene, {
        id: "ScreenCanvas",
        size: new BABYLON.Size(350, 330),
        backgroundFill: "#4040408F",
        backgroundRoundRadius: 10,
        children: [
            new BABYLON.Text2D('Solar System', {
                id: "name",
                x: 30, y: 300,
                fontName: "12pt Futura-Bold",
            }),
            new BABYLON.Text2D('Age: 4.568 billion years', {
                id: "size",
                x: 30, y: 270,
                fontName: "12pt Futura-Bold",
            }),
            new BABYLON.Text2D('Distance to Kulper Cliff: 50 AU ', {
                id: "distance",
                x: 30, y: 240,
                fontName: "12pt Futura-Bold",
            }),
            new BABYLON.Text2D('Satellites: 470 ', {
                id: "day",
                x: 30, y: 210,
                fontName: "12pt Futura-Bold",
            }),
            new BABYLON.Text2D('Orbital Speed: 220 km/s ', {
                id: "orbit",
                x: 30, y: 180,
                fontName: "12pt Futura-Bold",
            }),
            new BABYLON.Text2D('Orbital Period: 225–250 Myr ', {
                id: "moons",
                x: 30, y: 150,
                fontName: "12pt Futura-Bold",
            }),
            bmercury,
            bvenus,
            bearth,
            bmars,
            bjupiter,
            bsaturn,
            bneptune,
            buranus,
            bsun,
            buttonRect,
            buttonCamera
        ]
    });
    // Button click event
    buttonRect.pointerEventObservable.add(function (d, s) {
        if (play === 1) {
            play = 0;
            buttonRect.children[0].text = 'Start Animation';
        } else {
            play = 1;
            buttonRect.children[0].text = 'Stop Animation';
        }
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    buttonCamera.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(sun, 600);
        camera.wheelPrecision = 2;
        canvas.children[0].text = 'Name: Solar System';
        canvas.children[1].text = 'Size: 4.568 billion years';
        canvas.children[2].text = 'Distance: Distance to Kulper Cliff: 50 AU';
        canvas.children[3].text = 'Satellites: 470';
        canvas.children[4].text = 'Orbital Speed: 220 km/s';
        canvas.children[5].text = 'Orbital Period: 225–250 Myr';
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    // Planets Buttons Events
    bmercury.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetMercury, 1);
        setInfo(mercury);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bvenus.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetVenus, 2);
        setInfo(venus);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bearth.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetEarth, 2);
        setInfo(earth);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bmars.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetMars, 1);
        setInfo(mars);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bjupiter.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetJupiter, 20);
        setInfo(jupiter);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bsaturn.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetSaturn, 15);
        setInfo(saturn);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    buranus.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetUranus, 8);
        setInfo(uranus);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bneptune.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(planetNeptune, 8);
        setInfo(neptune);
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    bsun.pointerEventObservable.add(function (d, s) {
        setCameraOnPlanet(sun, 100);
        canvas.children[0].text = 'Name: ' + sun.info.name;
        canvas.children[1].text = 'Diameter: ' + sun.info.diameter;
        canvas.children[2].text = 'Distance: ' + sun.info.distance;
        canvas.children[3].text = 'Mass: ' + sun.info.mass;
        canvas.children[4].text = 'Temperature: ' + sun.info.temperature;
        canvas.children[5].text = 'Age: ' + sun.info.age;
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    function setInfo(planet) {
        canvas.children[0].text = 'Name: ' + planet.info.name;
        canvas.children[1].text = 'Diameter: ' + planet.info.diameter;
        canvas.children[2].text = 'Distance: ' + planet.info.distance;
        canvas.children[3].text = 'Days: ' + planet.info.day;
        canvas.children[4].text = 'Orbit: ' + planet.info.orbit;
        canvas.children[5].text = 'Moons: ' + planet.info.moons;
    }

    return canvas;
};

var canvasText = createText(scene, 'Solar System');

// Set camera on planet
function setCameraOnPlanet(planet, distance) {
    camera.setTarget(planet);
    camera.radius = distance;
    camera.wheelPrecision = 200;
}

