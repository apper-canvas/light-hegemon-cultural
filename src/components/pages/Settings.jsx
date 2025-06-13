import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Settings = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    audio: {
      masterVolume: 80,
      musicVolume: 70,
      sfxVolume: 85,
      muteAll: false
    },
    graphics: {
      quality: 'high',
      animations: true,
      particleEffects: true,
      showTooltips: true
    },
    gameplay: {
      difficulty: 'normal',
      autoSave: true,
      turnTimer: false,
      confirmActions: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real implementation, this would save to localStorage or backend
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    navigate('/menu');
  };

  const handleReset = () => {
    setSettings({
      audio: {
        masterVolume: 80,
        musicVolume: 70,
        sfxVolume: 85,
        muteAll: false
      },
      graphics: {
        quality: 'high',
        animations: true,
        particleEffects: true,
        showTooltips: true
      },
      gameplay: {
        difficulty: 'normal',
        autoSave: true,
        turnTimer: false,
        confirmActions: true
      }
    });
  };

  const VolumeSlider = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
      <span className="text-primary font-body">{label}</span>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-24 h-2 bg-surface-200 rounded-lg appearance-none slider"
        />
        <span className="text-primary/60 font-body w-8 text-right">{value}</span>
      </div>
    </div>
  );

  const ToggleSwitch = ({ label, checked, onChange }) => (
    <div className="flex items-center justify-between">
      <span className="text-primary font-body">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-accent' : 'bg-surface-200'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );

  const SelectDropdown = ({ label, value, options, onChange }) => (
    <div className="flex items-center justify-between">
      <span className="text-primary font-body">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface-200 border border-accent/30 rounded-lg px-3 py-1 text-primary font-body"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-100 bg-parchment p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-brass">
              <ApperIcon name="Settings" size={24} className="text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold text-primary text-shadow">
              Settings
            </h1>
          </div>
          <p className="text-lg text-primary/70 font-body">
            Configure your gaming experience
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6 mb-8">
          {/* Audio Settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="parchment-bg p-6 rounded-lg border-2 border-accent/30 shadow-parchment"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-surface-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Volume2" size={20} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Audio
              </h2>
            </div>
            <div className="space-y-4">
              <VolumeSlider
                label="Master Volume"
                value={settings.audio.masterVolume}
                onChange={(value) => handleSettingChange('audio', 'masterVolume', value)}
              />
              <VolumeSlider
                label="Music Volume"
                value={settings.audio.musicVolume}
                onChange={(value) => handleSettingChange('audio', 'musicVolume', value)}
              />
              <VolumeSlider
                label="Sound Effects"
                value={settings.audio.sfxVolume}
                onChange={(value) => handleSettingChange('audio', 'sfxVolume', value)}
              />
              <ToggleSwitch
                label="Mute All Audio"
                checked={settings.audio.muteAll}
                onChange={(value) => handleSettingChange('audio', 'muteAll', value)}
              />
            </div>
          </motion.div>

          {/* Graphics Settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="parchment-bg p-6 rounded-lg border-2 border-accent/30 shadow-parchment"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-surface-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Monitor" size={20} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Graphics
              </h2>
            </div>
            <div className="space-y-4">
              <SelectDropdown
                label="Graphics Quality"
                value={settings.graphics.quality}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'ultra', label: 'Ultra' }
                ]}
                onChange={(value) => handleSettingChange('graphics', 'quality', value)}
              />
              <ToggleSwitch
                label="Animations"
                checked={settings.graphics.animations}
                onChange={(value) => handleSettingChange('graphics', 'animations', value)}
              />
              <ToggleSwitch
                label="Particle Effects"
                checked={settings.graphics.particleEffects}
                onChange={(value) => handleSettingChange('graphics', 'particleEffects', value)}
              />
              <ToggleSwitch
                label="Show Tooltips"
                checked={settings.graphics.showTooltips}
                onChange={(value) => handleSettingChange('graphics', 'showTooltips', value)}
              />
            </div>
          </motion.div>

          {/* Gameplay Settings */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="parchment-bg p-6 rounded-lg border-2 border-accent/30 shadow-parchment"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-surface-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Gamepad2" size={20} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-primary">
                Gameplay
              </h2>
            </div>
            <div className="space-y-4">
              <SelectDropdown
                label="Difficulty"
                value={settings.gameplay.difficulty}
                options={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'hard', label: 'Hard' },
                  { value: 'expert', label: 'Expert' }
                ]}
                onChange={(value) => handleSettingChange('gameplay', 'difficulty', value)}
              />
              <ToggleSwitch
                label="Auto Save"
                checked={settings.gameplay.autoSave}
                onChange={(value) => handleSettingChange('gameplay', 'autoSave', value)}
              />
              <ToggleSwitch
                label="Turn Timer"
                checked={settings.gameplay.turnTimer}
                onChange={(value) => handleSettingChange('gameplay', 'turnTimer', value)}
              />
              <ToggleSwitch
                label="Confirm Actions"
                checked={settings.gameplay.confirmActions}
                onChange={(value) => handleSettingChange('gameplay', 'confirmActions', value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Button
            variant="secondary"
            onClick={() => navigate('/menu')}
            className="min-w-32"
          >
            <ApperIcon name="X" size={16} className="mr-2" />
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="min-w-32"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="min-w-32"
          >
            <ApperIcon name="Save" size={16} className="mr-2" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;