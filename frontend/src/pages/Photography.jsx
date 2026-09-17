import React, { useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import PhotographyHero from '../components/photography/PhotographyHero';
import PhotographyBackground from '../components/photography/PhotographyBackground';
import PhotographyTimeline from '../components/photography/PhotographyTimeline';
import PhotographyMomentsBetween from '../components/photography/PhotographyMomentsBetween';
import PhotographyChooseMoment from '../components/photography/PhotographyChooseMoment';
import PhotographyPhotoWall from '../components/photography/PhotographyPhotoWall';
import PhotographyVideoFilm from '../components/photography/PhotographyVideoFilm';
import PhotographyCTA from '../components/photography/PhotographyCTA';

const Photography = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper className="p-0 bg-transparent relative">
      <PhotographyBackground />
      <PhotographyHero />
      <PhotographyTimeline />
      <PhotographyMomentsBetween />
      <PhotographyChooseMoment />
      <PhotographyPhotoWall />
      <PhotographyVideoFilm />
      <PhotographyCTA />
    </PageWrapper>
  );
};

export default Photography;