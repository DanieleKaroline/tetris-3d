import * as THREE from 'three';

export function createCube(color) {
    const geometry = new THREE.BoxGeometry(.999,.999,.999);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.MeshToonMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(wireframe);
    return mesh;
}

export function getRandomPiece() {
    const pieces = [
        createIPiece, 
        createOPiece, 
        createZPiece, 
        createLPiece, 
        createTPiece, 
        createJPiece, 
        createSPiece
    ];
    const index = Math.floor(Math.random() * pieces.length);
    console.log(`Called ${pieces[index].name}`);
    return pieces[index]();
}

export function createIPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
    for (let i = -1; i <= 2; i += 1) {
        const cube = createCube(color);
        cube.position.set(i, 0, 0);
        group.add(cube);
    }
    return group;
}

export function createOPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
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

export function createZPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor();
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

export function createLPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
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

export function createTPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
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

export function createJPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
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

export function createSPiece() {
    const group = new THREE.Group();
    const color = getRandomCOlor(); 
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

// return from an array of pastel colors
function getRandomCOlor() {
    const colors = [
        0xffc0cb,  // Light Pink
        0xffe4b5,  // Moccasin
        0xdda0dd,  // Plum
        0xadd8e6,  // Light Blue
        0x98fb98,  // Pale Green
        0xffdab9,  // Peach Puff
        0xffb6c1,  // Light Coral
        0xffefd5,  // Papaya Whip
        0xfffacd,  // Lemon Chiffon
        0xe6e6fa,  // Lavender
        0xd8bfd8,  // Thistle
        0xd3ffce,  // Light Sea Green
        0xf5deb3,  // Wheat
        0xffffe0,  // Light Yellow
        0x87cefa,  // Light Sky Blue
        0xafeeee,  // Pale Turquoise
        0xf0e68c,  // Khaki
        0xe0ffff,  // Light Cyan
        0xf5f5dc,  // Beige
        0xfff0f5   // Lavender Blush
    ];    
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}