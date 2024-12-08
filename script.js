const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xffffff, 50, 500);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".model").appendChild(renderer.domElement);

  
  const ambientLight = new THREE.AmbientLight(0x404040, 4); 
  scene.add(ambientLight);
  

  const moonLight = new THREE.DirectionalLight(0x9ab0ff, 0.5);
  moonLight.position.set(-5, 10, -5);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.width = 1024;
  moonLight.shadow.mapSize.height = 1024;
  moonLight.shadow.camera.near = 0.5;
  moonLight.shadow.camera.far = 50;
  moonLight.receiveShadow = true;
  scene.add(moonLight);

  const spotlight = new THREE.SpotLight(0xff0000, 1, 10, Math.PI / 6, 0.5);
  spotlight.position.set(0, 5, 5);
  spotlight.castShadow = true;
  scene.add(spotlight);
  
  const pointLight = new THREE.PointLight(0x00ff00, 1, 5); 
  pointLight.position.set(2, 2, -3);
  scene.add(pointLight);
  
  const pointLight2 = new THREE.PointLight(0xff00ff, 1, 5); 
  pointLight2.position.set(-3, 1, 4);
  scene.add(pointLight2);
  

const light = new THREE.PointLight("#ffffff",1,5);
light.position.set(-3,1,4);
scene.add(light);


const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      document.getElementById('loading').style.display = 'block'; // Show loading message
    };
    loadingManager.onLoad = () => {
      document.getElementById('loading').style.display = 'none'; // Hide loading message when done
    };


const fontLoader = new THREE.FontLoader();

fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    (font) => {
      const textGeometry = new THREE.TextGeometry('Haunted House', {
        font: font,
        size: .5,
        height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
      });
  
  
      const textMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff" });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textGeometry.translate(-2.3,-1.2,5.5)   
      scene.add(textMesh);
    },
    undefined,
    (error) => {
      console.error('Font failed to load:', error);
    }
  );



let model;

const loader = new THREE.GLTFLoader(loadingManager);

loader.load("./model/scene.gltf",(gltf)=>{
    model = gltf.scene

    model.scale.set(4.5,4.5,4.5);
    model.position.set(0, 0, 3);
    scene.add(model)
})
  


const controls = new THREE.OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


const animate = () => {
  renderer.render(scene, camera);
  controls.update()
  requestAnimationFrame(animate);

};
animate();
