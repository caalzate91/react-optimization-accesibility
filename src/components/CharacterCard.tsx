import type { Character } from '../types/api';
import { useTranslation } from 'react-i18next';

type Props = { character: Character };

export default function CharacterCard({ character }: Props) {
  const { t } = useTranslation();

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

  const status = character.status ?? t('unknown');
  const species = character.species ?? t('unknown');
  const gender = character.gender ?? t('unknown');
  const origin = character.origin?.name ?? t('unknown');
  const location = character.location?.name ?? t('unknown');

  return (
    <li role="listitem" className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <article aria-labelledby={`char-${character.id}-name`}>
        <img
          src={character.image}
          alt={character.name}
          width={600}
          height={384}
          className="w-full h-48 object-cover"
          loading="lazy"
          decoding="async"
        />

        <div className="p-4">
          <h3 id={`char-${character.id}-name`} className="text-xl font-bold text-gray-800 mb-2">
            {character.name}
          </h3>

          <div className="flex items-center mb-2">
            <span className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`} />
            <span className="text-sm text-gray-600">
              {status} - {species}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <div><span className="font-medium">{t('gender')}:</span> {gender}</div>
            <div><span className="font-medium">{t('origin')}:</span> {origin}</div>
            <div><span className="font-medium">{t('location')}:</span> {location}</div>
          </div>
        </div>
      </article>
    </li>
  );
}