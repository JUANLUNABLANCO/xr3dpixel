function init_FBX() {
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    var container, carousel, stats, controls; // entre Dectector y general  puedes meter la carga de Stats.js si lo necesitas
    var Objects = [{

            'name': 'Logo_AVR3DS',
            'camera_perspective': [45, 1, 1000],
            'camera_position': [0, 3, 3],
            'target_set': [0, 0, 0],
            'plane_geometry': [1000, 1000]
        },
        {
            'name': 'Samba_Dancing',
            'camera_perspective': [45, 1, 2000],
            'camera_position': [100, 200, 300],
            'target_set': [0, 100, 0],
            'plane_geometry': [2000, 2000]
        },
        {
            'name': 'BoteEscalado',
            'camera_perspective': [45, 1, 1000],
            'camera_position': [0, 3, 3],
            'target_set': [0, 0, 0],
            'plane_geometry': [1000, 1000]
        }
    ];
    // selleciona el objeto  aqui
    var elem = Objects[1];
    var n_fbx = elem.name;
    var cper = elem.camera_perspective;
    var cpos = elem.camera_position;
    var ts = elem.target_set;
    var pg = elem.plane_geometry;
    // console.log(elem);
    var camera, scene, renderer, light;
    var clock = new THREE.Clock();
    var mixers = [];
    init();


    function init() {
        container = document.getElementById('fbx-container');
        carousel = document.getElementById('myCarousel');
        container.width = carousel.clientWidth;
        container.height = carousel.clientHeight;
        // console.log("fbx: ", container.width, container.height);

        camera = new THREE.PerspectiveCamera(cper[0], container.width / container.height, cper[1], cper[2]); // camera = new THREE.PerspectiveCamera(45, window.innercontainer.Width / window.innerHeight, 1, 2000);
        camera.position.set(cpos[0], cpos[1], cpos[2]); //camera.position.set(100, 200, 300);
        controls = new THREE.OrbitControls(camera, container); // renderer.domElement
        controls.target.set(ts[0], ts[1], ts[2]); // controls.target.set(0, 100, 0);
        controls.update();
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0);
        scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
        light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 200, 0);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        scene.add(light);
        // scene.add( new THREE.CameraHelper( light.shadow.camera ) );
        // ground
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(pg[0], pg[1]), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })); //var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
        var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);
        // model
        var loader = new THREE.FBXLoader();
        loader.load('../assets/My-Objects/3D_Models/fbx/' + n_fbx + '.fbx', function(object) { // Logo_AVR3DS
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);
            var action = object.mixer.clipAction(object.animations[0]);
            action.play();
            object.traverse(function(child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(object);
        });
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.width, container.height);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        // stats
        // stats = new Stats();
        // container.appendChild(stats.dom);

        animate();
    }

    function onWindowResize() {
        container.width = carousel.clientWidth; // window.innerWidth || 800;
        container.height = carousel.clientHeight; // window.innerHeight 7 2 || 500;
        // console.log("container-fbx: ", container.width, container.height);
        camera.aspect = container.width / container.height;
        camera.updateProjectionMatrix();
        renderer.setSize(container.width, container.height);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        if (mixers.length > 0) {
            for (var i = 0; i < mixers.length; i++) {
                mixers[i].update(clock.getDelta());
            }
        }
        renderer.render(scene, camera);
        // stats.update();
    }

};