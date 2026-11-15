import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Heavy Industrial Overhead Cable Busway (Gaine Barre Électrique) ─── */
function CableBusway({ start, end, color = '#f59e0b' }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const s = new THREE.Vector3(...start);
  const e = new THREE.Vector3(...end);
  const mid = s.clone().add(e).multiplyScalar(0.5);
  const dir = e.clone().sub(s);
  const len = dir.length();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());

  return (
    <group position={mid} quaternion={quaternion}>
      {/* Aluminum Trunking Box */}
      <mesh>
        <boxGeometry args={[0.22, len, 0.22]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* High-Voltage Identification Band */}
      <mesh position={[0, 0, 0.115]}>
        <planeGeometry args={[0.18, len * 0.95]} />
        <meshStandardMaterial color={color} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ─── Realistic Industrial Double-Conversion UPS Cabinet (Schneider Galaxy VX) ─── */
function UPSCabinet({ position, id }: { position: [number, number, number]; id: string }) {
  const mimicLedRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (mimicLedRef.current) {
      mimicLedRef.current.color.set(Math.sin(state.clock.elapsedTime * 2) > 0 ? '#10b981' : '#34d399');
    }
  });

  return (
    <group position={position}>
      {/* Heavy Steel Cabinet Frame (RAL 7021 Dark Slate) */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.4, 2.5, 0.95]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Front Door Panels with Recessed Edges */}
      <mesh position={[0, 1.25, 0.48]}>
        <planeGeometry args={[1.34, 2.4]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Ventilation Louver Grilles at Bottom */}
      <mesh position={[0, 0.4, 0.49]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.8} />
      </mesh>

      {/* Microprocessor Color Mimic Display Panel (Synoptique Électrique) */}
      <group position={[0, 1.7, 0.49]}>
        {/* Bezel */}
        <mesh>
          <planeGeometry args={[1.0, 0.65]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.22, 0.01]} fontSize={0.07} color="#ffffff" anchorX="center">
          {`${id} • DOUBLE CONVERSION`}
        </Text>
        <Text position={[0, 0.08, 0.01]} fontSize={0.09} color="#10b981" anchorX="center">
          CHARGE : 68% • 800 kVA
        </Text>
        <Text position={[0, -0.06, 0.01]} fontSize={0.06} color="#e0f2fe" anchorX="center">
          TENSION: 400V TRIPHASÉ • 50.0 Hz
        </Text>
        <Text position={[0, -0.18, 0.01]} fontSize={0.06} color="#f59e0b" anchorX="center">
          AUTONOMIE BATTERIE : 24 MIN
        </Text>
      </group>

      {/* Online Status LED Indicator */}
      <mesh position={[0.5, 2.2, 0.49]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial ref={mimicLedRef} color="#10b981" />
      </mesh>
    </group>
  );
}

/* ─── Modular VRLA / Lithium-Ion Battery Cabinet ─── */
function BatteryBankCabinet({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[1.0, 2.2, 0.75]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Safety Yellow Hazard Border Decal */}
      <mesh position={[0, 2.05, 0.38]}>
        <planeGeometry args={[0.85, 0.12]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.4} />
      </mesh>
      <Text position={[0, 2.05, 0.39]} fontSize={0.055} color="#000000" anchorX="center" anchorY="middle">
        ⚡ 480V DC • ACCÈS STRICT
      </Text>

      {/* Modular battery rack trays inside glass viewing window */}
      <mesh position={[0, 1.0, 0.38]}>
        <planeGeometry args={[0.88, 1.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* 4 Stacked Battery Trays */}
      {[0.5, 0.85, 1.2, 1.55].map((y, idx) => (
        <group key={idx} position={[0, y, 0.36]}>
          <mesh>
            <boxGeometry args={[0.82, 0.22, 0.04]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Terminals */}
          <mesh position={[-0.3, 0, 0.03]}>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.3, 0, 0.03]}>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}

      <Text position={[0, 0.15, 0.39]} fontSize={0.06} color="#94a3b8" anchorX="center">
        {label}
      </Text>
    </group>
  );
}

/* ─── Massive Cummins/Caterpillar Emergency Diesel Generator ─── */
function DieselGenerator({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Heavy Vibration-Damped Concrete Skid Base */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3.4, 0.3, 1.8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.6} />
      </mesh>

      {/* Main Engine V16 Block (Industrial Enclosure RAL 6003 Green / Slate) */}
      <mesh position={[-0.3, 1.1, 0]}>
        <boxGeometry args={[2.0, 1.6, 1.3]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Turbocharged Synchronous Alternator (Cylinder) */}
      <mesh position={[1.0, 1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 1.0, 24]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Radiator Cooling Core Fan Assembly (Front) */}
      <mesh position={[-1.5, 1.2, 0]}>
        <boxGeometry args={[0.4, 1.8, 1.4]} />
        <meshStandardMaterial color="#1a202c" metalness={0.7} roughness={0.8} />
      </mesh>

      {/* Heavy Stainless Exhaust Silencer & Pipe to Roof */}
      <group position={[-0.2, 2.1, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 1.6, 16]} />
          <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.6, 1.5, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 2.8, 16]} />
          <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Generator Local Automatic Control Panel (PCC 3300) */}
      <group position={[0.8, 1.3, 0.7]}>
        <mesh>
          <boxGeometry args={[0.65, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a202c" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.1, 0.06]}>
          <planeGeometry args={[0.5, 0.4]} />
          <meshStandardMaterial color="#065f46" emissive="#047857" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.18, 0.07]} fontSize={0.06} color="#ffffff" anchorX="center">
          GENSET-01 : STANDBY
        </Text>
        <Text position={[0, 0.04, 0.07]} fontSize={0.07} color="#34d399" anchorX="center">
          PRÊT (DÉMARRAGE &lt; 15s)
        </Text>
      </group>
    </group>
  );
}

/* ─── Automatic Transfer Switch (ATS) Cabinet ─── */
function ATSCabinet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[1.0, 2.5, 0.6]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Front Door with Industrial Cam-Lock */}
      <mesh position={[0, 1.25, 0.305]}>
        <planeGeometry args={[0.94, 2.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Status Mimic Panel */}
      <group position={[0, 1.6, 0.315]}>
        <mesh>
          <planeGeometry args={[0.7, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.18, 0.01]} fontSize={0.065} color="#38bdf8" anchorX="center">
          ATS AUTOMATE DE TRANSFERT
        </Text>
        <Text position={[0, 0.05, 0.01]} fontSize={0.06} color="#10b981" anchorX="center">
          SOURCE 1 (SECTEUR) : ACTIVE
        </Text>
        <Text position={[0, -0.08, 0.01]} fontSize={0.06} color="#94a3b8" anchorX="center">
          SOURCE 2 (DIESEL) : PRÊTE
        </Text>
      </group>
    </group>
  );
}

/* ─── Diesel Fuel Day-Tank & Retention Berm (Cuve Gazole 1000L) ─── */
function DieselFuelDayTank({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Retention Berm Basin */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.8, 0.5, 2.6]} />
        <meshStandardMaterial color="#ca8a04" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Cylindrical Yellow Fuel Tank */}
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 2.2, 16]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Breather & Fill Pipes */}
      <mesh position={[0, 1.6, 0.6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.85, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.18, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      {/* Tank ID Label */}
      <mesh position={[0, 1.0, 1.12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshStandardMaterial color="#0b1120" />
      </mesh>
      <Text position={[0, 1.0, 1.13]} fontSize={0.07} color="#f59e0b" anchorX="center" anchorY="middle">
        CUVE GAZOLE 1000L (72H)
      </Text>
    </group>
  );
}

/* ─── Dielectric Safety Flooring Mats (Tapis Isolants 1000V) ─── */
function DielectricSafetyMats() {
  return (
    <group>
      <mesh position={[-7.8, 0.015, 51]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 1.2]} />
        <meshStandardMaterial color="#ea580c" roughness={0.6} />
      </mesh>
      <mesh position={[7.8, 0.015, 51]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.2, 1.2]} />
        <meshStandardMaterial color="#ea580c" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function ElectricalArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Dielectric Safety Flooring Mats ── */}
      <DielectricSafetyMats />

      {/* ── Diesel Fuel Day-Tank Beside Generator ── */}
      <DieselFuelDayTank position={[-11.8, 0, 61]} />
      {/* ── Floor Safety Markings (z: 44 to 66) ── */}
      <mesh position={[-7.5, 0.012, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.5, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      <mesh position={[7.5, 0.012, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.5, 8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* ── Lineup A: Primary UPS Train (x = -7.5, z = 50) ── */}
      <UPSCabinet position={[-9.5, 0, 50]} id="UPS-A1" />
      <UPSCabinet position={[-7.8, 0, 50]} id="UPS-A2" />
      <UPSCabinet position={[-6.1, 0, 50]} id="UPS-A3" />

      {/* ── Lineup B: Redundant UPS Train (x = 7.5, z = 50) ── */}
      <UPSCabinet position={[6.1, 0, 50]} id="UPS-B1" />
      <UPSCabinet position={[7.8, 0, 50]} id="UPS-B2" />
      <UPSCabinet position={[9.5, 0, 50]} id="UPS-B3" />

      {/* ── Battery Bank Storage Lineup (z = 55) ── */}
      {[-8, -5.5, -3, 3, 5.5, 8].map((xPos, idx) => (
        <BatteryBankCabinet
          key={idx}
          position={[xPos, 0, 55]}
          label={`BANC BATTERIES DC-${idx + 1}`}
        />
      ))}

      {/* ── Heavy Emergency Diesel Generator (z = 61) ── */}
      <DieselGenerator position={[-7.5, 0, 61]} />

      {/* ── Automatic Transfer Switch (ATS) Cabinets (z = 60) ── */}
      <ATSCabinet position={[7.5, 0, 60]} />
      <ATSCabinet position={[9.2, 0, 60]} />

      {/* ── High-Power Busway Trunking Running Overhead (400V Triphasé, z: 45 to 65) ── */}
      <CableBusway start={[-9.5, 4.8, 45]} end={[-9.5, 4.8, 65]} color="#f59e0b" />
      <CableBusway start={[9.5, 4.8, 45]} end={[9.5, 4.8, 65]} color="#38bdf8" />
      <CableBusway start={[-9.5, 5.0, 52]} end={[9.5, 5.0, 52]} color="#ef4444" />

      {/* Warning High-Voltage Plaques Mounted on Walls */}
      <group position={[-14.5, 2.5, 50]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[3.2, 1.0]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
        <Text position={[0, 0.15, 0.02]} fontSize={0.22} color="#000000" anchorX="center">
          ⚠ DANGER HAUTE TENSION 400V
        </Text>
        <Text position={[0, -0.18, 0.02]} fontSize={0.13} color="#000000" anchorX="center">
          POSTE TRANSFO • ALIMENTATION SANS COUPURE
        </Text>
      </group>

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="ups"
        name="La Batterie de Secours"
        position={[-7.8, 1.4, 50.0]}
        description="Bascule instantanée sur batteries en 0 milliseconde pour que les serveurs ne subissent aucune coupure."
      />
      <InteractiveMarker
        id="generator"
        name="Le Moteur Diesel de Secours"
        position={[-7.5, 1.6, 61.0]}
        description="Moteur de secours géant démarrant en moins de 60 secondes pour alimenter le datacenter pendant 3 jours."
      />
    </group>
  );
}
