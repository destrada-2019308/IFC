let scene = new THREE.Scene()
            scene.background = new THREE.Color(0x7a7a7a)
            let camera = new THREE.PerspectiveCamera(
                75, window.innerWidth/window.innerHeight
            )

            let renderer = new THREE.WebGLRenderer()
            renderer.setSize(window.innerWidth, window.innerHeight)

            document.body.appendChild(renderer.domElement)

            let geometry = new THREE.BoxGeometry()
            let material = new THREE.MeshBasicMaterial({color: 0x000, wireframe: true})
            let cube = new THREE.Mesh(geometry, material)

            scene.add(cube)
            camera.position.z= 5
            
            const animate = () =>{
                requestAnimationFrame(animate)

                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                
                renderer.render(scene, camera)

            }
            
            animate()
