import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Modern Axis Style Rotating Dome CCTV Camera ─── */
function DomeCCTV({ position }: { position: [number, number, number] }) {
  const panRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (panRef.current) {
      panRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.9;
    }
  });

  return (
    <group position={position}>
      {/* Ceiling base mount */}
      <mesh>
        <cylinderGeometry args={[0.16, 0.2, 0.08, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Smoked acrylic half-dome */}
      <mesh position={[0, -0.08, 0]}>
        <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} transparent opacity={0.75} />
      </mesh>
      {/* Internal PTZ Camera Lens */}
      <group ref={panRef} position={[0, -0.05, 0]}>
        <mesh position={[0, 0, 0.06]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        {/* Tiny Red Recording LED */}
        <mesh position={[0.05, -0.02, 0.08]}>
          <circleGeometry args={[0.008, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Ergonomic High-Tech Operator Desk Chair ─── */
function OperatorChair({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* 5-Star Chrome Base */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 5]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Pneumatic Gas Cylinder */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.45, 10]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>
      {/* Padded Seat Cushion */}
      <mesh position={[0, 0.56, 0]}>
        <boxGeometry args={[0.54, 0.08, 0.52]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* Contoured Mesh Backrest */}
      <mesh position={[0, 0.95, -0.22]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.48, 0.72, 0.05]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      {/* Chrome Back Support Spine */}
      <mesh position={[0, 0.85, -0.26]} rotation={[0.12, 0, 0]}>
        <boxGeometry args={[0.06, 0.65, 0.03]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Left & Right Armrests */}
      <mesh position={[-0.26, 0.72, 0]}>
        <boxGeometry args={[0.06, 0.22, 0.28]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.26, 0.72, 0]}>
        <boxGeometry args={[0.06, 0.22, 0.28]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

/* ─── Operator Workstation Console (Desk with Triple Monitors & Accessories) ─── */
function OperatorStation({
  x,
  z,
  label,
  screenColors,
}: {
  x: number;
  z: number;
  label: string;
  screenColors: [string, string, string];
}) {
  return (
    <group position={[x, 0, z]}>
      {/* 3 Curved Monitors */}
      {/* Center Screen */}
      <mesh position={[0, 1.45, 0]}>
        <boxGeometry args={[1.0, 0.6, 0.03]} />
        <meshStandardMaterial color="#0284c7" emissive={screenColors[1]} emissiveIntensity={0.65} />
      </mesh>
      {/* Left Screen (angled inward) */}
      <mesh position={[-0.95, 1.45, 0.12]} rotation={[0, 0.28, 0]}>
        <boxGeometry args={[0.92, 0.6, 0.03]} />
        <meshStandardMaterial color="#0369a1" emissive={screenColors[0]} emissiveIntensity={0.6} />
      </mesh>
      {/* Right Screen (angled inward) */}
      <mesh position={[0.95, 1.45, 0.12]} rotation={[0, -0.28, 0]}>
        <boxGeometry args={[0.92, 0.6, 0.03]} />
        <meshStandardMaterial color="#0369a1" emissive={screenColors[2]} emissiveIntensity={0.6} />
      </mesh>

      {/* Monitor Stands */}
      <mesh position={[0, 1.05, -0.05]}>
        <cylinderGeometry args={[0.025, 0.025, 0.28, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Keyboard & Mousepad */}
      <mesh position={[0, 0.92, 0.35]}>
        <boxGeometry args={[0.45, 0.015, 0.16]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0.32, 0.92, 0.35]}>
        <boxGeometry args={[0.18, 0.01, 0.2]} />
        <meshStandardMaterial color="#0284c7" roughness={0.7} />
      </mesh>

      {/* Station Name Plate */}
      <mesh position={[0, 0.91, 0.6]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshStandardMaterial color="#0284c7" />
      </mesh>
      <Text position={[0, 0.91, 0.61]} fontSize={0.035} color="#ffffff" anchorX="center" anchorY="middle">
        {label}
      </Text>

      {/* Ergonomic Chair in front of Station */}
      <OperatorChair position={[0, 0, 0.9]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

/* ─── Architectural Glazed Glass Wall & High-Security Airlock Portal (z = 88.5) ─── */
function GlazedNOCPartition() {
  return (
    <group position={[0, 0, 88.5]}>
      {/* Structural Dark Aluminum Header Beam */}
      <mesh position={[0, 5.7, 0]}>
        <boxGeometry args={[29.6, 0.6, 0.3]} />
        <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Glass Partition Wing (x: -14.5 to -2.2) */}
      <mesh position={[-8.35, 2.7, 0]}>
        <boxGeometry args={[12.3, 5.4, 0.08]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.28}
        />
      </mesh>
      {/* Mullion vertical dividers left */}
      {[-11.5, -7.5, -4.5].map((mx, idx) => (
        <mesh key={idx} position={[mx, 2.7, 0]}>
          <boxGeometry args={[0.08, 5.4, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      ))}

      {/* Right Glass Partition Wing (x: 2.2 to 14.5) */}
      <mesh position={[8.35, 2.7, 0]}>
        <boxGeometry args={[12.3, 5.4, 0.08]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.28}
        />
      </mesh>
      {/* Mullion vertical dividers right */}
      {[4.5, 7.5, 11.5].map((mx, idx) => (
        <mesh key={idx} position={[mx, 2.7, 0]}>
          <boxGeometry args={[0.08, 5.4, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      ))}

      {/* Central Automatic Sliding Door Opening (x: -2.2 to 2.2) */}
      {/* Top Door Frame Lintel */}
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[4.4, 0.4, 0.25]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      {/* Illuminated Header Banner */}
      <mesh position={[0, 3.4, 0.13]}>
        <planeGeometry args={[4.2, 0.32]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      <Text position={[0, 3.4, 0.14]} fontSize={0.14} color="#ffffff" anchorX="center" anchorY="middle">
        CENTRE DE CONTRÔLE 24H/24 (NOC)
      </Text>

      {/* Door Side Jambs */}
      <mesh position={[-2.2, 1.7, 0]}>
        <boxGeometry args={[0.15, 3.4, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      <mesh position={[2.2, 1.7, 0]}>
        <boxGeometry args={[0.15, 3.4, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* RFID Badge Scanners on Door Jambs */}
      <group position={[-2.28, 1.4, 0.12]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.22, 0.04]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <mesh position={[0, 0.04, 0.025]}>
          <planeGeometry args={[0.07, 0.07]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
      <group position={[2.28, 1.4, 0.12]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.22, 0.04]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <mesh position={[0, 0.04, 0.025]}>
          <planeGeometry args={[0.07, 0.07]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Second-Row Supervisor Command Station (z = 96) ─── */
function SupervisorStation() {
  return (
    <group position={[0, 0, 96]}>
      {/* Curved Supervisor Desk */}
      <mesh position={[0, 0.88, 0]}>
        <boxGeometry args={[6.5, 0.06, 1.4]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.44, -0.3]}>
        <boxGeometry args={[6.3, 0.82, 0.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Dual Ultrawide Displays */}
      {[-1.6, 1.6].map((sx, idx) => (
        <group key={idx} position={[sx, 1.4, 0]}>
          <mesh>
            <boxGeometry args={[1.6, 0.65, 0.04]} />
            <meshStandardMaterial color="#0b1120" />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[1.54, 0.6]} />
            <meshStandardMaterial
              color="#041226"
              emissive={idx === 0 ? '#0284c7' : '#0d9488'}
              emissiveIntensity={0.65}
            />
          </mesh>
          <Text position={[0, 0.12, 0.03]} fontSize={0.07} color="#ffffff" anchorX="center">
            {idx === 0 ? 'SYNTHÈSE INCIDENTS & TICKETS' : 'PILOTAGE ÉNERGIE & REFROIDISSEMENT'}
          </Text>
          <Text position={[0, -0.1, 0.03]} fontSize={0.05} color="#38bdf8" anchorX="center">
            {idx === 0 ? 'Niveau d’alerte : VERT • 0 Escalade' : 'Puissance active : 420 kW • PUE : 1.18'}
          </Text>
        </group>
      ))}

      {/* Quad-Color Status Signal Tower Beacon (Patlite) */}
      <group position={[3.0, 1.15, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 10]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} />
        </mesh>
        {/* Green top light (Active) */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={1.2} />
        </mesh>
        {/* Cyan light */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} />
        </mesh>
        {/* Amber light */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
          <meshStandardMaterial color="#d97706" roughness={0.3} />
        </mesh>
        {/* Red light */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.3} />
        </mesh>
      </group>

      {/* Two Supervisor Chairs */}
      <OperatorChair position={[-1.5, 0, 0.8]} rotation={[0, Math.PI, 0]} />
      <OperatorChair position={[1.5, 0, 0.8]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

/* ─── Heavy Novec 1230 Clean Agent Fire Suppression Bank (Left Wall) ─── */
function FireSuppressionMatrix({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 2-Tier Steel Mounting Frame */}
      <mesh position={[0, 1.5, -0.4]}>
        <boxGeometry args={[4.8, 2.8, 0.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Yellow Safety Crash Protection Railing */}
      <mesh position={[0, 0.6, 0.8]}>
        <boxGeometry args={[5.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#eab308" metalness={0.7} />
      </mesh>
      {[-2.5, 0, 2.5].map((rx, idx) => (
        <mesh key={idx} position={[rx, 0.3, 0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 10]} />
          <meshStandardMaterial color="#eab308" metalness={0.7} />
        </mesh>
      ))}

      {/* 10 Heavy Red Gas Cylinders (2 rows of 5) */}
      {[-1.8, -0.9, 0, 0.9, 1.8].map((cx, idx) => (
        <React.Fragment key={idx}>
          {/* Front Row Cylinder */}
          <group position={[cx, 0, 0.3]}>
            <mesh position={[0, 1.4, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 2.6, 16]} />
              <meshStandardMaterial color="#dc2626" roughness={0.25} metalness={0.65} />
            </mesh>
            {/* Brass High-Pressure Valve Head */}
            <mesh position={[0, 2.8, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.22, 10]} />
              <meshStandardMaterial color="#eab308" metalness={0.9} />
            </mesh>
            {/* Pressure Gauge */}
            <mesh position={[0, 2.75, 0.08]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />
              <meshStandardMaterial color="#ffffff" metalness={0.8} />
            </mesh>
          </group>

          {/* Back Row Cylinder */}
          <group position={[cx, 0, -0.15]}>
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 2.8, 16]} />
              <meshStandardMaterial color="#b91c1c" roughness={0.25} metalness={0.65} />
            </mesh>
            <mesh position={[0, 3.0, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.22, 10]} />
              <meshStandardMaterial color="#ca8a04" metalness={0.9} />
            </mesh>
          </group>
        </React.Fragment>
      ))}

      {/* Heavy Overhead Manifold Pipe */}
      <mesh position={[0, 3.4, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 4.6, 16]} />
        <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Wall Warning Placard */}
      <mesh position={[0, 3.85, -0.3]}>
        <planeGeometry args={[4.2, 0.45]} />
        <meshStandardMaterial color="#0b1120" />
      </mesh>
      <Text position={[0, 3.85, -0.28]} fontSize={0.13} color="#ef4444" anchorX="center" anchorY="middle">
        EXTINCTION AUTOMATIQUE AU GAZ PROPRE (SANS EAU)
      </Text>
      <Text position={[0, 3.65, -0.28]} fontSize={0.08} color="#fca5a5" anchorX="center" anchorY="middle">
        Étouffement en 10 secondes • Aucun résidu ni court-circuit
      </Text>

      {/* SSI Fire Alarm Master Panel on Wall Beside Cylinders */}
      <group position={[-2.8, 1.8, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.8, 0.15]} />
          <meshStandardMaterial color="#991b1b" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.1, 0.08]}>
          <planeGeometry args={[0.4, 0.3]} />
          <meshBasicMaterial color="#022c22" />
        </mesh>
        <Text position={[0, 0.1, 0.09]} fontSize={0.05} color="#34d399" anchorX="center">
          SSI : VEILLE OK
        </Text>
        <mesh position={[-0.1, -0.2, 0.08]}>
          <circleGeometry args={[0.025, 8]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[0.1, -0.2, 0.08]}>
          <circleGeometry args={[0.025, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

/* ─── CCTV SAN Video Storage Racks & Emergency Equipment (Right Wall) ─── */
function CCTVStorageAndSafetyBay({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 3 Dedicated 42U SAN Video Storage Racks */}
      {[-1.6, 0, 1.6].map((rx, idx) => (
        <group key={idx} position={[rx, 0, 0]}>
          {/* Heavy Steel Cabinet */}
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.9, 2.6, 1.0]} />
            <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Front Perforated Door with SAN Drive Trays */}
          {Array.from({ length: 7 }).map((_, dIdx) => (
            <group key={dIdx} position={[0, 0.45 + dIdx * 0.28, 0.48]}>
              <mesh>
                <boxGeometry args={[0.8, 0.18, 0.04]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
              {/* Drive activity LED bar */}
              <mesh position={[-0.25, 0, 0.025]}>
                <boxGeometry args={[0.2, 0.015, 0.005]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
              <mesh position={[0.25, 0, 0.025]}>
                <boxGeometry args={[0.2, 0.015, 0.005]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            </group>
          ))}
          {/* Top Label */}
          <Text position={[0, 2.45, 0.52]} fontSize={0.065} color="#38bdf8" anchorX="center">
            {`NVR SAN REC-0${idx + 1}`}
          </Text>
        </group>
      ))}

      {/* Wall-Mounted Physical Security Station */}
      <group position={[2.6, 1.6, 0]}>
        {/* RFID Key Management Electronic Safe (Traka Cabinet) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.7, 0.2]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0.11]}>
          <planeGeometry args={[0.35, 0.25]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0.1, 0.12]} fontSize={0.04} color="#ffffff" anchorX="center">
          GESTION DES CLÉS RFID
        </Text>

        {/* Emergency First Aid Defibrillator (DAE) */}
        <group position={[0, -0.65, 0]}>
          <mesh>
            <boxGeometry args={[0.35, 0.35, 0.15]} />
            <meshStandardMaterial color="#166534" />
          </mesh>
          <Text position={[0, 0.02, 0.08]} fontSize={0.06} color="#ffffff" anchorX="center">
            DAE ✚
          </Text>
        </group>
      </group>

      {/* 20kV Insulated Electrical Rescue Hook on Wall */}
      <group position={[-2.6, 2.0, 0]}>
        <mesh rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.025, 0.025, 2.2, 8]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>
        <mesh position={[0.3, 1.0, 0]} rotation={[0, 0, -1.2]}>
          <torusGeometry args={[0.12, 0.025, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} />
        </mesh>
        <Text position={[0, -0.2, 0.05]} fontSize={0.05} color="#ffffff" anchorX="center">
          PERCHE DE SAUVETAGE 20kV
        </Text>
      </group>
    </group>
  );
}

export default function SecurityArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Architectural Glazed Glass Wall & High-Security Airlock Portal (z = 88.5) ── */}
      <GlazedNOCPartition />

      {/* ── Second-Row Supervisor Command Console (z = 96) ── */}
      <SupervisorStation />

      {/* ── Main Operations Curved Command Console (z = 103) ── */}
      <group position={[0, 0, 103]}>
        {/* Main Curved Desk Surface (args: width 12.5m, height 0.85m, depth 1.8m) */}
        <mesh position={[0, 0.88, 0]}>
          <boxGeometry args={[12.6, 0.06, 1.8]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
        </mesh>
        {/* Desk Base Structure with Integrated Cable Raceways */}
        <mesh position={[0, 0.44, -0.4]}>
          <boxGeometry args={[12.4, 0.82, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        {/* Cyan Ambient Under-Desk Glow */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12.8, 2.2]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
        </mesh>

        {/* 4 Dedicated High-Tech Operator Stations */}
        <OperatorStation
          x={-4.65}
          z={0}
          label="POSTE 01 : CYBERSÉCURITÉ"
          screenColors={['#b91c1c', '#0284c7', '#0369a1']}
        />
        <OperatorStation
          x={-1.55}
          z={0}
          label="POSTE 02 : SUPERVISION RÉSEAU"
          screenColors={['#0284c7', '#0d9488', '#0369a1']}
        />
        <OperatorStation
          x={1.55}
          z={0}
          label="POSTE 03 : CLIMATISATION & ÉNERGIE"
          screenColors={['#0d9488', '#0284c7', '#10b981']}
        />
        <OperatorStation
          x={4.65}
          z={0}
          label="POSTE 04 : VIDÉOSURVEILLANCE"
          screenColors={['#0369a1', '#0284c7', '#04202c']}
        />

        {/* Intercom Mic and Emergency Red Phone */}
        <group position={[-0.1, 0.94, 0.3]}>
          <mesh>
            <boxGeometry args={[0.18, 0.08, 0.14]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <Text position={[0, 0.06, 0.08]} fontSize={0.03} color="#ffffff" anchorX="center">
            ASTREINTE
          </Text>
        </group>
      </group>

      {/* ── High-Contrast Curved NOC Video Wall (Center z = 107.2) ── */}
      <group position={[0, 0, 107.2]}>
        {/* Heavy Black Anodized Display Frame (18m wide!) */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[18.4, 4.4, 0.25]} />
          <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 8 Seamless Ultra-High-Contrast Video Wall Panels */}
        {[-6.6, -2.2, 2.2, 6.6].map((xOffset, colIdx) => (
          <React.Fragment key={colIdx}>
            {/* Top Display Panel */}
            <mesh position={[xOffset, 4.2, 0.14]}>
              <planeGeometry args={[4.2, 1.8]} />
              <meshStandardMaterial
                color="#03152e"
                emissive={colIdx === 1 || colIdx === 2 ? '#0284c7' : '#0369a1'}
                emissiveIntensity={0.65}
              />
            </mesh>
            {/* Bottom Display Panel */}
            <mesh position={[xOffset, 2.2, 0.14]}>
              <planeGeometry args={[4.2, 1.8]} />
              <meshStandardMaterial
                color="#04202c"
                emissive={colIdx === 0 ? '#b91c1c' : colIdx === 3 ? '#0284c7' : '#0d9488'}
                emissiveIntensity={0.55}
              />
            </mesh>
          </React.Fragment>
        ))}

        {/* Real-time Supervision Text Telemetry */}
        <Text position={[0, 4.65, 0.16]} fontSize={0.24} color="#ffffff" anchorX="center">
          CENTRE DE CONTRÔLE NOC & SOC : DISPONIBILITÉ 99.999%
        </Text>
        <Text position={[0, 4.3, 0.16]} fontSize={0.16} color="#7dd3fc" anchorX="center">
          Trafic Réseau Global : 1.48 Tbps • 0 Incident en cours • SLA 100% Respecté
        </Text>
        <Text position={[-6.6, 4.3, 0.16]} fontSize={0.15} color="#ffffff" anchorX="center">
          CYBERDÉFENSE : 42 000 ÉVTS/S • 0 INTRUSION
        </Text>
        <Text position={[6.6, 4.3, 0.16]} fontSize={0.15} color="#ffffff" anchorX="center">
          VIDÉOSURVEILLANCE : 128 CAMÉRAS ACTIVES
        </Text>
        <Text position={[-2.2, 2.3, 0.16]} fontSize={0.14} color="#34d399" anchorX="center">
          MÉTÉO SALLES : 20.8°C MOYENNE • PUE 1.18
        </Text>
        <Text position={[2.2, 2.3, 0.16]} fontSize={0.14} color="#38bdf8" anchorX="center">
          ÉNERGIE : 100% NOMINALE • ONDULEURS CHARGÉS
        </Text>
      </group>

      {/* ── Left Wing: High-Pressure Fire Suppression Matrix & SSI ── */}
      <FireSuppressionMatrix position={[-11.8, 0, 97]} />

      {/* ── Right Wing: CCTV SAN Video Storage Racks & Emergency Equipment ── */}
      <CCTVStorageAndSafetyBay position={[11.8, 0, 97]} />

      {/* ── Overhead PTZ Surveillance Cameras ── */}
      <DomeCCTV position={[-12, 5.6, 92]} />
      <DomeCCTV position={[12, 5.6, 92]} />
      <DomeCCTV position={[-12, 5.6, 105]} />
      <DomeCCTV position={[12, 5.6, 105]} />

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="noc-monitor"
        name="La Salle de Contrôle 24h/24"
        position={[0, 1.4, 104.5]}
        description="Une équipe de techniciens surveille la santé du datacenter 24h/24 pour agir avant toute panne."
      />
      <InteractiveMarker
        id="fire-suppression"
        name="L’Anti-Incendie (Sans eau)"
        position={[-13.5, 1.8, 95.0]}
        description="Extinction par gaz propre en 10 secondes sans aucune goutte d’eau pour protéger le matériel informatique."
      />
    </group>
  );
}
