import React from 'react';
import type { Character } from '../types/api';
import { useTranslation } from 'react-i18next';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { t } = useTranslation();

  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case 'Alive':
        return t('status_Alive');
      case 'Dead':
        return t('status_Dead');
      default:
        return t('status_unknown');
    }
  };

  const getTranslatedGender = (gender: string) => {
    switch (gender) {
      case 'Male':
        return t('gender_Male');
      case 'Female':
        return t('gender_Female');
      case 'Genderless':
        return t('gender_Genderless');
      default:
        return t('gender_unknown');
    }
  };

  const getTranslatedSpecies = (species: string) => {
    const translationKey = `species_${species}`;
    const translatedValue = t(translationKey);

    if (translatedValue === translationKey) {
        return species || t('species_unknown');
    }
    return translatedValue;
  };
  
  const getTranslatedPlaceName = (placeName: string) => {
      if (placeName === 'Earth') {
          return t('place_Earth');
      }
      
      if (placeName.includes('Earth')) {
          return placeName.replace('Earth', t('place_Earth'));
      }
      
      return placeName;
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={character.image}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <div className="text-xl font-bold text-gray-800 mb-2">{character.name}</div>
        <div className="flex items-center mb-2">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(character.status)} mr-2`}></span>
          <span className="text-sm text-gray-600">
              {getTranslatedStatus(character.status)} - {getTranslatedSpecies(character.species)}
          </span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <div><span className="font-medium">{t('gender_label')}:</span> {getTranslatedGender(character.gender)}</div>
          
          <div><span className="font-medium">{t('origin_label')}:</span> {getTranslatedPlaceName(character.origin.name)}</div>
          
          <div><span className="font-medium">{t('location_label')}:</span> {getTranslatedPlaceName(character.location.name)}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;