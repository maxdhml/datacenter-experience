import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Heavy Industrial Overhead Cable Busway (Gaine Barre Électrique) ─── */
function CableBusway({
  start,
  end,
  color = '#f59e0b',
  label = '',
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  label?: string;
}) {
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
        <boxGeometry args={[0.26, len, 0.26]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* High-Voltage Identification Band */}
      <mesh position={[0, 0, 0.135]}>
        <planeGeometry args={[0.22, len * 0.98]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} />
      </mesh>
      {label && (
        <Text position={[0, 0, 0.14]} fontSize={0.08} color="#000000" anchorX="center" rotation={[0, 0, Math.PI / 2]}>
          {label}
        </Text>
      )}
    </group>
  );
}

/* ─── Station 1 : Haute Tension Réseau Public ENEDIS (20kV ➔ 400V) ─── */
function HighVoltageSubstation({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Safety Steel Cage Enclosure (Grillage Haute Tension) */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[4.2, 3.2, 2.6]} />
        <meshStandardMaterial color="#1e293b" wireframe={true} />
      </mesh>
      {/* Corner Posts */}
      {[-2.05, 2.05].map((x) =>
        [-1.25, 1.25].map((z, idx) => (
          <mesh key={`${x}-${idx}`} position={[x, 1.6, z]}>
            <boxGeometry args={[0.1, 3.2, 0.1]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} />
          </mesh>
        ))
      )}

      {/* Dry-Type Cast Resin Step-Down Transformer (Transformateur 20kV ➔ 400V) */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.4, 2.0, 1.6]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Red Cast Resin Coils (3 Phase Windings) */}
      {[-0.6, 0, 0.6].map((cx, idx) => (
        <group key={idx} position={[cx, 1.2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.25, 0.25, 1.6, 16]} />
            <meshStandardMaterial color="#991b1b" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* Ceramic High Voltage Bushing Isolator on top */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.45, 12]} />
            <meshStandardMaterial color="#78350f" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Large Pedagogical Station Sign */}
      <group position={[0, 3.4, 1.35]}>
        <mesh>
          <planeGeometry args={[4.0, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.12, 0.02]} fontSize={0.16} color="#f59e0b" anchorX="center">
          ⚡ STATION 1 : RÉSEAU PUBLIC (ENEDIS 20 000V)
        </Text>
        <Text position={[0, -0.13, 0.02]} fontSize={0.11} color="#22c55e" anchorX="center">
          Source normale quotidienne • Transformé en 400V triphasé
        </Text>
      </group>

      {/* Real-time Electrical Telemetry Screen */}
      <group position={[0, 1.6, 1.32]}>
        <mesh>
          <planeGeometry args={[1.6, 0.9]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <Text position={[0, 0.28, 0.02]} fontSize={0.08} color="#ffffff" anchorX="center">
          CELLULE HTA TRANSFO
        </Text>
        <Text position={[0, 0.1, 0.02]} fontSize={0.11} color="#10b981" anchorX="center">
          20 000V ➔ 400V OK
        </Text>
        <Text position={[0, -0.08, 0.02]} fontSize={0.07} color="#38bdf8" anchorX="center">
          FRÉQUENCE : 50.00 Hz
        </Text>
        <Text position={[0, -0.24, 0.02]} fontSize={0.07} color="#f59e0b" anchorX="center">
          PUISSANCE SOUSCRITE : 3200 kVA
        </Text>
      </group>
    </group>
  );
}

/* ─── Station 2 : Central Intelligent Automatic Transfer Switch (ATS) ─── */
function CentralATSSwitch({ position }: { position: [number, number, number] }) {
  const switchLedRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (switchLedRef.current) {
      const glow = Math.sin(state.clock.elapsedTime * 3) > 0;
      switchLedRef.current.color.set(glow ? '#10b981' : '#34d399');
    }
  });

  return (
    <group position={position}>
      {/* Heavy ATS Steel Cabinet */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 3.0, 1.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Front Architectural Panel */}
      <mesh position={[0, 1.5, 0.51]}>
        <planeGeometry args={[1.7, 2.9]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Large Illuminated Electrical Routing Mimic (Synoptique de Bascule) */}
      <group position={[0, 1.8, 0.52]}>
        <mesh>
          <planeGeometry args={[1.5, 1.4]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.6} />
        </mesh>
        <Text position={[0, 0.5, 0.02]} fontSize={0.09} color="#ffffff" anchorX="center">
          COMMUTATEUR DE SOURCE ATS
        </Text>
        <Text position={[0, 0.28, 0.02]} fontSize={0.075} color="#22c55e" anchorX="center">
          SOURCE 1 (VILLE) : ACTIVE ➔ ALIM
        </Text>
        <Text position={[0, 0.08, 0.02]} fontSize={0.07} color="#f59e0b" anchorX="center">
          SOURCE 2 (DIESEL) : VEILLE PRÊTE
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.065} color="#e2e8f0" anchorX="center">
          TEMPS DE DÉTECTION : &lt; 20 ms
        </Text>
        <Text position={[0, -0.32, 0.02]} fontSize={0.065} color="#bae6fd" anchorX="center">
          BASCULE ENTIÈREMENT AUTOMATIQUE
        </Text>
        {/* Active Power Pilot Lamp */}
        <mesh position={[0, 0.38, 0.02]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial ref={switchLedRef} color="#10b981" />
        </mesh>
      </group>

      {/* Large Overhead Pedagogical Billboard */}
      <group position={[0, 3.4, 0]}>
        <mesh>
          <planeGeometry args={[3.2, 0.65]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.15, 0.02]} fontSize={0.17} color="#38bdf8" anchorX="center">
          🔀 STATION 2 : L’AIGUILLEUR (ATS)
        </Text>
        <Text position={[0, -0.14, 0.02]} fontSize={0.11} color="#ffffff" anchorX="center">
          Bascule instantanément de la ville au groupe diesel en cas de panne
        </Text>
      </group>
    </group>
  );
}

/* ─── Station 3 : Realistic Industrial Double-Conversion UPS Cabinet ─── */
function UPSCabinet({ position, id }: { position: [number, number, number]; id: string }) {
  return (
    <group position={position}>
      {/* Heavy Steel Cabinet Frame */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.4, 2.8, 1.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.4, 0.51]}>
        <planeGeometry args={[1.34, 2.7]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Microprocessor Color Mimic Display (Double Conversion AC ➔ DC ➔ AC) */}
      <group position={[0, 1.8, 0.52]}>
        <mesh>
          <planeGeometry args={[1.1, 0.9]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.3, 0.01]} fontSize={0.075} color="#ffffff" anchorX="center">
          {`${id} • DOUBLE CONVERSION`}
        </Text>
        <Text position={[0, 0.12, 0.01]} fontSize={0.1} color="#10b981" anchorX="center">
          RELAIS : 0 ms SANS COUPURE
        </Text>
        <Text position={[0, -0.06, 0.01]} fontSize={0.065} color="#e0f2fe" anchorX="center">
          CHARGE : 68% • 800 kVA PUR
        </Text>
        <Text position={[0, -0.22, 0.01]} fontSize={0.065} color="#f59e0b" anchorX="center">
          AUTONOMIE BATTERIE : 15 MIN
        </Text>
      </group>

      {/* Online Status LED Indicator */}
      <mesh position={[0.5, 2.5, 0.52]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
}

/* ─── Modular VRLA / Lithium-Ion Battery Cabinet ─── */
function BatteryBankCabinet({ position, label }: { position: [number, number, number]; label: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.1, 2.4, 0.8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Safety Yellow Hazard Border Decal */}
      <mesh position={[0, 2.2, 0.41]}>
        <planeGeometry args={[0.95, 0.14]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.4} />
      </mesh>
      <Text position={[0, 2.2, 0.42]} fontSize={0.06} color="#000000" anchorX="center" anchorY="middle">
        ⚡ 480V DC • ACCÈS STRICT
      </Text>

      {/* Modular battery rack trays inside transparent viewing door */}
      <mesh position={[0, 1.1, 0.41]}>
        <planeGeometry args={[0.95, 1.6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* 4 Stacked Heavy Battery Cells with Massive Copper Busbars */}
      {[0.5, 0.9, 1.3, 1.7].map((y, idx) => (
        <group key={idx} position={[0, y, 0.38]}>
          <mesh>
            <boxGeometry args={[0.88, 0.26, 0.05]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {/* Positive red and negative black heavy copper terminals */}
          <mesh position={[-0.32, 0, 0.04]}>
            <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.32, 0, 0.04]}>
            <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Green 100% capacity LED bar */}
          <mesh position={[0, -0.08, 0.03]}>
            <planeGeometry args={[0.5, 0.03]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      ))}

      <Text position={[0, 0.2, 0.42]} fontSize={0.07} color="#94a3b8" anchorX="center">
        {label}
      </Text>
    </group>
  );
}

/* ─── Station 4 : Monumental Industrial Emergency Diesel Generator ─── */
function DieselGenerator({ position }: { position: [number, number, number] }) {
  const beaconRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (beaconRef.current) {
      const flash = Math.sin(state.clock.elapsedTime * 6) > 0.3;
      beaconRef.current.color.set(flash ? '#f59e0b' : '#78350f');
    }
  });

  return (
    <group position={position}>
      {/* Heavy Vibration-Damped Concrete Skid Base */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.2, 0.4, 2.4]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.6} />
      </mesh>

      {/* Heavy Anti-Vibration Steel Spring Isolators under Skid */}
      {[-1.8, 1.8].map((sx) =>
        [-0.9, 0.9].map((sz, idx) => (
          <mesh key={`${sx}-${idx}`} position={[sx, 0.08, sz]}>
            <cylinderGeometry args={[0.12, 0.12, 0.16, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        ))
      )}

      {/* Main Engine V16 Cast Iron Block (Cummins QSK60 / CAT 3516) */}
      <mesh position={[-0.4, 1.3, 0]}>
        <boxGeometry args={[2.5, 1.8, 1.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Turbocharged Alternator 2000 kVA (Heavy Cylinder) */}
      <mesh position={[1.2, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.65, 0.65, 1.2, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Heavy Front Radiator Core with Fan Cowling */}
      <mesh position={[-1.8, 1.4, 0]}>
        <boxGeometry args={[0.45, 2.1, 1.6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.7} />
      </mesh>

      {/* Heavy Stainless Steel Exhaust Silencer & Upright Flue to Roof */}
      <group position={[-0.3, 2.4, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 2.0, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Vertical chimney pipe penetrating datacenter ceiling */}
        <mesh position={[0.7, 1.7, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 3.4, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Local Automatic Start & Synchro Controller (PCC 3300) */}
      <group position={[1.1, 1.5, 0.82]}>
        <mesh>
          <boxGeometry args={[0.8, 0.95, 0.12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.12, 0.07]}>
          <planeGeometry args={[0.65, 0.5]} />
          <meshStandardMaterial color="#065f46" emissive="#047857" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.22, 0.08]} fontSize={0.065} color="#ffffff" anchorX="center">
          GENSET-01 • 2000 kVA
        </Text>
        <Text position={[0, 0.06, 0.08]} fontSize={0.085} color="#34d399" anchorX="center">
          PRÊT (&lt; 15s)
        </Text>
        <Text position={[0, -0.1, 0.08]} fontSize={0.055} color="#e2e8f0" anchorX="center">
          GAZOLE: 100% • 72H SECOURS
        </Text>
      </group>

      {/* Flashing Warning Amber Safety Beacon on Top Post */}
      <group position={[1.8, 2.4, 1.0]}>
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
          <meshBasicMaterial ref={beaconRef} color="#f59e0b" />
        </mesh>
      </group>

      {/* Yellow Safety Perimeter Guard Rails (Rambardes industrielles) */}
      {[-2.2, 2.2].map((gx) => (
        <group key={gx} position={[gx, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 1.0, 2.6]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.5, -1.3]}>
        <boxGeometry args={[4.4, 1.0, 0.08]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} />
      </mesh>

      {/* Monumental Signage Header for Station 4 */}
      <group position={[0, 3.8, 1.3]}>
        <mesh>
          <planeGeometry args={[4.4, 0.7]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.16, 0.02]} fontSize={0.18} color="#f59e0b" anchorX="center">
          🚜 STATION 4 : GROUPE DIESEL (SECOURS 72H)
        </Text>
        <Text position={[0, -0.14, 0.02]} fontSize={0.11} color="#ffffff" anchorX="center">
          Démarrage &lt; 15s si panne générale • Autonomie de 3 jours grâce à sa cuve
        </Text>
      </group>
    </group>
  );
}

/* ─── Diesel Fuel Day-Tank & Retention Basin (Cuve Gazole 1000L) ─── */
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
      {/* Fuel Level Glass Sight Gauge */}
      <mesh position={[0.56, 0.9, 0]}>
        <boxGeometry args={[0.02, 0.8, 0.06]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.5} />
      </mesh>
      {/* Tank ID Label */}
      <mesh position={[0, 1.0, 1.12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.3, 0.35]} />
        <meshStandardMaterial color="#0b1120" />
      </mesh>
      <Text position={[0, 1.0, 1.13]} fontSize={0.08} color="#f59e0b" anchorX="center" anchorY="middle">
        CUVE GAZOLE 1000L (72H)
      </Text>
    </group>
  );
}

/* ─── Giant Overhead 3D Power Single-Line Synoptic Arch (Grand Schéma Électrique 3D) ─── */
function PowerSynopticArch({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Large Suspended Black Header Panel */}
      <mesh position={[0, 4.9, 0]}>
        <boxGeometry args={[14, 1.2, 0.1]} />
        <meshStandardMaterial color="#0b1120" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4.3, 0.06]}>
        <boxGeometry args={[14, 0.04, 0.02]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      <Text position={[0, 5.25, 0.07]} fontSize={0.19} color="#ffffff" anchorX="center" letterSpacing={0.04}>
        LA CHAÎNE ÉLECTRIQUE DE SECOURS (0 MILLISECONDE DE COUPURE)
      </Text>

      {/* 4 Connected Stages */}
      <Text position={[-5.0, 4.75, 0.07]} fontSize={0.115} color="#22c55e" anchorX="center">
        1. VILLE (20 000V)
      </Text>
      <Text position={[-5.0, 4.52, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Courant normal quotidien
      </Text>

      <Text position={[-1.7, 4.75, 0.07]} fontSize={0.115} color="#38bdf8" anchorX="center">
        ➔ 2. AIGUILLAGE ATS
      </Text>
      <Text position={[-1.7, 4.52, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Bascule automatique source
      </Text>

      <Text position={[1.7, 4.75, 0.07]} fontSize={0.115} color="#eab308" anchorX="center">
        ➔ 3. BATTERIES (0 ms)
      </Text>
      <Text position={[1.7, 4.52, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Relais direct sans microcoupure
      </Text>

      <Text position={[5.0, 4.75, 0.07]} fontSize={0.115} color="#f97316" anchorX="center">
        ➔ 4. DIESEL (72H)
      </Text>
      <Text position={[5.0, 4.52, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Démarre en 15s si panne longue
      </Text>
    </group>
  );
}

export default function ElectricalArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Giant Overhead Electrical Synoptic Arch (z = 47) ── */}
      <PowerSynopticArch position={[0, 0, 47]} />

      {/* ── Station 1 : Haute Tension ENEDIS Réseau Public (x = 8.5, z = 50) ── */}
      <HighVoltageSubstation position={[8.5, 0, 50]} />

      {/* ── Station 2 : Central Automatic Transfer Switch ATS (x = 0, z = 50) ── */}
      <CentralATSSwitch position={[0, 0, 50]} />

      {/* ── Station 3 : Primary UPS Trains & DC Battery Storage (x = -8.5, z = 50) ── */}
      {/* 3 Modular Double Conversion UPS Cabinets */}
      <UPSCabinet position={[-9.5, 0, 49.5]} id="UPS-A1" />
      <UPSCabinet position={[-8.0, 0, 49.5]} id="UPS-A2" />
      <UPSCabinet position={[-6.5, 0, 49.5]} id="UPS-A3" />

      {/* Overhead High-Contrast Pedagogical Signboard for Station 3 */}
      <group position={[-8.0, 3.4, 49.5]}>
        <mesh>
          <planeGeometry args={[4.4, 0.65]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.15, 0.02]} fontSize={0.18} color="#38bdf8" anchorX="center">
          🔋 STATION 3 : ONDULEURS & BATTERIES (0 ms)
        </Text>
        <Text position={[0, -0.14, 0.02]} fontSize={0.11} color="#22c55e" anchorX="center">
          Fournit le courant instantanément sans que les ordinateurs ne coupent
        </Text>
      </group>

      {/* 4 Modular Battery Bank Cabinets (z = 54.5) */}
      {[-9.5, -8.0, -6.5, -5.0].map((xPos, idx) => (
        <BatteryBankCabinet
          key={idx}
          position={[xPos, 0, 54.5]}
          label={`BANC BATTERIES DC-${idx + 1}`}
        />
      ))}

      {/* ── Station 4 : Monumental Emergency Diesel Generator (x = -7.5, z = 61) ── */}
      <DieselGenerator position={[-7.5, 0, 61]} />
      <DieselFuelDayTank position={[-12.2, 0, 61]} />

      {/* Secondary ATS Cabinets on Redundant Path (x = 8.0, z = 61) */}
      <group position={[8.0, 0, 61]}>
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.6, 2.8, 0.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <Text position={[0, 2.4, 0.42]} fontSize={0.09} color="#38bdf8" anchorX="center">
          TGBT DE DISTRIBUTION SECOURS
        </Text>
        <Text position={[0, 2.15, 0.42]} fontSize={0.075} color="#10b981" anchorX="center">
          DÉPARTS ARMOIRES SERVEURS
        </Text>
      </group>

      {/* ── Floor Markings: Normal Green Line vs Emergency Orange Line ── */}
      {/* Green Normal Power Route Floor Line (from Station 1 to Center ATS) */}
      <mesh position={[4.25, 0.015, 50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.5, 0.2]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      {/* Orange Emergency Power Route Floor Line (from Station 4 to Center ATS) */}
      <mesh position={[-3.75, 0.015, 55.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.5, 0.2]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* ── Overhead High-Power Busways (Gaines Barres Lumineuses) ── */}
      {/* Voie A : Réseau Normal (Vert/Bleu) */}
      <CableBusway start={[8.5, 4.8, 48]} end={[0, 4.8, 50]} color="#10b981" label="VOIE A NORMALE" />
      {/* Voie B : Secours Diesel (Orange) */}
      <CableBusway start={[-7.5, 4.8, 61]} end={[0, 4.8, 50]} color="#f59e0b" label="VOIE B SECOURS" />
      {/* Sortie ATS vers Onduleurs & Racks */}
      <CableBusway start={[0, 4.9, 50]} end={[-8.0, 4.9, 50]} color="#38bdf8" label="DISTRIBUTION PURIFIÉE" />

      {/* ── Grounded Interactive Markers (IDs alignés avec le jeu & missions) ── */}
      <InteractiveMarker
        id="ups"
        name="La Batterie de Secours"
        position={[-7.8, 1.4, 50.0]}
        description="Onduleurs et bancs de batteries prenant le relais en zéro seconde : aucune microcoupure ne perturbe les processeurs."
      />
      <InteractiveMarker
        id="generator"
        name="Le Moteur Diesel de Secours"
        position={[-7.5, 1.6, 61.0]}
        description="Moteur V16 de 2000 kVA démarrant en 15 secondes pour alimenter le datacenter pendant 3 jours entiers en cas de panne générale."
      />
    </group>
  );
}
