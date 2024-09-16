 
    // Crear la escena, la cámara y el renderizador
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 150, 1000000);
    var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("modelCanvas") });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Añadir OrbitControls para controlar la cámara
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.15;
    controls.enableZoom = true;

    // Añadir una luz básica
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 0);
    scene.add(light);

    // Cargar el modelo GLTF
    var loader = new THREE.GLTFLoader();
    loader.load('./bin-gltf/model.gltf', function (gltf) {
        scene.add(gltf.scene);
        camera.position.z = 100;

        // Recorre todos los objetos y muestra sus propiedades
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                console.log('Objeto:', child.name);
                console.log('Atributos del objeto:', child.userData);
                // Aquí deberías ver todos los datos personalizados disponibles
            }
        });

        renderer.render(scene, camera);
    });

    // Configurar Raycaster para detectar clics
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            console.log('Objeto clicado:', intersects[0].object);
            console.log('Datos del objeto:', intersects[0].object.userData);
            // Aquí debes ver los datos personalizados como GlobalId si están presentes
        }
    }

    window.addEventListener('click', onMouseClick, false);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
 
