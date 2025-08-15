import { AboutJistCodingClub } from '@/components/landingPage/About'
import EventsSection from '@/components/landingPage/Events'
import {FeaturedProjects} from '@/components/landingPage/FeaturedProjects'
import Footer from '@/components/landingPage/Footer'
import { Hero} from '@/components/landingPage/Hero'
import JoinSection from '@/components/landingPage/JoinSection'
import { Members } from '@/components/landingPage/Members'
import { NavbarMain } from '@/components/landingPage/Navbar'
import React from 'react'

const Home = () => {
  return (
    <div className="">
       <NavbarMain/>
      <Hero/>
<AboutJistCodingClub/>
<Members/>
<EventsSection/>

      <FeaturedProjects/>
      <JoinSection/>
      <Footer/>
    </div>

    
  )
}

export default Home