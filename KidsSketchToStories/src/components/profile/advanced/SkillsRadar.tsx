// src/components/profile/advanced/SkillsRadar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';

interface Skill {
  name: string;
  level: number;
  maxLevel: number;
}

interface SkillsRadarProps {
  skills: Skill[];
  onSkillPress: (skillName: string) => void;
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({
  skills,
  onSkillPress,
}) => {
  const size = Math.min(Dimensions.get('window').width - 32, 300);
  const center = size / 2;
  const radius = (size - 40) / 2;

  const getSkillCoordinates = (index: number, level: number, maxLevel: number) => {
    const angle = (2 * Math.PI * index) / skills.length - Math.PI / 2;
    const distance = (level / maxLevel) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const points = skills.map((skill, index) => 
    getSkillCoordinates(index, skill.level, skill.maxLevel)
  );

  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills Overview</Text>
      <Svg width={size} height={size}>
        {/* Background circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
          <Circle
            key={scale}
            cx={center}
            cy={center}
            r={radius * scale}
            stroke="#DDD"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Skill axes */}
        {skills.map((skill, index) => {
          const end = getSkillCoordinates(index, skill.maxLevel, skill.maxLevel);
          return (
            <Line
              key={skill.name}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#DDD"
              strokeWidth="1"
            />
          );
        })}

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const pos = getSkillCoordinates(index, skill.maxLevel + 0.2, skill.maxLevel);
          return (
            <SvgText
              key={skill.name}
              x={pos.x}
              y={pos.y}
              fontSize="12"
              fill="#666"
              textAnchor="middle"
            >
              {skill.name}
            </SvgText>
          );
        })}

        {/* Skills polygon */}
        <Polygon
          points={pointsString}
          fill="#007AFF"
          fillOpacity="0.2"
          stroke="#007AFF"
          strokeWidth="2"
        />
      </Svg>

      <View style={styles.legend}>
        {skills.map((skill) => (
          <TouchableOpacity
            key={skill.name}
            style={styles.legendItem}
            onPress={() => onSkillPress(skill.name)}
          >
            <Text style={styles.skillName}>{skill.name}</Text>
            <Text style={styles.skillLevel}>
              {skill.level}/{skill.maxLevel}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  legend: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  skillName: {
    fontSize: 12,
    color: '#333',
  },
  skillLevel: {
    fontSize: 12,
    color: '#666',
  },
}); 