"use client";

import React, { useEffect, useRef, useState } from "react";

// For TypeScript, since THREE is loaded via CDN //
declare global {
  interface Window {
    THREE: any;
  }
}

interface Landing3DProps {
  onEnter: (section: string) => void;
}

export default function Landing3D({ onEnter }: Landing3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  const [stats, setStats] = useState({ projects: 0, experience: 0, clients: 0 });
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let script = document.querySelector("#threejs-cdn") as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.id = "threejs-cdn";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      document.body.appendChild(script);
    }

    let reqId: number;
    let scene: any, camera: any, renderer: any;
    // We store these to clean up
    const objectsToClean: any[] = [];
    
    // Mouse coords
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const initThree = () => {
      const THREE = window.THREE;
      if (!THREE || !mountRef.current) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 18);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      const trackCleanup = (item: any) => {
        objectsToClean.push(item);
        return item;
      };

      // 1. CENTRAL HERO OBJECT
      const icosahedronGeoWire = trackCleanup(new THREE.IcosahedronGeometry(2, 1));
      const icosahedronMatWire = trackCleanup(new THREE.MeshBasicMaterial({ color: 0x0fca9a, wireframe: true, transparent: true, opacity: 0.15 }));
      const icosaWire = new THREE.Mesh(icosahedronGeoWire, icosahedronMatWire);
      scene.add(icosaWire);

      const icosahedronGeoSolid = trackCleanup(new THREE.IcosahedronGeometry(1.9, 0));
      const icosahedronMatSolid = trackCleanup(new THREE.MeshPhongMaterial({
        color: 0x081110,
        emissive: 0x0fca9a,
        emissiveIntensity: 0.2,
        specular: 0x0fca9a,
        shininess: 100,
        flatShading: true
      }));
      const icosaSolid = new THREE.Mesh(icosahedronGeoSolid, icosahedronMatSolid);
      scene.add(icosaSolid);

      // 2. ORBITAL RINGS
      const rings: any[] = [];
      const ringSpecs = [
        { r: 5, c: 0x0fca9a, tiltX: 1.047, tiltY: 0 }, // 60 deg
        { r: 6.5, c: 0xff3d6e, tiltX: 0.628, tiltY: 0 }, // 36 deg
        { r: 7.8, c: 0x3d6eff, tiltX: 1.431, tiltY: 0 }, // 82 deg
      ];
      ringSpecs.forEach((spec) => {
        const geo = trackCleanup(new THREE.TorusGeometry(spec.r, 0.015, 8, 80));
        const mat = trackCleanup(new THREE.MeshBasicMaterial({ color: spec.c, transparent: true, opacity: 0.4 }));
        const ring = new THREE.Mesh(geo, mat);
        ring.rotation.x = spec.tiltX;
        ring.rotation.y = spec.tiltY;
        scene.add(ring);
        rings.push(ring);
      });

      // 3. SATELLITES
      const satellitesGeo1 = trackCleanup(new THREE.OctahedronGeometry(1, 0));
      const satellitesGeo2 = trackCleanup(new THREE.TetrahedronGeometry(1, 0));
      const satColors = [0x0fca9a, 0xff3d6e, 0x3d6eff, 0xffffff, 0xffb000];
      const satellites: any[] = [];
      for (let i = 0; i < 8; i++) {
        const mat = trackCleanup(new THREE.MeshPhongMaterial({
          color: satColors[i % satColors.length],
          emissive: satColors[i % satColors.length],
          emissiveIntensity: 0.4,
          flatShading: true
        }));
        const mesh = new THREE.Mesh(i % 2 === 0 ? satellitesGeo1 : satellitesGeo2, mat);
        const scale = 0.15 + Math.random() * 0.2;
        mesh.scale.set(scale, scale, scale);
        
        const r = 5.5 + Math.random() * 2;
        const speed = (0.5 + Math.random()) * 0.001 * (i % 2 === 0 ? 1 : -1);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        satellites.push({ mesh, r, speed, theta, phi });
        scene.add(mesh);
      }

      // 4. PARTICLE FIELD
      const ptsGeo = trackCleanup(new THREE.BufferGeometry());
      const ptsCount = 800;
      const ptsPos = new Float32Array(ptsCount * 3);
      const ptsColors = new Float32Array(ptsCount * 3);
      const colorArr = [new THREE.Color(0x0fca9a), new THREE.Color(0xff3d6e), new THREE.Color(0x3d6eff), new THREE.Color(0xffffff)];

      for (let i = 0; i < ptsCount; i++) {
        const r = 8 + Math.random() * 14;
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        
        ptsPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
        ptsPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        ptsPos[i*3+2] = r * Math.cos(phi);

        const col = colorArr[Math.floor(Math.random() * colorArr.length)];
        ptsColors[i*3] = col.r;
        ptsColors[i*3+1] = col.g;
        ptsColors[i*3+2] = col.b;
      }
      ptsGeo.setAttribute('position', new THREE.BufferAttribute(ptsPos, 3));
      ptsGeo.setAttribute('color', new THREE.BufferAttribute(ptsColors, 3));
      
      const ptsMat = trackCleanup(new THREE.PointsMaterial({
        size: 0.06, vertexColors: true, transparent: true, opacity: 0.7
      }));
      const particleCloud = new THREE.Points(ptsGeo, ptsMat);
      scene.add(particleCloud);

      // 5. FLOATING DEBRIS
      const debrisGeos = [
        trackCleanup(new THREE.OctahedronGeometry(1, 0)),
        trackCleanup(new THREE.TetrahedronGeometry(1, 0)),
        trackCleanup(new THREE.BoxGeometry(1, 1, 1)),
        trackCleanup(new THREE.ConeGeometry(0.5, 1, 4))
      ];
      const debrisMatsList = [
        trackCleanup(new THREE.MeshBasicMaterial({ color: 0x0fca9a, wireframe: true, transparent: true, opacity: 0.3 })),
        trackCleanup(new THREE.MeshPhongMaterial({ color: 0x081110, emissive: 0x3d6eff, emissiveIntensity: 0.2, transparent: true, opacity: 0.6 }))
      ];
      const debrisMshs: any[] = [];
      
      for (let i = 0; i < 18; i++) {
        const dgeo = debrisGeos[i % debrisGeos.length];
        const isWire = Math.random() < 0.4;
        const dmat = isWire ? debrisMatsList[0] : debrisMatsList[1];
        
        const dmesh = new THREE.Mesh(dgeo, dmat);
        const scale = 0.2 + Math.random() * 0.4;
        dmesh.scale.set(scale, scale, scale);
        
        dmesh.position.x = (Math.random() - 0.5) * 24;
        dmesh.position.y = (Math.random() - 0.5) * 12;
        dmesh.position.z = (Math.random() - 0.5) * 12;
        
        const floatSpeed = 0.001 + Math.random() * 0.002;
        const floatAmp = 0.3 + Math.random() * 0.5;
        const rotSpeed = { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 };
        const baseY = dmesh.position.y;
        
        debrisMshs.push({ mesh: dmesh, floatSpeed, floatAmp, baseY, rotSpeed, timer: Math.random() * 100 });
        scene.add(dmesh);
      }

      // 6. PERSPECTIVE GRID FLOOR
      const grid = new THREE.GridHelper(40, 30, 0x0fca9a, 0x021110);
      grid.position.y = -10;
      grid.material.transparent = true;
      grid.material.opacity = 0.15;
      trackCleanup(grid.material);
      trackCleanup(grid.geometry);
      scene.add(grid);

      // 7. LIGHTING
      const ambLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambLight);

      const dirLight1 = new THREE.DirectionalLight(0x0fca9a, 2);
      dirLight1.position.set(5, 5, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xff3d6e, 1.5);
      dirLight2.position.set(-5, -3, 3);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0x0fca9a, 2.5);
      scene.add(pointLight);

      let lastTime = performance.now();
      let clockTime = 0;

      const renderLoop = (time: number) => {
        let delta = time - lastTime;
        if (delta > 50) delta = 50; 
        lastTime = time;
        clockTime += delta;

        // Animations
        icosaWire.rotation.y += 0.001 * delta;
        icosaWire.rotation.x += 0.0005 * delta;
        icosaSolid.rotation.y -= 0.0008 * delta;
        icosaSolid.rotation.z -= 0.0004 * delta;
        
        const pulse = 0.2 + (Math.sin(clockTime * 0.002) + 1) * 0.25; 
        icosahedronMatSolid.emissiveIntensity = pulse;

        rings[0].rotation.z += 0.0005 * delta;
        rings[1].rotation.z -= 0.0004 * delta;
        rings[2].rotation.y += 0.0006 * delta;

        satellites.forEach((s) => {
          s.theta += s.speed * delta;
          s.mesh.position.set(s.r * Math.cos(s.theta) * Math.sin(s.phi), s.r * Math.cos(s.phi), s.r * Math.sin(s.theta) * Math.sin(s.phi));
          s.mesh.rotation.x += 0.002 * delta;
          s.mesh.rotation.y += 0.002 * delta;
        });

        particleCloud.rotation.y += 0.0001 * delta;
        particleCloud.position.x = Math.sin(clockTime * 0.0005) * 1.5;

        debrisMshs.forEach((d) => {
          d.timer += delta;
          d.mesh.position.y = d.baseY + Math.sin(d.timer * d.floatSpeed) * d.floatAmp;
          d.mesh.rotation.set(d.mesh.rotation.x + d.rotSpeed.x, d.mesh.rotation.y + d.rotSpeed.y, d.mesh.rotation.z + d.rotSpeed.z);
        });

        grid.position.y = -10 + Math.sin(clockTime * 0.001) * 0.5;

        pointLight.position.set(Math.cos(clockTime * 0.001) * 8, Math.sin(clockTime * 0.0005) * 4, Math.sin(clockTime * 0.001) * 8);
        pointLight.intensity = 2.5 + Math.sin(clockTime * 0.003) * 1.5;

        const targetX = (mouseX / windowHalfX) * 2.5;
        const targetY = -(mouseY / windowHalfY) * 1.5;
        camera.position.x += (targetX - camera.position.x) * 0.03;
        camera.position.y += (targetY - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        reqId = requestAnimationFrame(renderLoop);
      };
      
      reqId = requestAnimationFrame(renderLoop);
    };

    if (window.THREE) {
      initThree();
    } else {
      script.addEventListener('load', initThree);
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    let cursorRingX = windowHalfX, cursorRingY = windowHalfY;
    let cursorAnimId: number;
    const animateCursor = () => {
       cursorRingX += ((mouseX + windowHalfX) - cursorRingX) * 0.15;
       cursorRingY += ((mouseY + windowHalfY) - cursorRingY) * 0.15;
       if (cursorRingRef.current) {
         cursorRingRef.current.style.transform = `translate3d(${cursorRingX}px, ${cursorRingY}px, 0)`;
       }
       cursorAnimId = requestAnimationFrame(animateCursor);
    };
    cursorAnimId = requestAnimationFrame(animateCursor);

    window.addEventListener("mousemove", mouseMoveHandler, { passive: true });
    
    // FPS counter
    const fpsElem = document.getElementById("hud-fps");
    let frames = 0;
    let prevTime = performance.now();
    const fpsInterval = setInterval(() => {
      if (fpsElem) {
        const time = performance.now();
        const fps = Math.round((frames * 1000) / (time - prevTime));
        fpsElem.innerText = `${fps} FPS`;
        frames = 0;
        prevTime = time;
      }
    }, 1000);
    
    let frameHookId: number;
    const countFrame = () => {
      frames++;
      frameHookId = requestAnimationFrame(countFrame);
    };
    frameHookId = requestAnimationFrame(countFrame);

    return () => {
      if (script) script.removeEventListener('load', initThree);
      window.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(reqId);
      cancelAnimationFrame(cursorAnimId);
      cancelAnimationFrame(frameHookId);
      clearInterval(fpsInterval);
      
      if (renderer) renderer.dispose();
      objectsToClean.forEach(obj => obj.dispose && obj.dispose());
      if (scene) scene.clear();
      
      // Attempt to clean dom element
      if (mountRef.current && mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, []);

  useEffect(() => {
    let tId = setTimeout(() => {
      let start = performance.now();
      const duration = 2000;
      let frameId: number;
      const updateStats = (time: number) => {
        let progress = (time - start) / duration;
        if (progress > 1) progress = 1;
        const ease = 1 - Math.pow(1 - progress, 4);
        setStats({
          projects: Math.floor(42 * ease),
          experience: Math.floor(4 * ease)
        });
        if (progress < 1) frameId = requestAnimationFrame(updateStats);
      };
      frameId = requestAnimationFrame(updateStats);
      return () => cancelAnimationFrame(frameId);
    }, 800);
    return () => clearTimeout(tId);
  }, []);

  const handleAction = (section: string) => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter(section);
    }, 1000);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@300;600&display=swap');
        .l3d-body { margin: 0; padding: 0; background-color: #000000; color: white; overflow: hidden; font-family: 'Rajdhani', sans-serif; width: 100vw; height: 100vh; position: fixed; inset: 0; z-index: 9999; cursor: none; }
        .l3d-fadeout { animation: fadeOut 1s forwards ease-in-out; }
        @keyframes fadeOut { to { opacity: 0; visibility: hidden; } }
        .l3d-cursor-ring { position: fixed; top: -10px; left: -10px; width: 20px; height: 20px; border: 1.5px solid #0fca9a; border-radius: 50%; pointer-events: none; z-index: 10000; }
        .l3d-cursor-dot { position: fixed; top: -2px; left: -2px; width: 4px; height: 4px; background: #0fca9a; border-radius: 50%; pointer-events: none; z-index: 10000; }
        .l3d-hud-bracket { position: absolute; width: 50px; height: 50px; border: 2px solid rgba(15, 202, 154, 0.4); pointer-events: none; }
        .l3d-tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
        .l3d-tr { top: 20px; right: 20px; border-left: none; border-bottom: none; }
        .l3d-bl { bottom: 20px; left: 20px; border-right: none; border-top: none; }
        .l3d-br { bottom: 20px; right: 20px; border-left: none; border-top: none; }
        .l3d-scanline { position: absolute; width: 100%; height: 1px; background: linear-gradient(to right, transparent, #0fca9a, transparent); top: 0; pointer-events: none; animation: scanDown 4s infinite linear; }
        @keyframes scanDown { 0% { top: 0%; } 100% { top: 100%; } }
        .l3d-side-label { position: absolute; top: 50%; font-family: 'Rajdhani', sans-serif; font-size: 11px; letter-spacing: 4px; color: rgba(255,255,255,0.4); transform-origin: center; white-space: nowrap; pointer-events: none; }
        .l3d-left-label { left: 10px; transform: translateY(-50%) rotate(-90deg); }
        .l3d-right-label { right: 10px; transform: translateY(-50%) rotate(90deg); }
        .l3d-fps-counter { position: absolute; top: 35px; right: 40px; font-family: 'Orbitron', sans-serif; font-size: 9px; color: rgba(15, 202, 154, 0.3); pointer-events: none; animation: blinkSlow 2s infinite alternate; }
        @keyframes blinkSlow { from { opacity: 0.3; } to { opacity: 0.8; } }
        .l3d-center-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; text-align: center; pointer-events: auto; z-index: 100; }
        .l3d-anim-up { opacity: 0; transform: translateY(20px); animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .l3d-delay-1 { animation-delay: 0.3s; }
        .l3d-delay-2 { animation-delay: 0.5s; }
        .l3d-delay-3 { animation-delay: 0.7s; }
        .l3d-delay-5 { animation-delay: 1.1s; }
        @keyframes fadeSlideUp { to { opacity: 1; transform: translateY(0); } }
        .l3d-micro { font-size: 11px; letter-spacing: 8px; color: rgba(15, 202, 154, 0.6); margin-bottom: 5px; }
        .l3d-name { font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: clamp(28px, 5vw, 56px); margin: 10px 0; line-height: 1.1; }
        .l3d-name span { color: #0fca9a; }
        .l3d-role { font-family: 'Rajdhani', sans-serif; font-size: clamp(13px, 2vw, 18px); letter-spacing: 4px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
        .l3d-divider { width: 0px; height: 1px; margin: 25px 0; background: linear-gradient(to right, transparent, #0fca9a, transparent); animation: expandDivider 1s 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes expandDivider { to { width: 120px; } }
        .l3d-buttons { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .l3d-cta { font-family: 'Orbitron', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; background: transparent; border: 1px solid rgba(15, 202, 154, 0.5); color: #0fca9a; padding: 12px 24px; cursor: none; clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px); transition: all 0.3s; }
        .l3d-cta:hover { background: rgba(15, 202, 154, 0.1); border-color: #0fca9a; color: white; box-shadow: 0 0 15px rgba(15, 202, 154, 0.4); }
        .l3d-stats { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 40px; pointer-events: none; }
        .l3d-stat-item { display: flex; flex-direction: column; align-items: center; }
        .l3d-stat-num { font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 20px; color: #0fca9a; }
        .l3d-stat-label { font-size: 10px; letter-spacing: 3px; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-top: 5px; }
        .l3d-noise { position: fixed; inset: 0; pointer-events: none; z-index: 9998; opacity: 0.03; }
      `}} />

      <div className={`l3d-body ${isFadingOut ? 'l3d-fadeout' : ''}`}>
        <div ref={mountRef} className="absolute inset-0" />
        <svg className="l3d-noise">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        <div className="l3d-cursor-ring" ref={cursorRingRef} />
        <div className="l3d-cursor-dot" ref={cursorDotRef} />

        <div className="l3d-hud-bracket l3d-tl" />
        <div className="l3d-hud-bracket l3d-tr" />
        <div className="l3d-hud-bracket l3d-bl" />
        <div className="l3d-hud-bracket l3d-br" />

        <div className="l3d-scanline" />
        
        <div className="l3d-side-label l3d-left-label">BUILD. BREAK. LEARN. REPEAT.</div>
        <div className="l3d-side-label l3d-right-label">CREATE VALUE. SHIP FAST. STAY CONSISTENT.</div>
        
        <div className="l3d-fps-counter" id="hud-fps">0 FPS</div>

        <div className="l3d-center-content">
          <div className="l3d-micro l3d-anim-up l3d-delay-1">✦ CREATIVE DEVELOPER ✦</div>
          <div className="l3d-name l3d-anim-up l3d-delay-2">
            {/* EDIT: Your name here */}
            SONU <br/><span>KUMAR</span> 
          </div>
          <div className="l3d-role l3d-anim-up l3d-delay-3">
            {/* EDIT: Your role here */}
            Full Stack Developer · AI/ML Engineer
          </div>
          <div className="l3d-divider" />
          <div className="l3d-buttons l3d-anim-up l3d-delay-5">
            {/* EDIT: Link your sections */}
            <button className="l3d-cta" onClick={() => handleAction('projects')}>View Work</button>
            <button className="l3d-cta" onClick={() => handleAction('about')}>Know More</button>
            <button className="l3d-cta" onClick={() => handleAction('contact')}>Contact</button>
          </div>
        </div>

        <div className="l3d-stats">
          {/* EDIT: Your stats here */}
          <div className="l3d-stat-item">
            <div className="l3d-stat-num">{stats.projects}+</div>
            <div className="l3d-stat-label">Projects</div>
          </div>
          <div className="l3d-stat-item">
            <div className="l3d-stat-num">{stats.experience}+</div>
            <div className="l3d-stat-label">Years Experience as a Developer</div>
          </div>
        </div>
      </div>
    </>
  );
}
