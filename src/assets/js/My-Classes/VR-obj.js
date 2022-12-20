function init_OBJ() {

    var container, carousel;
    var camera, scene, renderer;
    var mouseX = 0,
        mouseY = 0;
    // var windowHalfX;
    // var windowHalfY;
    init();
    animate();

    function init() {
        // Objetos DOM
        // mycarousel = document.getElementById('myCarousel');
        container = document.getElementById('obj-container');
        carousel = document.getElementById('myCarousel');
        container.width = carousel.clientWidth;
        container.height = carousel.clientHeight;


        // Camera
        camera = new THREE.PerspectiveCamera(40, container.width / container.height, .1, 2000);
        camera.position.set(0, 250, -250); // z 250

        // controls
        controls = new THREE.OrbitControls(camera, container);
        controls.target.set(0, 0, 0); // controls.target.set(0, 100, 0);

        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0ffa0);

        // ligths
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);

        // ground
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })); //var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
        var grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        // texture
        var manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {
            console.log(item, loaded, total);
        };
        var textureLoader = new THREE.TextureLoader(manager);
        var texture = textureLoader.load('../assets/My-Objects/3D_Models/obj/textures/UV_Grid_Sm.jpg');
        // model
        var onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function(xhr) {
            console.log("Error");
        };
        // loader
        var loader = new THREE.OBJLoader(manager);
        loader.load('../assets/My-Objects/3D_Models/obj/bote.obj', function(object) {
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                    // console.log(object);
                }
            });
            object.position.y = -95;
            scene.add(object);
        }, onProgress, onError);

        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.width, container.height);
        container.appendChild(renderer.domElement);

        // events
        window.addEventListener('resize', onWindowResize, false);
        container.addEventListener('mousemove', onContainerMouseMove, false);
    }
    // fucntions events
    function onWindowResize() {
        container.width = carousel.clientWidth;
        container.height = carousel.clientHeight;
        // console.log("container-obj: ", container.width, container.height);
        camera.aspect = container.width / container.height;
        camera.updateProjectionMatrix();
        renderer.setSize(container.width, container.height);
    } // functions events
    function onContainerMouseMove(event) {
        controls.update();
    }
    // ANIMATE()
    function animate() {
        requestAnimationFrame(animate);
        // controls.update();
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
}