import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { checker } from 'three/examples/jsm/nodes/Nodes.js';
import { getRandomPiece } from './pieces.js';

const scene = new THREE.Scene();
// add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
// add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 15, 10);
scene.add(directionalLight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(6, 5, 30);
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


let currentPiece = null;

function dropPiece() {
    if (currentPiece === null) {
        currentPiece = getRandomPiece();
        currentPiece.position.y = 4.5; 
        scene.add(currentPiece);
    }
}

function updatePiecePosition() {
    if (currentPiece) {
        currentPiece.position.y -= 0.02;

        // Check for collision with all other pieces in the scene
        for (let otherPiece of scene.children) {
            if (otherPiece !== currentPiece && checkCollision(currentPiece, otherPiece)) {
                // Collision detected, stop moving the current piece
                currentPiece = null;
                break;
            }
        }

        // Check if the piece has reached the bottom
        if (currentPiece && currentPiece.position.y <= -4.5) {
            currentPiece = null;
        }
    }
}

function checkCollision(group1, group2) {
    for (let obj1 of group1.children) {
        const box1 = new THREE.Box3().setFromObject(obj1);

        for (let obj2 of group2.children) {
            const box2 = new THREE.Box3().setFromObject(obj2);

            if (box1.intersectsBox(box2)) {
                return true;
            }
        }
    }

    return false;
}

function animate() {
    requestAnimationFrame(animate);
    dropPiece(); 
    updatePiecePosition(); 
    renderer.render(scene, camera);
}

animate();


document.addEventListener('keypress', (event) => {
    if (event.key === 'p') {
        console.log(currentPiece);
    }
    if (event.key === 'i') {
        console.log(scene.children);
    }

    if (event.key === 'a') {
        if (currentPiece) {
            currentPiece.position.x -= 1;
        }
    }
    if (event.key === 'd') {
        if (currentPiece) {
            currentPiece.position.x += 1;
        }
    }
    if (event.key === 'w') {
        if (currentPiece) {
            currentPiece.position.z -= 1;
        }
    }
    if (event.key === 's') {
        if (currentPiece) {
            currentPiece.position.z += 1;
        }
    }

    if (event.key === 'A') {
        if (currentPiece) {
            currentPiece.rotation.y += Math.PI / 2;
        }
    }
    if (event.key === 'D') {
        if (currentPiece) {
            currentPiece.rotation.y -= Math.PI / 2;
        }
    }
    if (event.key === 'W') {
        if (currentPiece) {
            currentPiece.rotation.x += Math.PI / 2;
        }
    }
});
