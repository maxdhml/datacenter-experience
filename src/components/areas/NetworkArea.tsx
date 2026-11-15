import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Overhead Yellow Fiber Chute Dropping into Racks ─── */
function OverheadFiberDrop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Vertical Yellow Panduit Chute */}
      <mesh position={[0, 3.85, 0]}>
        <boxGeometry args={[0.22, 2.3, 0.22]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Black Trumpet Bell Exit at bottom */}
      <mesh position={[0, 2.7, 0]}>
        <cylinderGeometry args={[0.16, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      {/* Spilling bundle of yellow singlemode fiber cables */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.35, 10]} />
        <meshStandardMaterial color="#facc15" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ─── Modular High-Density Spine / Core Network Chassis ─── */
function ModularCoreSwitch({ position, label }: { position: [number, number, number]; label: string }) {
  const ledRef = useRef<THREE.InstancedMesh>(null);
  const count = 32;

  useFrame((state) => {
    if (!ledRef.current) return;
    const t = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const col = i % 8;
      const row = Math.floor(i / 8);
      const blink = Math.sin(t * (3.5 + (i % 5)) + i * 1.2) > -0.1 ? 1 : 0.25;
      dummy.position.set(-0.28 + col * 0.08, 0.4 + row * 0.25, 0.44);
      dummy.scale.set(blink, blink, blink);
      dummy.updateMatrix();
      ledRef.current.setMatrixAt(i, dummy.matrix);
    }
    ledRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* 42U Heavy Steel Network Cabinet */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.0, 2.6, 1.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Side Vertical Cable Management Channels */}
      <mesh position={[-0.48, 1.3, 0]}>
        <boxGeometry args={[0.06, 2.5, 1.05]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} />
      </mesh>
      <mesh position={[0.48, 1.3, 0]}>
        <boxGeometry args={[0.06, 2.5, 1.05]} />
        <meshStandardMaterial color="#1e293b" metalness={0.7} />
      </mesh>

      {/* Main Switch Chassis Body (Modular Multi-Slot Fabric) */}
      <mesh position={[0, 1.4, 0.35]}>
        <boxGeometry args={[0.82, 1.8, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Linecards & Fabric Modules */}
      {[0.5, 0.8, 1.1, 1.4, 1.7, 2.0].map((y, idx) => (
        <group key={idx} position={[0, y, 0.46]}>
          <mesh>
            <boxGeometry args={[0.76, 0.12, 0.04]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* SFP28 / QSFP28 Port Cages */}
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[0.72, 0.08]} />
            <meshStandardMaterial color="#0b1120" />
          </mesh>
        </group>
      ))}

      {/* Instanced Flashing Link/Activity LEDs */}
      <instancedMesh ref={ledRef} args={[undefined, undefined, count]} position={[0, 0.7, 0.04]}>
        <sphereGeometry args={[0.009, 6, 6]} />
        <meshBasicMaterial color="#10b981" toneMapped={false} />
      </instancedMesh>

      {/* Equipment ID Label Plaque */}
      <mesh position={[0, 2.45, 0.52]}>
        <planeGeometry args={[0.65, 0.12]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      <Text position={[0, 2.45, 0.53]} fontSize={0.065} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>

      {/* Overhead Fiber Drop */}
      <OverheadFiberDrop position={[0, 0, 0]} />
    </group>
  );
}

/* ─── Optical Patch Panel Rack (Haute Densité Fibre Monomode) ─── */
function FiberPatchRack({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.9, 2.6, 0.9]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* High-Density LC Couplers Matrix */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[0, 0.5 + i * 0.24, 0.42]}>
          <mesh>
            <boxGeometry args={[0.78, 0.14, 0.04]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} />
          </mesh>
          {/* Blue LC Coupler Blocks (Monomode UPC) */}
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[0.72, 0.1]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        </group>
      ))}

      {/* Top Label */}
      <Text position={[0, 2.45, 0.46]} fontSize={0.07} color="#38bdf8" anchorX="center">
        {label}
      </Text>

      {/* Overhead Fiber Drop */}
      <OverheadFiberDrop position={[0, 0, 0]} />
    </group>
  );
}

/* ─── Telecom Carrier Meet-Me-Room (MMR) Demarcation Security Cage ─── */
function CarrierDemarcationCage({ position }: { position: [number, number, number] }) {
  const carriers = [
    { name: 'ORANGE BUSINESS', color: '#f97316' },
    { name: 'COLT TELECOM', color: '#06b6d4' },
    { name: 'LUMEN GLOBAL', color: '#3b82f6' },
    { name: 'ZAYO OPTICAL', color: '#a855f7' },
  ];

  return (
    <group position={position}>
      {/* ── Security Wire-Mesh Cage Perimeter Frame ── */}
      {/* Corner Posts */}
      {[
        [-2.5, -5.5],
        [2.5, -5.5],
        [-2.5, 5.5],
        [2.5, 5.5],
      ].map(([px, pz], idx) => (
        <mesh key={idx} position={[px, 1.6, pz]}>
          <cylinderGeometry args={[0.06, 0.06, 3.2, 8]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Perimeter Top Rail */}
      <mesh position={[0, 3.2, -5.5]}>
        <boxGeometry args={[5.0, 0.08, 0.08]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} />
      </mesh>
      <mesh position={[0, 3.2, 5.5]}>
        <boxGeometry args={[5.0, 0.08, 0.08]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} />
      </mesh>
      <mesh position={[-2.5, 3.2, 0]}>
        <boxGeometry args={[0.08, 0.08, 11.0]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} />
      </mesh>
      <mesh position={[2.5, 3.2, 0]}>
        <boxGeometry args={[0.08, 0.08, 11.0]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} />
      </mesh>

      {/* Translucent Security Wire Mesh Panels */}
      {/* Left Wall Panel */}
      <mesh position={[-2.5, 1.6, 0]}>
        <boxGeometry args={[0.02, 3.1, 11.0]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Back Wall Panel */}
      <mesh position={[0, 1.6, -5.5]}>
        <boxGeometry args={[5.0, 3.1, 0.02]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Front Wall Panel */}
      <mesh position={[0, 1.6, 5.5]}>
        <boxGeometry args={[5.0, 3.1, 0.02]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Right Wall Mesh (with door opening in center) */}
      <mesh position={[2.5, 1.6, -3.5]}>
        <boxGeometry args={[0.02, 3.1, 4.0]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[2.5, 1.6, 3.5]}>
        <boxGeometry args={[0.02, 3.1, 4.0]} />
        <meshStandardMaterial color="#64748b" transparent opacity={0.35} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Security Gate Lintel Sign */}
      <mesh position={[2.5, 2.9, 0]}>
        <boxGeometry args={[0.1, 0.5, 2.8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <Text
        position={[2.56, 2.9, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.12}
        color="#eab308"
        anchorX="center"
        anchorY="middle"
      >
        MEET-ME ROOM • OPÉRATEURS TÉLÉCOM
      </Text>

      {/* RFID Badge Reader on Gate */}
      <group position={[2.56, 1.4, 1.3]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 0.25, 0.04]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <mesh position={[0, 0.05, 0.025]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* ── 4 Dedicated Carrier Cabinets Inside the Cage ── */}
      {carriers.map((carrier, idx) => {
        const rackZ = -3.75 + idx * 2.5;
        return (
          <group key={idx} position={[0, 0, rackZ]}>
            {/* 42U Heavy Carrier Cabinet */}
            <mesh position={[0, 1.3, 0]}>
              <boxGeometry args={[0.85, 2.6, 1.0]} />
              <meshStandardMaterial color="#0b1120" metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Carrier Brand Accent Top Strip */}
            <mesh position={[0, 2.5, 0.51]}>
              <planeGeometry args={[0.75, 0.12]} />
              <meshStandardMaterial color={carrier.color} />
            </mesh>
            <Text
              position={[0, 2.5, 0.52]}
              fontSize={0.065}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {carrier.name}
            </Text>

            {/* Dense Optical Patch Bays with Colored Fiber Jumpers */}
            {[0.6, 1.0, 1.4, 1.8, 2.1].map((pY, pIdx) => (
              <group key={pIdx} position={[0, pY, 0.48]}>
                <mesh>
                  <boxGeometry args={[0.72, 0.14, 0.04]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.7} />
                </mesh>
                {/* Port matrix with subtle glow */}
                <mesh position={[0, 0, 0.022]}>
                  <planeGeometry args={[0.66, 0.08]} />
                  <meshBasicMaterial color={pIdx % 2 === 0 ? '#38bdf8' : '#f59e0b'} />
                </mesh>
              </group>
            ))}

            {/* Fiber Jumper Loop on Rack Side */}
            <mesh position={[0.44, 1.3, 0.2]}>
              <boxGeometry args={[0.02, 1.8, 0.15]} />
              <meshStandardMaterial color={carrier.color} />
            </mesh>
          </group>
        );
      })}

      {/* Safety Floor Marking Around the Cage */}
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 11.2]} />
        <meshBasicMaterial color="#eab308" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ─── Fiber Optic Splicing & Diagnostic Test Workbench ─── */
function FiberTestWorkbench({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Heavy Stainless Steel Electronics Tech Table */}
      {/* Tabletop */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Heavy Steel Legs */}
      {[
        [-1.05, -0.45],
        [1.05, -0.45],
        [-1.05, 0.45],
        [1.05, 0.45],
      ].map(([lx, lz], idx) => (
        <mesh key={idx} position={[lx, 0.47, lz]}>
          <cylinderGeometry args={[0.04, 0.04, 0.94, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      ))}

      {/* Equipment 1: Optical Time-Domain Reflectometer (OTDR) */}
      <group position={[-0.6, 1.15, 0]}>
        {/* Unit Chassis */}
        <mesh>
          <boxGeometry args={[0.45, 0.3, 0.25]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} />
        </mesh>
        {/* Glowing Test Screen */}
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[0.38, 0.22]} />
          <meshStandardMaterial color="#022c22" emissive="#10b981" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.05, 0.135]} fontSize={0.04} color="#ffffff" anchorX="center">
          TEST OTDR : SIGNAL OPTIQUE 100%
        </Text>
        <Text position={[0, -0.04, 0.135]} fontSize={0.035} color="#34d399" anchorX="center">
          Affaiblissement : 0.18 dB/km • OK
        </Text>
      </group>

      {/* Equipment 2: Precision Optical Fusion Splicer (Soudeuse Optique) */}
      <group position={[0.4, 1.08, 0.1]}>
        <mesh>
          <boxGeometry args={[0.32, 0.18, 0.28]} />
          <meshStandardMaterial color="#d97706" roughness={0.4} />
        </mesh>
        {/* Magnifier Viewport Cover */}
        <mesh position={[0, 0.08, 0.05]}>
          <boxGeometry args={[0.18, 0.06, 0.14]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Miniature Color Screen */}
        <mesh position={[0, 0.1, -0.06]} rotation={[-0.4, 0, 0]}>
          <planeGeometry args={[0.16, 0.1]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Spools of Optical Fiber Cable (Yellow, Orange, Aqua) */}
      {[
        { x: 0.85, z: -0.3, color: '#facc15' }, // Single-mode yellow
        { x: 0.55, z: -0.3, color: '#06b6d4' }, // OM4 aqua
        { x: 0.25, z: -0.3, color: '#f97316' }, // OM2 orange
      ].map((spool, sIdx) => (
        <group key={sIdx} position={[spool.x, 1.08, spool.z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.18, 16]} />
            <meshStandardMaterial color={spool.color} roughness={0.6} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.02, 16]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}

      {/* Technician Swivel Stool */}
      <group position={[0, 0, 0.9]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.58, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Gas Lift Cylinder */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 10]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
        {/* Star Base */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 5]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      </group>

      {/* Overhead Tech Task Lamp Bar */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[2.2, 0.04, 0.08]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}

/* ─── Network Telemetry & Transit Topology Wall Dashboard ─── */
function NetworkTopologyDisplay() {
  return (
    <group position={[-14.5, 2.8, 77]} rotation={[0, Math.PI / 2, 0]}>
      {/* Bezel frame */}
      <mesh>
        <boxGeometry args={[7.0, 3.2, 0.15]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Active Screen */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[6.7, 2.9]} />
        <meshStandardMaterial color="#041226" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>

      {/* Header */}
      <Text position={[0, 1.15, 0.1]} fontSize={0.2} color="#ffffff" anchorX="center">
        TOPOLOGIE DE TRANSIT IP & MATRICE FIBRE
      </Text>
      <Text position={[0, 0.85, 0.1]} fontSize={0.13} color="#38bdf8" anchorX="center">
        MULTI-OPÉRATEURS TÉLÉCOM • 4x 400G TRANSATLANTIQUE • PEERING 1.2 Tbps
      </Text>

      {/* Metrics Row */}
      <group position={[0, -0.1, 0.1]}>
        {[-2.2, 0, 2.2].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh>
              <planeGeometry args={[1.9, 1.2]} />
              <meshStandardMaterial color="#0b1a33" />
            </mesh>
            <Text position={[0, 0.4, 0.01]} fontSize={0.11} color="#94a3b8" anchorX="center">
              {i === 0 ? 'DÉBIT ENTRANT GLOBAL' : i === 1 ? 'DISPONIBILITÉ FIBRE' : 'BOUCLIER ANTI-ATTAQUE'}
            </Text>
            <Text position={[0, 0.1, 0.01]} fontSize={0.18} color="#10b981" anchorX="center">
              {i === 0 ? '1.48 Tbps' : i === 1 ? '100% ACTIF' : '0 INTRUSION'}
            </Text>
            <Text position={[0, -0.25, 0.01]} fontSize={0.09} color="#e0f2fe" anchorX="center">
              {i === 0 ? 'Latence moy. : 1.8 ms' : i === 1 ? 'Routes doublées' : 'Pare-Feu Connecté'}
            </Text>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function NetworkArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Spine Core Switch Racks (Left Lineup, z: 66 to 88) ── */}
      <ModularCoreSwitch position={[-6.5, 0, 71]} label="ROUTEUR COEUR 01" />
      <ModularCoreSwitch position={[-6.5, 0, 77]} label="ROUTEUR COEUR 02" />
      <ModularCoreSwitch position={[-6.5, 0, 83]} label="ROUTEUR BORDURE 01" />

      {/* ── Leaf Distribution & Security Racks (Right Lineup) ── */}
      <ModularCoreSwitch position={[6.5, 0, 71]} label="DISTRIBUTION RESEAU" />
      <ModularCoreSwitch position={[6.5, 0, 77]} label="PARE-FEU PRINCIPAL" />
      <ModularCoreSwitch position={[6.5, 0, 83]} label="REPARTITEUR DE CHARGE" />

      {/* ── High-Density Fiber Optic Distribution Frame Lineup (Right Side) ── */}
      <FiberPatchRack position={[9.2, 0, 71]} label="BAIE FIBRE 01" />
      <FiberPatchRack position={[9.2, 0, 77]} label="REPARTITEUR FIBRE OPTIQUE" />
      <FiberPatchRack position={[9.2, 0, 83]} label="BAIE FIBRE 02" />

      {/* ── Left Side: Full Carrier Demarcation Meet-Me-Room Security Cage ── */}
      <CarrierDemarcationCage position={[-11.5, 0, 77]} />

      {/* ── Right Side: Fiber Optic Splicing & Diagnostics Workbench ── */}
      <FiberTestWorkbench position={[12.2, 0, 77]} />

      {/* ── Network Telemetry Wall Screen ── */}
      <NetworkTopologyDisplay />

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="bgp-router"
        name="Le Câble Fibre Optique"
        position={[-6.5, 1.8, 77.0]}
        description="Liaison directe au réseau mondial par fibres optiques avec plusieurs opérateurs pour ne jamais couper."
      />
      <InteractiveMarker
        id="firewall"
        name="Le Pare-Feu Anti-Pirate"
        position={[6.5, 1.8, 77.0]}
        description="Filtre de cybersécurité qui bloque les attaques de pirates et protège les serveurs."
      />
    </group>
  );
}
