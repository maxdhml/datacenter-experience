import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Highly Realistic Industrial CRAH / CRAC Unit (e.g. Vertiv Liebert / Stulz) ─── */
function IndustrialCRACUnit({
  position,
  rotation = [0, 0, 0],
  id = 'CRAC-01',
  temp = '20.5°C',
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  id?: string;
  temp?: string;
}) {
  const fanRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 15;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* ── Main Industrial Enclosure (RAL 7035 Light Industrial Grey) ── */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[3.2, 4.6, 1.8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Sheet metal panel break lines */}
      <mesh position={[0, 2.3, 0.905]}>
        <planeGeometry args={[3.1, 4.4]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Front Return Air Louver Slats (Vantelles d'aspiration) */}
      <group position={[0, 1.6, 0.915]}>
        <mesh>
          <planeGeometry args={[2.7, 2.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Louver horizontal slats */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[0, -1.0 + i * 0.18, 0.01]}>
            <boxGeometry args={[2.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Internal EC Fan impeller assembly (viewable through top grille) */}
      <group ref={fanRef} position={[0, 3.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 0.15, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, angle]}>
            <boxGeometry args={[1.1, 0.12, 0.08]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Color LCD Touchscreen Microprocessor Controller (iCOM display) */}
      <group position={[0.9, 3.4, 0.92]}>
        <mesh>
          <boxGeometry args={[0.75, 0.55, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.68, 0.48]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.9} />
        </mesh>
        <Text position={[0, 0.14, 0.03]} fontSize={0.065} color="#ffffff" anchorX="center">
          {`${id} • EN SERVICE`}
        </Text>
        <Text position={[0, 0.02, 0.03]} fontSize={0.085} color="#22c55e" anchorX="center">
          {temp}
        </Text>
        <Text position={[0, -0.12, 0.03]} fontSize={0.05} color="#bae6fd" anchorX="center">
          HR: 49.2% • DÉBIT: 18 500 m³/h
        </Text>
      </group>

      {/* Chilled Water Flanged Supply / Return Pipes on Top */}
      <mesh position={[-0.8, 4.8, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.6, 16]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.8, 4.8, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.6, 16]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ─── Heavy Chilled Water Header Pipe Loop (Tuyauterie Eau Glacée) ─── */
function ChilledWaterLoop() {
  return (
    <group position={[0, 5.0, 33]}>
      {/* Cold supply pipe (7°C - Deep Blue) */}
      <mesh position={[-9.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 22, 24]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Hot return pipe (13°C - Industrial Red/Orange) */}
      <mesh position={[9.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 22, 24]} />
        <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Manual Butterfly Valves with Red/Blue Handwheels */}
      {[-6, 0, 6].map((zPos, idx) => (
        <group key={idx}>
          {/* Valve on cold line */}
          <group position={[-9.5, 0, zPos]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.18, 0.03, 8, 16]} />
              <meshStandardMaterial color="#38bdf8" />
            </mesh>
          </group>

          {/* Valve on return line */}
          <group position={[9.5, 0, zPos]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.18, 0.03, 8, 16]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

/* ─── Heavy Industrial Chilled Water Pumping Skid (Pompes de Circulation) ─── */
function ChilledWaterPumpSkid({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Heavy Steel Skid Base Frame */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3.2, 0.3, 1.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Twin Centrifugal Circulating Pumps (Pompe A & Pompe B en Redondance) */}
      {[-0.8, 0.8].map((px, idx) => (
        <group key={idx} position={[px, 0.3, 0]}>
          {/* Blue Electric Motor (TEFC) */}
          <mesh position={[0, 0.5, -0.35]}>
            <cylinderGeometry args={[0.26, 0.26, 0.7, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Motor Terminal Junction Box */}
          <mesh position={[0, 0.78, -0.35]}>
            <boxGeometry args={[0.2, 0.14, 0.2]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Yellow Safety Coupling Guard */}
          <mesh position={[0, 0.5, 0.1]}>
            <cylinderGeometry args={[0.2, 0.2, 0.22, 12]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} />
          </mesh>
          {/* Pump Volute Casing (Spiral) */}
          <mesh position={[0, 0.5, 0.35]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Suction Flanged Pipe */}
          <mesh position={[0, 0.5, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.3, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
          {/* Discharge Vertical Flanged Pipe */}
          <mesh position={[0, 0.95, 0.35]}>
            <cylinderGeometry args={[0.12, 0.12, 0.7, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
          {/* Handwheel Valve on Discharge */}
          <mesh position={[0, 1.35, 0.35]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.14, 0.02, 8, 16]} />
            <meshStandardMaterial color={idx === 0 ? '#10b981' : '#eab308'} />
          </mesh>
        </group>
      ))}

      {/* Skid Electrical VFD / Inverter Drive Control Cabinet */}
      <group position={[0, 1.2, -0.9]}>
        <mesh>
          <boxGeometry args={[1.2, 1.6, 0.25]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <Text position={[0, 0.6, 0.14]} fontSize={0.065} color="#38bdf8" anchorX="center">
          POMPES EAU GLACÉE 7°C
        </Text>
        <Text position={[0, 0.45, 0.14]} fontSize={0.055} color="#10b981" anchorX="center">
          DÉBIT: 140 m³/h • N+1 ACTIF
        </Text>
      </group>
    </group>
  );
}

/* ─── Floor Condensate Drainage Grates ─── */
function FloorDrainageTrenches() {
  return (
    <group>
      <mesh position={[-12.2, 0.008, 33]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 20]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.5} />
      </mesh>
      <mesh position={[12.2, 0.008, 33]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 20]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function CoolingArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Floor Condensate Drainage Grates ── */}
      <FloorDrainageTrenches />

      {/* ── Chilled Water Pumping Skid (Right Side) ── */}
      <ChilledWaterPumpSkid position={[8.6, 0, 33]} />
      {/* ── 4 Industrial CRAH Units along sidewalls (z: 22 to 44) ── */}
      <IndustrialCRACUnit id="CRAH-01" temp="20.2°C" position={[-12.2, 0, 26]} rotation={[0, Math.PI / 2, 0]} />
      <IndustrialCRACUnit id="CRAH-02" temp="20.8°C" position={[-12.2, 0, 39]} rotation={[0, Math.PI / 2, 0]} />
      <IndustrialCRACUnit id="CRAH-03" temp="19.9°C" position={[12.2, 0, 26]} rotation={[0, -Math.PI / 2, 0]} />
      <IndustrialCRACUnit id="CRAH-04" temp="20.4°C" position={[12.2, 0, 39]} rotation={[0, -Math.PI / 2, 0]} />

      {/* ── Overhead Chilled Water Loop & Valves ── */}
      <ChilledWaterLoop />

      {/* ── Thermal Containment Aisle Showcase ── */}
      {/* Cold Aisle (Left side, x: -4, z: 33) */}
      <group position={[-4, 0, 33]}>
        {/* Structural Aluminum Frame */}
        <mesh position={[-1.6, 1.7, 0]}>
          <boxGeometry args={[0.08, 3.4, 14]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[1.6, 1.7, 0]}>
          <boxGeometry args={[0.08, 3.4, 14]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>

        {/* Clear Glass Containment Ceiling */}
        <mesh position={[0, 3.4, 0]}>
          <boxGeometry args={[3.2, 0.04, 14]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.2} roughness={0.1} />
        </mesh>

        {/* Sliding Entrance Doors */}
        <mesh position={[0, 1.7, -7]}>
          <boxGeometry args={[3.2, 3.4, 0.08]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.3} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.7, 7]}>
          <boxGeometry args={[3.2, 3.4, 0.08]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.3} roughness={0.1} />
        </mesh>

        {/* Cold Aisle Underfloor Plenum Perforated Tiles */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 13.5]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </mesh>

        {/* Informative High-Contrast Signage Plaque */}
        <group position={[0, 3.8, 0]}>
          <mesh>
            <planeGeometry args={[3.4, 0.5]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <Text position={[0, 0.05, 0.02]} fontSize={0.18} color="#38bdf8" anchorX="center">
            ALLÉE FROIDE CONFINÉE (COLD AISLE)
          </Text>
          <Text position={[0, -0.12, 0.02]} fontSize={0.12} color="#ffffff" anchorX="center">
            Température nominale : 18°C à 24°C • Pression positive
          </Text>
        </group>
      </group>

      {/* Hot Aisle (Right side, x: 4, z: 33) */}
      <group position={[4, 0, 33]}>
        {/* Overhead Insulated Thermal Chimney / Exhaust Duct */}
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[3.2, 1.4, 14]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Hot Aisle Warm Tile Accent */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 13.5]} />
          <meshStandardMaterial
            color="#ea580c"
            emissive="#c2410c"
            emissiveIntensity={0.25}
            roughness={0.4}
          />
        </mesh>

        {/* Informative Signage Plaque */}
        <group position={[0, 3.8, 0]}>
          <mesh>
            <planeGeometry args={[3.4, 0.5]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <Text position={[0, 0.05, 0.02]} fontSize={0.18} color="#f97316" anchorX="center">
            ALLÉE CHAUDE CONFINÉE (HOT AISLE)
          </Text>
          <Text position={[0, -0.12, 0.02]} fontSize={0.12} color="#ffffff" anchorX="center">
            Extraction vers plénum : 35°C à 45°C • Pas de mélange
          </Text>
        </group>
      </group>

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="cold-aisle"
        name="L’Allée d’Air Froid"
        position={[-4.0, 1.5, 30.0]}
        description="Couloir vitré étanche enfermant l’air frais à 20 °C pour ne pas le mélanger avec l’air chaud."
      />
      <InteractiveMarker
        id="crac-unit"
        name="Le Grand Climatiseur"
        position={[-11.5, 1.8, 26.0]}
        description="Armoire de climatisation à eau froide évacuant la chaleur dégagée par les serveurs."
      />
    </group>
  );
}
