import React from 'react';
import ImmersiveLayout from './ImmersiveLayout';
import { IMMERSIVE_DATA } from '../../data/immersiveContent';

export default function ImmersiveIonian({ lang = 'en' }) {
  const data = IMMERSIVE_DATA.ionian;
  const content = data.content[lang];

  return (
    <ImmersiveLayout
      lang={lang}
      theme={data.theme}
      title={content.title}
      subtitle={content.subtitle}
      heroImage={data.heroImage}
      introText={content.introText}
      sequenceImages={data.sequenceImages}
      rooms={content.rooms}
      amenities={content.amenities}
    />
  );
}


