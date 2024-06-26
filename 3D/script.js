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

let gameStarted = false;

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
        startFalling(); // Função hipotética para iniciar a queda da primeira peça
    }
}

function resetGame() {
    gameStarted = false;
    resetTimer();
    resetGameBoard(); // Função hipotética para reiniciar o jogo
}

// Supondo que as funções startTimer e resetTimer já estejam implementadas conforme o trecho de código anterior

// Função hipotética para iniciar a queda da primeira peça
function startFalling() {
    // Define a função que será chamada a cada intervalo de tempo para fazer a peça cair
    const fall = () => {
        if (!currentPiece) { // Se não houver uma peça atual, obtém uma nova peça
            currentPiece = getRandomPiece();
            currentPiece.position.y = 10; // Posiciona a nova peça no topo
            scene.add(currentPiece);
        } else {
            // Se a peça atual já chegou ao fundo (posição y <= 0), prepara para a próxima peça
            if (currentPiece.position.y <= 0) {
                currentPiece = null;
            } else {
                // Se a peça ainda não chegou ao fundo, continua a cair
                currentPiece.position.y -= 0.03;
            }
        }
    };

    // Inicia o loop de queda chamando a função 'fall' a cada 100 milissegundos
    setInterval(fall, 100);
}

function resetGameBoard() {
    // Remove a peça atual do jogo, se houver
    if (currentPiece) {
        scene.remove(currentPiece);
        currentPiece = null;
    }

    // Limpa todas as peças do tabuleiro
    // Isso é feito removendo todos os objetos da cena que são do tipo THREE.Group,
    // que é o tipo usado para agrupar os cubos de cada peça.
    scene.children = scene.children.filter(child => !(child instanceof THREE.Group));

    // Reinicia o estado do jogo
    gameStarted = false;

    // Pode-se adicionar mais lógica aqui, se necessário, para reiniciar outros aspectos do jogo
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('resetButton').addEventListener('click', resetGame);
function animate() {
    requestAnimationFrame(animate);
    dropPiece(); 
    updatePiecePosition(); 
    controls.update();
    renderer.render(scene, camera);
}

animate();