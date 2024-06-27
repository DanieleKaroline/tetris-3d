import * as THREE from 'three';

export function createCube(color) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshToonMaterial({ color, wireframe: true, wireframeLinecap: 'round' });
    return new THREE.Mesh(geometry, material);
}

export function createIPiece() {
    const group = new THREE.Group();
    const color = 0x00f0f0; 
    for (let i = 0; i < 4; i += 1) {
        const cube = createCube(color);
        cube.position.set(i, 0, 0);
        group.add(cube);
    }
    return group;
}

export function createOPiece() {
    const group = new THREE.Group();
    const color = 0x00f0f0; 
    const positions = [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

export function createZPiece() {
    const group = new THREE.Group();
    const color = 0xff0000; 
    const positions = [
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 1, y: 1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

export function createLPiece() {
    const group = new THREE.Group();
    const color = 0xffa500; 
    const positions = [
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

export function createTPiece() {
    const group = new THREE.Group();
    const color = 0x800080; 
    const positions = [
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

export function createJPiece() {
    const group = new THREE.Group();
    const color = 0x0000ff; 
    const positions = [
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 }
    ];
    positions.forEach(pos => {
        const cube = createCube(color);
        cube.position.set(pos.x, pos.y, pos.z);
        group.add(cube);
    });
    return group;
}

export function createSPiece() {
    const group = new THREE.Group();
    const color = 0x00ff00; 
    const positions = [
        { x: 1, y: 1, z: 0 },
        { x: 0, y: 1, z: 0 },
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

export function getRandomPiece() {
    const pieces = [
        // createIPiece, 
        createOPiece, 
        // createZPiece, 
        // createLPiece, 
        // createTPiece, 
        // createJPiece, 
        // createSPiece
    ];
    const index = Math.floor(Math.random() * pieces.length);
    return pieces[index]();
}