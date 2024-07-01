import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { getRandomPiece } from './pieces.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(6, 5, 30);
camera.lookAt(0, 0, 0);
new OrbitControls(camera, renderer.domElement);
let currentPiece = null;
let colisionEnabled = true;
let gameOver = false;

init();

function init() {
    createThreeSidedGrid();
    addLights();
    setInterval(updatePiecePosition, 500); // Set the interval to half a second
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (!gameOver) {
        dropPiece();
    }

    renderer.render(scene, camera);
}


function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);
}

function createThreeSidedGrid() {
    const size = 10;
    const divisions = 10; 
    const color = new THREE.Color("gray"); 

    const group = new THREE.Group();
    group.name = "Grids"

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

function dropPiece() {
    if (currentPiece === null) {
        currentPiece = getRandomPiece();
        currentPiece.position.y = 4.5;
        currentPiece.name = `Piece (${scene.children.length})`;
        scene.add(currentPiece);
    }
}

function updatePiecePosition() {
    if (currentPiece && colisionEnabled) {
        currentPiece.position.y -= .9;

        if (colidesWithSceneObjects(currentPiece)) {
            currentPiece.position.y += 1;
            // scene.add(currentPiece);

            if (currentPiece.position.y > 4.4){
                console.log("Game Over");
                gameOver = true;
            }

            currentPiece = null;
        }
    }
}

function colidesWithSceneObjects(piece, excludedGroupsUuid = []) {
    // Check for collision with all other pieces in the scene
    for (let otherPiece of scene.children) {
        if (otherPiece !== piece && !excludedGroupsUuid.includes(otherPiece.uuid) && checkCollision(piece, otherPiece)) {
            // Collision detected, stop moving the current piece
            return true;
        }
    }

    return false;
}

function checkCollision(group1, group2) {
    for (let obj1 of group1.children) {
        const box1 = new THREE.Box3().setFromObject(obj1);

        for (let obj2 of group2.children) {
            const box2 = new THREE.Box3().setFromObject(obj2);

            if (box1.intersectsBox(box2)) {
                console.log("Collision detected between:\n\t", 
                    group1.name, "\n\tand", group2.name);

                console.log("Intersection occurs at:", box1.intersect(box2));
                return true;
            }
        }
    }

    return false;
}

// direction is a char for the wasd or WASD keys
function boundryCheck(direction) {
    if (gameOver || !currentPiece) {
        console.log("Game Over or no current piece");
        return false;
    }

    let canMove = true;
    colisionEnabled = false; // Disable colision behavior so the piece doesn't stop

    let colisionTester = currentPiece.clone();
    colisionTester.visible = false;
    scene.add(colisionTester);
    
    //if the clone moves to the direction typed and finds a colision, return false
    switch (direction) {
        case 'a':
            moveLeft(colisionTester);
            break;
        case 'd':
            moveRight(colisionTester);
            break;
        case 'w':
            moveUp(colisionTester);
            break;
        case 's':
            moveDown(colisionTester);
            break;
        case 'A':
            rotateClockwise(colisionTester);
            break;
        case 'D':
            rotateCounterClockwise(colisionTester);
            break;
        case 'W':
            rotateUp(colisionTester);
            break;
        case 'S':
            rotateDown(colisionTester);
            break;
    }

    if (colidesWithSceneObjects(colisionTester, [currentPiece.uuid])) {
        canMove = false;
    }

    scene.remove(colisionTester);
    colisionEnabled = true;
    return canMove;
}

document.addEventListener('keypress', (event) => {
    if (event.key === 'p' ) {
        console.log(currentPiece);
    }
    if (event.key === 'i') {
        console.log(scene.children);
    }

    switch (event.key) {
        case 'a':
            moveLeft(currentPiece);
            break;
        case 'd':
            moveRight(currentPiece);
            break;
        case 'w':
            moveUp(currentPiece);
            break;
        case 's':
            moveDown(currentPiece);
            break;
        case 'A':
            rotateClockwise(currentPiece);
            break;
        case 'D':
            rotateCounterClockwise(currentPiece);
            break;
        case 'W':
            rotateUp(currentPiece);
            break;
        case 'S':
            rotateDown(currentPiece);
            break;
    }
})


function moveLeft(piece) {
    if(piece) {
        piece.position.x += -1;
    }
}

function moveRight(piece) {
    if (piece) {
        piece.position.x += 1;
    }
}

function moveUp(piece) {
    if (piece) {
        piece.position.z -= 1;
    }
}

function moveDown(piece) {
    if (piece) {
        piece.position.z += 1;
    }
}

function rotateClockwise(piece) {
    if (piece) {
        piece.rotation.y += Math.PI / 2;
    }
}

function rotateCounterClockwise(piece) {
    if (piece) {
        piece.rotation.y -= Math.PI / 2;
    }
}

function rotateUp(piece) {
    if (piece) {
        piece.rotation.x += Math.PI / 2;
    }
}

function rotateDown(piece) {
    if (piece) {
        piece.rotation.x -= Math.PI / 2;
    }
}