import {
  OrbitControls,
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Scene } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const Dog = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  const dog = useGLTF("/models/dog.drc.glb");
  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.38;
    // camera.rotation.x = 0.5;
    ((gl.toneMapping = THREE.ReinhardToneMapping),
      (gl.outputColorSpace = THREE.SRGBColorSpace));
  });

  const [
    mat1,
    mat2,
    mat3,
    mat4,
    mat5,
    mat6,
    mat7,
    mat8,
    mat9,
    mat10,
    mat11,
    mat12,
    mat13,
    mat14,
    mat15,
    mat16,
    mat17,
    mat18,
    mat19,
    mat20,
  ] = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
    "/matcap/mat-20.png",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const dogTextures = useTexture({
    normal_map: "/dog_normals.jpg",
  });

  Object.values(dogTextures).forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const branchTextures = useTexture({
    branch_map: "/branches_diffuse.jpeg",
    branch_normal: "/branches_normals.jpeg",
  });

  Object.values(branchTextures).forEach((texture) => {
    texture.flipY = true;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap: dogTextures.normal_map,
    matcap: mat2,
  });
  const branchMaterial = new THREE.MeshMatcapMaterial({
    map: branchTextures.branch_map,
    normalMap: branchTextures.branch_normal,
  });

  const material = useRef({
    uMatcap1: { value: mat19 },
    uMatcap2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
    shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
    shader.uniforms.uProgress = material.current.uProgress;

    // Store reference to shader uniforms for GSAP animation

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
        uniform sampler2D uMatcapTexture1;
        uniform sampler2D uMatcapTexture2;
        uniform float uProgress;

        void main() {
        `,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
          vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
          vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
          float transitionFactor  = 0.0 ;
          
          float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5 + 0.5);

          vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
        `,
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;

  dog.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

  useEffect(() => {
    document
      .querySelector(`.title[image-title="tommorowland"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat19;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="phone"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat12;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="navy-pier"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="opera"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat13;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="msi-chicago"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat9;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="kikk"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat10;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

    document
      .querySelector(`.title[image-title="kennedy"]`)
      .addEventListener("mouseenter", () => {
        material.current.uMatcap1.value = mat8;
        gsap.to(material.current.uProgress, {
          value: 0.0,
          duration: 0.3,
          onComplete: () => {
            material.current.uMatcap2.value = material.current.uMatcap1.value;
            material.current.uProgress.value = 1.0;
          },
        });
      });

   document.querySelector(`.titles`).addEventListener("mouseleave", () => {
     material.current.uMatcap1.value = mat2;

     gsap.to(material.current.uProgress, {
       value: 0.0,
       duration: 0.3,
       onComplete: () => {
         material.current.uMatcap2.value = material.current.uMatcap1.value;
         material.current.uProgress.value = 1.0;
       },
     });
   });
  }, []);

  const { actions } = useAnimations(dog.animations, dog.scene);
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const model = useRef(dog);

  useGSAP(() => {
    gsap.to(model.current.scene.position, {
      z: "-0.7",
      scrollTrigger: {
        trigger: "#section-1",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });
    gsap.to(model.current.scene.rotation, {
      x: "0.15",
      scrollTrigger: {
        trigger: "#section-2",
        start: "top 40%",
        end: "top 0%",
        scrub: true,
        // markers: true,
      },
    });
    gsap.to(model.current.scene.rotation, {
      y: "-2.2",
      scrollTrigger: {
        trigger: "#section-2",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });
    gsap.to(model.current.scene.scale, {
      x: "1.7",
      y: "1.7",
      z: "1.7",
      scrollTrigger: {
        trigger: "#section-2",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });
    gsap.to(model.current.scene.position, {
      x: "-0.4",
      y: "-0.8",
      // z: "-0.5",
      scrollTrigger: {
        trigger: "#section-2",
        start: "top 0%",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });
  });

  return (
    <>
      <primitive
        object={dog.scene}
        position={[0.18, -0.6, 0]}
        rotation={[0, 0.67, 0]}
      />
      <directionalLight position={[0, 0, 5]} intensity={10} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default Dog;
