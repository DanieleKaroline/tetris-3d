import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(15, 20, 30);
camera.lookAt(0, 0, 0);
const controls = new OrbitControls(camera, renderer.domElement);


function createThreeSidedGrid() {
    const size = 10;
    const divisions = 10; 
    const color = new THREE.Color("gray"); 

    const group = new THREE.Group();

    const baseGrid = new THREE.GridHelper(size, divisions, color, color);
    baseGrid.position.y = -size / 2; 
    group.add(baseGrid);

    const leftGrid = new THREE.GridHelper(size, divisions, color, color);
    leftGrid.rotation.x = Math.PI / 2;
    leftGrid.rotation.z = Math.PI / 2;
    leftGrid.position.x = -size / 2;
    group.add(leftGrid);

    const backGrid = new THREE.GridHelper(size, divisions, color, color);
    backGrid.rotation.x = Math.PI / 2;
    backGrid.position.z = -size / 2;
    group.add(backGrid);

    scene.add(group);
}

createThreeSidedGrid();


function createCube(color) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(geometry, material);
}

function createIPiece() {
    const group = new THREE.Group();
    const color = 0x00f0f0; 
    for (let i = -1.5; i <= 1.5; i += 1) {
        const cube = createCube(color);
        cube.position.set(i, 0, 0);
        group.add(cube);
    }
    return group;
}

function createOPiece() {
    const group = new THREE.Group();
    const color = 0x00f0f0; 
    const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 1, y: -1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}
function createZPiece() {
    const group = new THREE.Group();
    const color = 0xff0000; 
    const positions = [
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 1, y: -1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

function createLPiece() {
    const group = new THREE.Group();
    const color = 0xffa500; 
    const positions = [
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: -1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

function createTPiece() {
    const group = new THREE.Group();
    const color = 0x800080; 
    const positions = [
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: -1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

function createJPiece() {
    const group = new THREE.Group();
    const color = 0x0000ff; 
    const positions = [
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: -1, y: -1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

function createSPiece() {
    const group = new THREE.Group();
    const color = 0x00ff00; 
    const positions = [
        { x: -1, y: -1, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

function getRandomPiece() {
    const pieces = [createIPiece, createOPiece, createZPiece, createLPiece, createTPiece, createJPiece, createSPiece];
    const index = Math.floor(Math.random() * pieces.length);
    return pieces[index]();
}

let currentPiece = null;

function dropPiece() {
    if (currentPiece === null) {
        currentPiece = getRandomPiece();
        currentPiece.position.y = 10; 
        scene.add(currentPiece);
    }
}

function updatePiecePosition() {
    if (currentPiece) {
        currentPiece.position.y -= 0.03; 
        if (currentPiece.position.y <= 0) {
            currentPiece.position.y = 0;
            currentPiece = null; 
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    dropPiece(); 
    updatePiecePosition(); 
    controls.update();
    renderer.render(scene, camera);
}

animate();