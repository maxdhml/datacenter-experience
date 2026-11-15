import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveMarker from '../three/InteractiveMarker';
import AirParticles from '../three/AirParticles';

/* ─── Ultra-Realistic Industrial CRAH Unit with Cutaway & Animated EC Fans ─── */
function IndustrialCRACUnit({
  position,
  rotation = [0, 0, 0],
  id = 'CRAH-01',
  temp = '19.8°C',
  hasCutaway = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  id?: string;
  temp?: string;
  hasCutaway?: boolean;
}) {
  const fanRef1 = useRef<THREE.Group>(null);
  const fanRef2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.z += delta * 18;
    if (fanRef2.current) fanRef2.current.rotation.z -= delta * 18;
  });

  return (
    <group position={position} rotation={rotation}>
      {/* ── Main Heavy Steel Housing (RAL 7035 Industrial Light Grey) ── */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[3.2, 4.6, 1.8]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Sheet metal seam break lines */}
      <mesh position={[0, 2.3, 0.905]}>
        <planeGeometry args={[3.1, 4.4]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Front Return Air Louver Slats (Aspiration d'air chaud à 38°C) */}
      <group position={[0, 1.5, 0.915]}>
        <mesh>
          <planeGeometry args={[2.7, 2.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} position={[0, -0.9 + i * 0.18, 0.01]}>
            <boxGeometry args={[2.6, 0.04, 0.02]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
        ))}
        <Text position={[0, -0.95, 0.02]} fontSize={0.06} color="#f97316" anchorX="center">
          ▼ ASPIRATION AIR CHAUD 38°C ▼
        </Text>
      </group>

      {/* Cutaway Transparent Inspection Window on CRAH-01 */}
      {hasCutaway ? (
        <group position={[0, 3.4, 0.91]}>
          {/* Transparent Acrylic Window */}
          <mesh>
            <planeGeometry args={[2.7, 1.3]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.25} roughness={0.1} />
          </mesh>
          {/* Blue Chilled Water Cooling Coil (Batterie à eau glacée 7°C) */}
          <mesh position={[-0.8, 0, -0.4]}>
            <boxGeometry args={[0.9, 1.1, 0.5]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
          </mesh>
          <Text position={[-0.8, -0.4, 0.02]} fontSize={0.05} color="#38bdf8" anchorX="center">
            BATTERIE EAU 7°C
          </Text>
          {/* Animated Centrifugal EC Motorized Fan */}
          <group ref={fanRef1} position={[0.7, 0, -0.4]}>
            <mesh>
              <cylinderGeometry args={[0.42, 0.42, 0.12, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
              <mesh key={i} rotation={[0, 0, angle]}>
                <boxGeometry args={[0.9, 0.08, 0.06]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
            ))}
          </group>
          <Text position={[0.7, -0.4, 0.02]} fontSize={0.05} color="#22c55e" anchorX="center">
            ROUE EC 1400 RPM
          </Text>
        </group>
      ) : (
        /* Standard Fan View Grille */
        <group ref={fanRef2} position={[0, 3.4, 0]}>
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
      )}

      {/* Color LCD Touchscreen Microprocessor Controller (iCOM display) */}
      <group position={[0.95, 3.6, 0.92]}>
        <mesh>
          <boxGeometry args={[0.85, 0.65, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.78, 0.58]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
        </mesh>
        <Text position={[0, 0.2, 0.03]} fontSize={0.065} color="#ffffff" anchorX="center">
          {`${id} • EAU GLACÉE`}
        </Text>
        <Text position={[0, 0.07, 0.03]} fontSize={0.095} color="#22c55e" anchorX="center">
          {`SOUFFLÉ: ${temp}`}
        </Text>
        <Text position={[0, -0.06, 0.03]} fontSize={0.055} color="#fdba74" anchorX="center">
          AIR REPRIS : 37.8°C (ΔT 18°C)
        </Text>
        <Text position={[0, -0.19, 0.03]} fontSize={0.05} color="#bae6fd" anchorX="center">
          DÉBIT: 22 500 m³/h • N+1 ACTIF
        </Text>
      </group>

      {/* Chilled Water Flanged Supply / Return Pipes on Top */}
      <group position={[-0.8, 4.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.6, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text position={[0, 0.4, 0]} fontSize={0.06} color="#38bdf8" anchorX="center">
          EAU 7°C
        </Text>
      </group>
      <group position={[0.8, 4.8, 0]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.14, 0.6, 16]} />
          <meshStandardMaterial color="#0d9488" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text position={[0, 0.4, 0]} fontSize={0.06} color="#2dd4bf" anchorX="center">
          RETOUR 12°C
        </Text>
      </group>
    </group>
  );
}

/* ─── Heavy Chilled Water Header Pipe Loop ─── */
function ChilledWaterLoop() {
  return (
    <group position={[0, 5.0, 33]}>
      {/* Cold supply pipe (7°C - Deep Blue) */}
      <mesh position={[-9.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 22, 24]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Return water pipe (12°C - Industrial Teal) */}
      <mesh position={[9.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 22, 24]} />
        <meshStandardMaterial color="#0d9488" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Manual Butterfly Valves with Handwheels */}
      {[-6, 0, 6].map((zPos, idx) => (
        <group key={idx}>
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

          <group position={[9.5, 0, zPos]}>
            <mesh>
              <cylinderGeometry args={[0.3, 0.3, 0.3, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.18, 0.03, 8, 16]} />
              <meshStandardMaterial color="#2dd4bf" />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

/* ─── Compact Server Rack Unit for the Containment Aisle Lineup ─── */
function ContainmentServerRack({
  position,
  rotation = [0, 0, 0],
  rackId,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  rackId: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Rack 42U Frame */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.85, 2.8, 1.15]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Front Perforated Intake Door (Facing Cold Aisle) */}
      <mesh position={[0, 1.4, 0.58]}>
        <planeGeometry args={[0.78, 2.65]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.25} roughness={0.5} />
      </mesh>
      {/* Server Slots with Blue Activity Blinking LEDs */}
      {[0.5, 0.9, 1.3, 1.7, 2.1, 2.5].map((y, idx) => (
        <group key={idx} position={[0, y, 0.59]}>
          <mesh>
            <planeGeometry args={[0.72, 0.3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
          {/* Blue status indicators */}
          <mesh position={[-0.3, 0.08, 0.005]}>
            <circleGeometry args={[0.015, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[-0.23, 0.08, 0.005]}>
            <circleGeometry args={[0.015, 8]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      ))}
      {/* Rear Hot Air Exhaust (Facing Hot Aisle / Room) */}
      <mesh position={[0, 1.4, -0.58]}>
        <planeGeometry args={[0.78, 2.65]} />
        <meshStandardMaterial color="#ea580c" emissive="#c2410c" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
      <Text position={[0, 2.7, 0.59]} fontSize={0.07} color="#38bdf8" anchorX="center">
        {rackId}
      </Text>
    </group>
  );
}

/* ─── REAL Full Cold Aisle Thermal Containment System (Allée Froide Confinée) ─── */
function RealContainedColdAisle() {
  const rackZPositions = useMemo(() => [28.5, 30.5, 32.5, 34.5, 36.5], []);

  return (
    <group position={[-4.0, 0, 0]}>
      {/* ── Structural Aluminum Containment Frame ── */}
      {/* Left Wall Header */}
      <mesh position={[-1.35, 2.9, 32.5]}>
        <boxGeometry args={[0.1, 0.15, 9.5]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>
      {/* Right Wall Header */}
      <mesh position={[1.35, 2.9, 32.5]}>
        <boxGeometry args={[0.1, 0.15, 9.5]} />
        <meshStandardMaterial color="#475569" metalness={0.9} />
      </mesh>

      {/* ── Clear Toughened Glass Containment Roof (Toit Vitré Transparent) ── */}
      <mesh position={[0, 2.95, 32.5]}>
        <boxGeometry args={[2.7, 0.05, 9.5]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* ── Left Server Rack Lineup (Facing inside the Cold Aisle) ── */}
      {rackZPositions.map((z, idx) => (
        <ContainmentServerRack
          key={`rack-l-${idx}`}
          position={[-1.75, 0, z]}
          rotation={[0, Math.PI / 2, 0]}
          rackId={`RACK-C${idx + 1}`}
        />
      ))}

      {/* ── Right Server Rack Lineup (Facing inside the Cold Aisle) ── */}
      {rackZPositions.map((z, idx) => (
        <ContainmentServerRack
          key={`rack-r-${idx}`}
          position={[1.75, 0, z]}
          rotation={[0, -Math.PI / 2, 0]}
          rackId={`RACK-C${idx + 6}`}
        />
      ))}

      {/* ── Perforated Raised Floor Plenum Tiles inside Cold Aisle ── */}
      <mesh position={[0, 0.015, 32.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.3, 9.2]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#0369a1"
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Directional Floor Markings showing Airflow */}
      {rackZPositions.map((z, idx) => (
        <group key={`flow-${idx}`} position={[0, 0.02, z]}>
          <Text position={[-0.6, 0, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} fontSize={0.12} color="#ffffff">
            ➔ AIR 20°C
          </Text>
          <Text position={[0.6, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.12} color="#ffffff">
            ➔ AIR 20°C
          </Text>
        </group>
      ))}

      {/* ── Sliding Glass Entrance Door (North End, z = 27.6) ── */}
      <group position={[0, 0, 27.6]}>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[2.6, 2.9, 0.06]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.35} roughness={0.1} />
        </mesh>
        {/* Door Frame & Handle */}
        <mesh position={[-1.25, 1.45, 0]}>
          <boxGeometry args={[0.1, 2.9, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        <mesh position={[1.25, 1.45, 0]}>
          <boxGeometry args={[0.1, 2.9, 0.1]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Entrance Pedagogical Display Header */}
        <group position={[0, 3.25, 0]}>
          <mesh>
            <planeGeometry args={[2.8, 0.55]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <Text position={[0, 0.12, 0.02]} fontSize={0.16} color="#38bdf8" anchorX="center">
            ❄️ ALLÉE FROIDE CONFINÉE (COLD AISLE)
          </Text>
          <Text position={[0, -0.12, 0.02]} fontSize={0.11} color="#22c55e" anchorX="center">
            Température : 20.0 °C • Air pressurisé sous plancher
          </Text>
        </group>
      </group>

      {/* ── Sliding Glass Exit Door (South End, z = 37.4) ── */}
      <group position={[0, 0, 37.4]}>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[2.6, 2.9, 0.06]} />
          <meshStandardMaterial color="#7dd3fc" transparent opacity={0.35} roughness={0.1} />
        </mesh>
        <group position={[0, 3.25, 0]}>
          <mesh>
            <planeGeometry args={[2.8, 0.55]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <Text position={[0, 0.12, 0.02]} fontSize={0.16} color="#38bdf8" anchorX="center">
            FERMETURE ÉTANCHE ANTI-MÉLANGE
          </Text>
          <Text position={[0, -0.12, 0.02]} fontSize={0.11} color="#bae6fd" anchorX="center">
            Économie d’énergie : -30% par rapport à une allée ouverte
          </Text>
        </group>
      </group>

      {/* ── Dynamic Rising Cold Air Particles inside the Cold Aisle ── */}
      <AirParticles
        direction="up"
        color="#38bdf8"
        count={50}
        speed={0.8}
        bounds={{
          minX: -1.0,
          maxX: 1.0,
          minY: 0.1,
          maxY: 2.8,
          minZ: 28.0,
          maxZ: 37.0,
        }}
      />
    </group>
  );
}

/* ─── Hot Aisle Overhead Thermal Exhaust Plenum (Extraction Air Chaud) ─── */
function HotAisleExhaustSystem() {
  return (
    <group position={[4.0, 0, 32.5]}>
      {/* Overhead Insulated Thermal Extraction Hood (Hot Aisle Chimney) */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[3.4, 1.2, 10]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Warm Floor Accent */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 9.8]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#c2410c"
          emissiveIntensity={0.3}
          roughness={0.5}
        />
      </mesh>

      {/* Large Pedagogical Thermal Signboard */}
      <group position={[0, 3.4, 0]}>
        <mesh>
          <planeGeometry args={[3.6, 0.6]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.12, 0.02]} fontSize={0.17} color="#f97316" anchorX="center">
          🔥 ALLÉE CHAUDE & EXTRACTION PLÉNUM
        </Text>
        <Text position={[0, -0.13, 0.02]} fontSize={0.11} color="#fdba74" anchorX="center">
          Rejet des serveurs : 38 °C à 45 °C aspiré vers les climatiseurs
        </Text>
      </group>

      {/* Hot Air Particles Rising Upward */}
      <AirParticles
        direction="up"
        color="#f97316"
        count={35}
        speed={1.1}
        bounds={{
          minX: 3.0,
          maxX: 5.0,
          minY: 0.3,
          maxY: 4.2,
          minZ: 28.0,
          maxZ: 37.0,
        }}
      />
    </group>
  );
}

/* ─── Transparent Underfloor Plenum Cutaway (Coupe Technique du Faux-Plancher) ─── */
function UnderfloorPlenumCutaway({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Recessed Ground Cavity (Plénum sous pression) */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[4.2, 0.8, 3.2]} />
        <meshStandardMaterial color="#0b1120" roughness={0.8} />
      </mesh>

      {/* Heavy Steel Adjustable Floor Pedestals / Jacks (Vérins de faux plancher) */}
      {[-1.6, 0, 1.6].map((px) =>
        [-1.1, 0, 1.1].map((pz, idx) => (
          <group key={`${px}-${idx}`} position={[px, -0.4, pz]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.39, 0]}>
              <boxGeometry args={[0.16, 0.02, 0.16]} />
              <meshStandardMaterial color="#64748b" metalness={0.9} />
            </mesh>
          </group>
        ))
      )}

      {/* Underfloor Chilled Water Pipes (Tuyaux Eau Glacée 7°C) */}
      <group position={[0, -0.4, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 4.0, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.6]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 4.0, 16]} />
          <meshStandardMaterial color="#0d9488" metalness={0.8} />
        </mesh>
      </group>

      {/* Glowing Blue Cold Air Atmosphere Under the Floor */}
      <pointLight position={[0, -0.2, 0]} intensity={1.5} color="#38bdf8" distance={4} />

      {/* Armored Glass Floor Pane (Dalle de verre transparent d'inspection) */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 3.0]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.3}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* Safety Hazard Warning Border around the glass inspection plate */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.05, 4]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {/* Explanatory 3D Plaque */}
      <group position={[0, 0.03, 1.7]} rotation={[-Math.PI / 3, 0, 0]}>
        <mesh>
          <planeGeometry args={[3.4, 0.45]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.08, 0.02]} fontSize={0.11} color="#38bdf8" anchorX="center">
          🔍 COUPE TECHNIQUE : PLÉNUM SOUS LE PLANCHER
        </Text>
        <Text position={[0, -0.09, 0.02]} fontSize={0.08} color="#ffffff" anchorX="center">
          L’air frais à 20°C circule sous pression sous vos pieds et remonte dans les allées
        </Text>
      </group>
    </group>
  );
}

/* ─── Heavy Industrial Chilled Water Pumping Skid & Plate Heat Exchanger ─── */
function ChilledWaterPumpingStation({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Heavy Steel Skid Base Frame */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[3.2, 0.3, 2.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Twin Centrifugal Pumps (Pompe A & Pompe B en Redondance N+1) */}
      {[-0.8, 0.8].map((px, idx) => (
        <group key={idx} position={[px, 0.3, -0.2]}>
          <mesh position={[0, 0.5, -0.35]}>
            <cylinderGeometry args={[0.26, 0.26, 0.7, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.5, 0.1]}>
            <cylinderGeometry args={[0.2, 0.2, 0.22, 12]} />
            <meshStandardMaterial color="#eab308" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.5, 0.35]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.34, 0.34, 0.28, 16]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.95, 0.35]}>
            <cylinderGeometry args={[0.12, 0.12, 0.7, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.35, 0.35]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.14, 0.02, 8, 16]} />
            <meshStandardMaterial color={idx === 0 ? '#10b981' : '#eab308'} />
          </mesh>
        </group>
      ))}

      {/* Plate Heat Exchanger (Échangeur de chaleur à plaques) */}
      <group position={[0, 1.2, 0.7]}>
        <mesh>
          <boxGeometry args={[1.2, 1.8, 0.4]} />
          <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Heat exchange corrugated plate ribs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.45 + i * 0.13, 0, 0.21]}>
            <boxGeometry args={[0.04, 1.6, 0.02]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
        ))}
        <Text position={[0, 0.7, 0.23]} fontSize={0.065} color="#38bdf8" anchorX="center">
          ÉCHANGEUR À PLAQUES
        </Text>
        <Text position={[0, 0.5, 0.23]} fontSize={0.055} color="#10b981" anchorX="center">
          TRANSFERT CALORIES ➔ EXTÉRIEUR
        </Text>
      </group>

      {/* Skid Electrical VFD / Inverter Drive Control Cabinet */}
      <group position={[0, 1.2, -1.2]}>
        <mesh>
          <boxGeometry args={[1.4, 1.7, 0.25]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <Text position={[0, 0.65, 0.14]} fontSize={0.07} color="#38bdf8" anchorX="center">
          POMPES EAU GLACÉE 7°C
        </Text>
        <Text position={[0, 0.45, 0.14]} fontSize={0.06} color="#10b981" anchorX="center">
          DÉBIT: 160 m³/h • N+1 ACTIF
        </Text>
        <Text position={[0, 0.25, 0.14]} fontSize={0.05} color="#bae6fd" anchorX="center">
          VARIATEURS DE VITESSE VFD (ÉCO)
        </Text>
      </group>
    </group>
  );
}

/* ─── Massive Overhead Pedagogical Infographic Arch (Le Cycle du Froid) ─── */
function CoolingInfographicArch({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Overhead Billboard Panel (Largeur 13m) */}
      <mesh position={[0, 4.9, 0]}>
        <boxGeometry args={[13.5, 1.1, 0.1]} />
        <meshStandardMaterial color="#0b1120" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Glowing Border Trim */}
      <mesh position={[0, 4.35, 0.06]}>
        <boxGeometry args={[13.5, 0.04, 0.02]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Main Educational Flow Headline */}
      <Text position={[0, 5.25, 0.07]} fontSize={0.2} color="#ffffff" anchorX="center" letterSpacing={0.04}>
        LE CYCLE DU FROID EN BOUCLE FERMÉE
      </Text>

      {/* 4 Steps Explanation */}
      <Text position={[-4.5, 4.75, 0.07]} fontSize={0.12} color="#38bdf8" anchorX="center">
        1. EAU GLACÉE (7°C)
      </Text>
      <Text position={[-4.5, 4.55, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Produite par les groupes froids
      </Text>

      <Text position={[-1.5, 4.75, 0.07]} fontSize={0.12} color="#22c55e" anchorX="center">
        ➔ 2. FAUX-PLANCHER (20°C)
      </Text>
      <Text position={[-1.5, 4.55, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Soufflé sous pression aux serveurs
      </Text>

      <Text position={[1.5, 4.75, 0.07]} fontSize={0.12} color="#38bdf8" anchorX="center">
        ➔ 3. ALLÉE FROIDE
      </Text>
      <Text position={[1.5, 4.55, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Confinée pour zéro mélange
      </Text>

      <Text position={[4.5, 4.75, 0.07]} fontSize={0.12} color="#f97316" anchorX="center">
        ➔ 4. AIR CHAUD (38°C)
      </Text>
      <Text position={[4.5, 4.55, 0.07]} fontSize={0.085} color="#cbd5e1" anchorX="center">
        Aspiré et refroidi par les CRAH
      </Text>
    </group>
  );
}

export default function CoolingArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Giant Overhead Pedagogical Infographic (z = 33) ── */}
      <CoolingInfographicArch position={[0, 0, 33]} />

      {/* ── Transparent Underfloor Plenum Cutaway in Main Walkway (x = 0, z = 33) ── */}
      <UnderfloorPlenumCutaway position={[0, 0, 33]} />

      {/* ── REAL Contained Cold Aisle with Server Racks & Particles (x = -4, z = 33) ── */}
      <RealContainedColdAisle />

      {/* ── Hot Aisle Thermal Exhaust & Chimney (x = 4, z = 32.5) ── */}
      <HotAisleExhaustSystem />

      {/* ── Industrial Chilled Water Pumping Station & Heat Exchanger (x = 9.5, z = 33) ── */}
      <ChilledWaterPumpingStation position={[9.5, 0, 33]} />

      {/* ── Industrial CRAH Units along sidewalls with Cutaway on CRAH-01 ── */}
      <IndustrialCRACUnit
        id="CRAH-01"
        temp="19.8°C"
        position={[-12.2, 0, 26]}
        rotation={[0, Math.PI / 2, 0]}
        hasCutaway={true}
      />
      <IndustrialCRACUnit
        id="CRAH-02"
        temp="20.4°C"
        position={[-12.2, 0, 39]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <IndustrialCRACUnit
        id="CRAH-03"
        temp="20.1°C"
        position={[12.2, 0, 26]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <IndustrialCRACUnit
        id="CRAH-04"
        temp="20.5°C"
        position={[12.2, 0, 39]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* ── Overhead Chilled Water Loop & Valves ── */}
      <ChilledWaterLoop />

      {/* ── Grounded Interactive Markers (IDs alignés avec le jeu & missions) ── */}
      <InteractiveMarker
        id="cold-aisle"
        name="L’Allée d’Air Froid"
        position={[-4.0, 1.5, 30.0]}
        description="Couloir vitré étanche enfermant l’air frais à 20 °C pour forcer l’air à traverser les serveurs sans se mélanger avec l’air chaud."
      />
      <InteractiveMarker
        id="crac-unit"
        name="Le Grand Climatiseur"
        position={[-11.5, 1.8, 26.0]}
        description="Armoire de climatisation à eau glacée avec ventilateurs centrifuges géants, aspirant l'air chaud à 38°C pour le renvoyer refroidi à 20°C sous le plancher."
      />
    </group>
  );
}
