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
    camera.position.z = 0.49;
    ((gl.toneMapping = THREE.ReinhardToneMapping),
      (gl.outputColorSpace = THREE.SRGBColorSpace));
  });

  const dogTextures = useTexture({
    normal_map: "/dog_normals.jpg",
    sample_matcap: "/matcap/mat-2.png",
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
    matcap: dogTextures.sample_matcap,
  });
  const branchMaterial = new THREE.MeshMatcapMaterial({
    map: branchTextures.branch_map,
    normalMap: branchTextures.branch_normal,
  });

  dog.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    } else {
      child.material = branchMaterial;
    }
  });

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
