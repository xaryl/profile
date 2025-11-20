var container;
var camera, scene, renderer;
var uniforms, material, mesh;

init();
animate();

function init() {
    container = document.getElementById('container');

    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    scene = new THREE.Scene();

    const geometry = new THREE.PlaneGeometry(2, 2);

    uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2() }
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    onWindowResize();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    uniforms.u_resolution.value.set(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}