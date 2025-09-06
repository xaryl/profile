var container;
var camera, scene, renderer;
var uniforms, material, points;
var mouse = new THREE.Vector2();
var mouseWorld = new THREE.Vector2();

init();
animate();

function init() {
    container = document.getElementById('container');

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();

    const numPoints = 40000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    const randoms = new Float32Array(numPoints * 3);

    const areaSize = 5;

    for (let i = 0; i < numPoints; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * areaSize;
        positions[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
        positions[i * 3 + 2] = 0;

        randoms[i * 3 + 0] = Math.random();
        randoms[i * 3 + 1] = Math.random();
        randoms[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        mouse: { type: "v2", value: new THREE.Vector2() },
        speed: { type: "f", value: 0.05 }
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    uniforms.resolution.value.set(width, height);

    const aspect = width / height;
    const viewHeight = 2.0;
    const viewWidth = viewHeight * aspect;

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    uniforms.time.value += uniforms.speed.value;

    const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vec.unproject(camera);
    mouseWorld.set(vec.x, vec.y);

    uniforms.mouse.value.copy(mouseWorld);

    renderer.render(scene, camera);
}