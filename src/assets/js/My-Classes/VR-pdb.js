function init_PDB() {
    // Cargador de moleculas en formato pdb
    var container, carousel;
    var camera, scene, renderer, labelRenderer, object;
    var controls;
    var root;
    var MOLECULES = {
        // "Ethanol": "ethanol.pdb",
        // "Aspirin": "aspirin.pdb",
        "Caffeine": "caffeine.pdb",
        // "Nicotine": "nicotine.pdb",
        // "LSD": "lsd.pdb",
        // "Cocaine": "cocaine.pdb",
        // "Cholesterol": "cholesterol.pdb",
        // "Lycopene": "lycopene.pdb",
        // "Glucose": "glucose.pdb",
        // "Aluminium oxide": "Al2O3.pdb",
        // "Cubane": "cubane.pdb",
        // "Copper": "cu.pdb",
        // "Fluorite": "caf2.pdb",
        // "Salt": "nacl.pdb",
        // "YBCO superconductor": "ybco.pdb",
        // "Buckyball": "buckyball.pdb",
        // "Graphite": "graphite.pdb",
        "Cannabidiol": "cannabidiol.pdb"
    };
    var loader = new THREE.PDBLoader();
    var offset = new THREE.Vector3();
    var menu = document.getElementById('pdb-menu');
    init();
    animate();

    function init() {
        // Objetos DOM
        carousel = document.getElementById('myCarousel');
        container = document.getElementById('pdb-container'); // pdb-container
        container.width = carousel.clientWidth;
        container.height = carousel.clientHeight;
        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0); // color del background  0x050505
        // Camera
        camera = new THREE.PerspectiveCamera(30, container.width / container.height, 1, 5000);
        camera.position.z = 2000;
        scene.add(camera);
        // ligths
        var light = new THREE.DirectionalLight(0xffffff, 0.8);
        light.position.set(1, 1, 1);
        scene.add(light);
        var light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(-1, -1, 1);
        scene.add(light);
        // root
        root = new THREE.Group();
        scene.add(root);
        // renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.width, container.height);
        document.getElementById('pdb-container').appendChild(renderer.domElement);
        labelRenderer = new THREE.CSS2DRenderer();
        // label
        labelRenderer.setSize(container.width, container.height);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0';
        labelRenderer.domElement.style.pointerEvents = 'none';
        document.getElementById('pdb-container').appendChild(labelRenderer.domElement);
        // controls
        // controls cercania y lejania de la camera limitada  ////  !!!! no funciona
        // controls = new THREE.TrackballControls(camera, container); // renderer.domElement
        // controls.minDistance = 500;
        // controls.maxDistance = 2000;
        // controls reals mouse
        controls = new THREE.OrbitControls(camera, container);
        controls.target.set(0, 100, 0); // controls.target.set(0, 100, 0);
        controls.update();
        // Loader
        loadMolecule('../assets/My-Objects/3D_Models/pdb/cannabidiol.pdb');
        createMenu();
        // events
        window.addEventListener('resize', onWindowResize, false);
    }
    // button action
    function generateButtonCallback(url) {
        return function(event) {
            loadMolecule(url);
        }
    }
    // create menu
    function createMenu() {
        for (var m in MOLECULES) {
            var button = document.createElement('button');
            button.innerHTML = m;
            menu.appendChild(button);
            var url = '../assets/My-Objects/3D_Models/pdb/' + MOLECULES[m];
            button.addEventListener('click', generateButtonCallback(url), false);
        }
    }
    // load molecule
    function loadMolecule(url) {
        while (root.children.length > 0) {
            var object = root.children[0];
            object.parent.remove(object);
        }
        loader.load(url, function(pdb) {
            var geometryAtoms = pdb.geometryAtoms;
            var geometryBonds = pdb.geometryBonds;
            var json = pdb.json;
            var boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1); // los palitos
            var sphereGeometry = new THREE.IcosahedronBufferGeometry(1, 2); // las esferas
            geometryAtoms.computeBoundingBox();
            geometryAtoms.boundingBox.getCenter(offset).negate();
            geometryAtoms.translate(offset.x, offset.y, offset.z);
            geometryBonds.translate(offset.x, offset.y, offset.z);
            var positions = geometryAtoms.getAttribute('position');
            var colors = geometryAtoms.getAttribute('color');
            var position = new THREE.Vector3();
            var color = new THREE.Color();
            for (var i = 0; i < positions.count; i++) {
                position.x = positions.getX(i);
                position.y = positions.getY(i);
                position.z = positions.getZ(i);
                color.r = colors.getX(i);
                color.g = colors.getY(i);
                color.b = colors.getZ(i);
                var material = new THREE.MeshPhongMaterial({ color: color });
                var object = new THREE.Mesh(sphereGeometry, material);
                object.position.copy(position);
                object.position.multiplyScalar(75);
                object.scale.multiplyScalar(25);
                root.add(object);
                var atom = json.atoms[i];
                var text = document.createElement('div');
                text.className = 'label';
                text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
                text.textContent = atom[4];
                var label = new THREE.CSS2DObject(text);
                label.position.copy(object.position);
                root.add(label);
            }
            positions = geometryBonds.getAttribute('position');
            var start = new THREE.Vector3();
            var end = new THREE.Vector3();
            for (var i = 0; i < positions.count; i += 2) {
                start.x = positions.getX(i);
                start.y = positions.getY(i);
                start.z = positions.getZ(i);
                end.x = positions.getX(i + 1);
                end.y = positions.getY(i + 1);
                end.z = positions.getZ(i + 1);
                start.multiplyScalar(75);
                end.multiplyScalar(75);
                var object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
                object.position.copy(start);
                object.position.lerp(end, 0.5);
                object.scale.set(5, 5, start.distanceTo(end));
                object.lookAt(end);
                root.add(object);
            }
            render();
        });
    }
    // resize window
    function onWindowResize() {
        container.width = carousel.clientWidth;
        container.height = carousel.clientHeight;
        // console.log("container-pdb: ", container.width, container.height);
        camera.aspect = container.width / container.height;
        // #### nueva posicion del objeto
        camera.lookAt(scene.position);
        camera.position.z = 3000;
        // #### nueva posicion del objeto
        camera.updateProjectionMatrix();
        renderer.setSize(container.width, container.height);
        labelRenderer.setSize(container.width, container.height);
        render();
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        var time = Date.now() * 0.0004;
        root.rotation.x = time;
        root.rotation.y = time * 0.7;
        render();
    }

    function render() {
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }
}