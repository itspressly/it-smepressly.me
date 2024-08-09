import * as THREE from 'three';
import './styles.css'
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//Scene
const scene = new THREE.Scene();


//Create the sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshStandardMaterial({
	color: "#00ff83",
	roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
}


//light
const light = new THREE.PointLight(0xffffff, 56, 100)
light.position.set(0, 10, 10)
scene.add(light)
//camera

const camera = new THREE.PerspectiveCamera(
	45, 
	sizes.width / sizes.height, 
	0.1, 
	100
)
camera.position.z = 20
scene.add(camera)




//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 6


window.addEventListener("resize", () => {
	//update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	//update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()
	renderer.setSize(sizes.width, sizes.height)
})

const loop = ()  => {
	controls.update()
	renderer.render(scene,camera);
	window.requestAnimationFrame(loop);
 
}
loop();


//TImeline magic

const tl = gsap.timeline({default: {duration: 1} })
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z: 1, x: 1, y:1})

tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", { opacity: 0}, {opacity: 1})

//Mouse animation color
let mouseDonwn = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDonwn = true))

window.addEventListener('mouseup', () => (mouseDonwn = false))

window.addEventListener('mousemove', (e) => {
	if (mouseDonwn) {
		rgb = [
			Math.round((e.pageX / sizes.width) * 255),
			Math.round((e.pageX / sizes.height) * 255),
			150,
		]
		//Let's animate
		let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
		gsap.to(mesh.material.color, {
			r: newColor.r, 
			g: newColor.g, 
			b: newColor.b
		})
	}
})