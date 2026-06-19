import CallToAction from '@/components/HomePageCMP/Cta_banner';
import Hero from '@/components/HomePageCMP/Hero';
import HomeStats from '@/components/HomePageCMP/HomeStates';
import MemberGrid from '@/components/HomePageCMP/Members';
import { Button } from '@heroui/react';

export default function HomePage() {
  return (
   <>
   <Hero />
   <HomeStats />
   <MemberGrid />
   <CallToAction />
   </>
  );
}