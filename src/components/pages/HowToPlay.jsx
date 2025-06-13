import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HowToPlay = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Game Objective',
      icon: 'Target',
      content: [
        'Achieve cultural dominance by spreading your civilization\'s influence across the map',
        'Reach 100% cultural influence to win the game',
        'Balance expansion with cultural development and diplomatic relations'
      ]
    },
    {
      title: 'Basic Controls',
      icon: 'MousePointer',
      content: [
        'Click on territories to view detailed information',
        'Use the action panel to perform cultural actions',
        'Monitor your progress through the statistics panel',
        'Watch for cultural shifts and territory changes'
      ]
    },
    {
      title: 'Cultural Mechanics',
      icon: 'Users',
      content: [
        'Cultural Influence: Spreads to adjacent territories over time',
        'Cultural Conversion: Transform territories to your culture',
        'Cultural Resistance: Some territories resist change more than others',
        'Great Works: Build monuments to boost cultural influence'
      ]
    },
    {
      title: 'Strategy Tips',
      icon: 'Lightbulb',
      content: [
        'Focus on culturally weak territories for easier conversion',
        'Build Great Works in central locations for maximum effect',
        'Use diplomacy to reduce cultural resistance',
        'Monitor enemy cultural expansion and counter strategically'
      ]
    },
    {
      title: 'Victory Conditions',
      icon: 'Trophy',
      content: [
        'Cultural Victory: Achieve 100% cultural influence',
        'Diplomatic Victory: Form alliances and maintain peace',
        'Economic Victory: Control key trade routes and resources',
        'Military Victory: Defend your culture through strength'
      ]
    }
  ];

return (
    <div className="bg-surface-100 bg-parchment py-6 px-4 md:p-6">
      <div className="max-w-4xl mx-auto pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-brass">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold text-primary text-shadow">
              How to Play
            </h1>
          </div>
          <p className="text-lg text-primary/70 font-body">
            Master the art of cultural dominance and diplomatic strategy
          </p>
        </motion.div>

        {/* Tutorial Sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="parchment-bg p-6 rounded-lg border-2 border-accent/30 shadow-parchment"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-surface-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name={section.icon} size={20} className="text-accent" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-primary">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-primary/80 font-body">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/menu')}
            className="min-w-32"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Back to Menu
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/game')}
            className="min-w-32"
          >
            <ApperIcon name="PlayCircle" size={16} className="mr-2" />
            Start Playing
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowToPlay;